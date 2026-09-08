import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useHistory} from '@docusaurus/router';
import {usePluginData} from '@docusaurus/useGlobalData';
import {createPortal} from 'react-dom';
import styles from './index.module.css';

/* ------------------------------------------------------------------
 * 首页 Hero 搜索框 + 即时结果下拉面板
 *
 * 规格来源: Figma node 488-3119 / frame '交互'
 *   下拉面板 Frame 1564942: 与搜索框同宽 800, 距搜索框 8, 白底 r12, 内边距 27
 *   结果行  搜索内容 746x70, 行间距 8, hover/选中底 #f5f8ff r8
 *     文档图标 32x32(#b7bfd2 描边) | 标题 20/500 #6c7280 + 右侧 Tag
 *     Tag: 底 #edf0f1 r4, 文字 12/400 #323535, 高 24
 *     摘要 14/400 #6c7280, 单行省略
 *   底部「查看全部结果」14/400, 默认 #6c7280, hover #333eff
 *
 * 数据来源: useAllDocsData() (Docusaurus 官方客户端 API), 只读文档元数据
 *   (title / description / permalink), 不需要额外的索引构建步骤。
 *   全站约 300 篇文档, 元数据体积很小, 直接在前端做子串匹配即可。
 *
 * 【面板定位: position:fixed 的原因】
 *   Hero(.hero) 设了 overflow:hidden(用于裁剪大尺寸光晕), 若面板沿用
 *   position:absolute 沈出 Hero 底部, 会被 overflow:hidden 整个裁掉、
 *   只露出最上面一行(见 BUG: 搜索时看不到完整结果, 感觉被「全部产品」块挡住)。
 *   因此下面板用 createPortal 渲染到 <body> 并 position:fixed, 以搜索框的
 *   getBoundingClientRect 计算视口坐标, 彻底脱离 Hero 的裁切范围、浮在一切之上。
 * ------------------------------------------------------------------ */

/* routeBasePath(permalink 第一段) → 产品中文名, 与设计稿 Tag 位置对应 */
const PRODUCT_BY_ROUTE = {
  '1panel': '1Panel 面板',
  sqlbot: 'SQLBot',
  jumpserver: 'JumpServer',
  dataease: 'DataEase',
  maxkb: 'MaxKB',
  'ai-gateway': '1Panel AI 网关',
  docs: '文档中心',
};

const MAX_RESULTS = 5; // 设计稿面板展示 5 行
const MAX_SCAN = 400; // 命中截断, 避免超长列表排序开销

const I18N = {
  zh: {
    viewAll: '查看全部结果',
    empty: '未找到相关文档，换个关键词试试',
  },
  en: {
    viewAll: 'View all results',
    empty: 'No docs found, try another keyword',
  },
};

