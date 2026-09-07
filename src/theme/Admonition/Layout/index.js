/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 * Admonition Layout 覆盖版: 无自定义标题时不渲染标题栏(含默认"备注"标题文字)
 */
import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import styles from './styles.module.css';

function AdmonitionContainer({type, className, children, id}) {
  return (
    <div
      className={clsx(
        ThemeClassNames.common.admonition,
        ThemeClassNames.common.admonitionType(type),
        styles.admonition,
        className,
      )}
      id={id}>
      {children}
    </div>
  );
}

function AdmonitionHeading({icon, title}) {
  return (
    <div className={styles.admonitionHeading}>
      <span className={styles.admonitionIcon}>{icon}</span>
      {title}
    </div>
  );
}

function AdmonitionContent({children}) {
  return children ? (
    <div className={styles.admonitionContent}>{children}</div>
  ) : null;
}

/* note/tip/info 的默认标题(备注/提示/信息)不渲染, 贴近 MkDocs 空标题提示框;
   warning/caution/danger 以及 :::note[自定义标题] 仍显示标题栏 */
const SILENT_DEFAULT_TITLES = new Set([
  'note',
  '备注',
  'Note',
  'tip',
  '提示',
  'Tip',
  'info',
  '信息',
  'Info',
]);

function titleToText(title) {
  if (title == null || title === false) {
    return '';
  }
  if (typeof title === 'string' || typeof title === 'number') {
    return String(title).trim();
  }
  if (Array.isArray(title)) {
    return title.map(titleToText).join('').trim();
  }
  if (typeof title === 'object' && title.props) {
    return titleToText(title.props.children);
  }
  return '';
}

export default function AdmonitionLayout(props) {
  const {type, icon, title, children, className, id} = props;
  const titleText = titleToText(title);
  const showHeading = Boolean(titleText) && !SILENT_DEFAULT_TITLES.has(titleText);
  return (
    <AdmonitionContainer type={type} className={className} id={id}>
      {showHeading ? <AdmonitionHeading title={title} icon={icon} /> : null}
      <AdmonitionContent>{children}</AdmonitionContent>
    </AdmonitionContainer>
  );
}