function productOf(permalink) {
  const seg = (permalink || '').replace(/^\//, '').split('/')[0];
  return PRODUCT_BY_ROUTE[seg] || (seg ? seg.toUpperCase() : '文档中心');
}

/* 精简索引: 只取每个产品的最新版本, 避免 v1/v2 内容重复出现在结果里 */
/* 补上产品名与检索用小写串(插件已去好重、只留最新版本) */
function buildIndex(items) {
  return (items || []).map((it) => {
    const product = productOf(it.permalink);
    return {
      ...it,
      product,
      haystack: `${it.title} ${it.desc} ${product}`.toLowerCase(),
    };
  });
}

/* 子串匹配: 空格分隔的多个词需全部命中, 标题命中优先于摘要命中 */
function searchDocs(index, query) {
  const q = query.trim().toLowerCase();
  if (!q) {
    return [];
  }
  const terms = q.split(/\s+/).filter(Boolean);
  const hits = [];
  for (const item of index) {
    if (terms.every((t) => item.haystack.includes(t))) {
      hits.push({
        ...item,
        score: item.title.toLowerCase().includes(q) ? 0 : 1,
      });
      if (hits.length >= MAX_SCAN) {
        break;
      }
    }
  }
  return hits.sort((a, b) => a.score - b.score);
}

function DocIcon() {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" fill="none" aria-hidden="true">
      <path
        d="M8.5 5.8h9.2a1.2 1.2 0 01.85.35l5.3 5.3a1.2 1.2 0 01.35.85v13.9a1.2 1.2 0 01-1.2 1.2H8.5a1.2 1.2 0 01-1.2-1.2V7a1.2 1.2 0 011.2-1.2z"
        fill="#ffffff"
        stroke="#b7bfd2"
        strokeWidth="1.5"
      />
      <path d="M18 5.8v6.2h6.2" stroke="#b7bfd2" strokeWidth="1.5" />
      <path
        d="M11.5 17.5h9M11.5 21h9M11.5 24.5h5.5"
        stroke="#c8cbcb"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function HomeSearch({zh, placeholder, submitLabel}) {
  const t = zh ? I18N.zh : I18N.en;
  const history = useHistory();
  // 文档索引由 plugins/home-search-index.js 在构建期注入 globalData
  const {items} = usePluginData('home-search-index');
  const index = useMemo(() => buildIndex(items), [items]);

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  // 面板 position:fixed 的视口坐标; null 表示尚未测量
  const [rect, setRect] = useState(null);
  const wrapRef = useRef(null);
  const searchBoxRef = useRef(null);
  const panelRef = useRef(null);

  const results = useMemo(() => searchDocs(index, query), [index, query]);
  const visible = open && query.trim().length > 0;
  const rows = results.slice(0, MAX_RESULTS);
  const searchUrl = `/search?q=${encodeURIComponent(query.trim())}`;

  const go = useCallback(
    (url) => {
      setOpen(false);
      history.push(url);
    },
    [history],
  );

  /* 测量搜索框在视口内的位置, 供 fixed 面板对齐。
     width 锁到搜索框宽度(wrap 里 800/max-width 100%), 这样面板与输入框等宽。 */
  const updatePos = useCallback(() => {
    const el = searchBoxRef.current;
    if (!el) {
      return;
    }
    const r = el.getBoundingClientRect();
    if (r.width === 0) {
      return;
    }
    setRect({
      top: r.bottom + 8,
      left: r.left,
      width: r.width,
    });
  }, []);

  // 面板打开时: 测一次位置, 并挂在 scroll/resize 上跟随(滚动时搜索框会移动)
  useEffect(() => {
    if (!visible) {
      return undefined;
    }
    updatePos();
    window.addEventListener('resize', updatePos);
    // capture=true 捕获 Hero 内部乃至任意祖先的滚动, 都能让面板跟着搜索框走
    document.addEventListener('scroll', updatePos, true);
    return () => {
      window.removeEventListener('resize', updatePos);
      document.removeEventListener('scroll', updatePos, true);
    };
  }, [visible, updatePos]);

  // 点击面板外部关闭(面板在 body 上, 需同时判断 wrap 与 portal 面板)
  useEffect(() => {
    if (!visible) {
      return undefined;
    }
    const onPointerDown = (e) => {
      const inWrap = wrapRef.current && wrapRef.current.contains(e.target);
      const inPanel = panelRef.current && panelRef.current.contains(e.target);
      if (!inWrap && !inPanel) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [visible]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (active >= 0 && rows[active]) {
      go(rows[active].permalink);
      return;
    }
    go(searchUrl);
  };

  const onKeyDown = (e) => {
    if (!visible || rows.length === 0) {
      if (e.key === 'Escape') {
        setOpen(false);
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (i + 1) % rows.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (i <= 0 ? rows.length - 1 : i - 1));
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const panel = visible ? (
    createPortal(
      <div
        ref={panelRef}
        className={styles.panel}
        style={
          rect
            ? {top: rect.top, left: rect.left, width: rect.width}
            : {visibility: 'hidden'}
        }>
        {rows.length === 0 ? (
          <div className={styles.empty}>{t.empty}</div>
        ) : (
          <>
            {rows.map((item, i) => (
              <a
                key={item.permalink}
                href={item.permalink}
                className={`${styles.row} ${i === active ? styles.rowActive : ''}`}
                onMouseEnter={() => setActive(i)}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.permalink);
                }}>
                <span className={styles.rowIcon}>
                  <DocIcon />
                </span>
                <span className={styles.rowBody}>
                  <span className={styles.rowTitleRow}>
                    <span className={styles.rowTitle}>{item.title}</span>
                    <span className={styles.rowTag}>{item.product}</span>
                  </span>
                  <span className={styles.rowDesc}>{item.desc}</span>
                </span>
              </a>
            ))}
            <a
              className={styles.viewAll}
              href={searchUrl}
              onClick={(e) => {
                e.preventDefault();
                go(searchUrl);
              }}>
              {t.viewAll}
            </a>
          </>
        )}
      </div>,
      document.body,
    )
  ) : null;

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <form className={styles.searchBox} role="search" onSubmit={onSubmit} ref={searchBoxRef}>
        <input
          className={styles.input}
          type="search"
          name="q"
          value={query}
          placeholder={placeholder}
          autoComplete="off"
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
        />
        <button className={styles.btn} type="submit">
          {submitLabel}
        </button>
      </form>
      {panel}
    </div>
  );
}
