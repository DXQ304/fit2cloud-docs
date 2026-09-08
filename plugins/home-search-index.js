/* ------------------------------------------------------------------
 * 自定义插件: 为首页「即时搜索下拉」提供一份轻量的文档元数据索引。
 *
 * 为什么需要它:
 *   useAllDocsData() 返回的 docs 是精简元数据(只有 id / path / sidebar),
 *   不含 title / description / permalink —— 不足以渲染搜索结果。
 *   而 allContentLoaded 能拿到所有 docs 插件的完整 DocMetadata。
 *
 * 做法:
 *   只取每个产品文档实例的「最新版本」(避免 v1/v2 内容重复),
 *   抽出 title / description / permalink 三个字段后写入 globalData;
 *   首页组件用 usePluginData('home-search-index') 读取并做前端匹配。
 *   全站约 300 篇文档, 精简后体积几十 KB, 完全可接受。
 * ------------------------------------------------------------------ */

module.exports = function homeSearchIndexPlugin() {
  return {
    name: 'home-search-index',

    async allContentLoaded({allContent, actions}) {
      const items = [];
      const seen = new Set();

      // allContent 是两层: { [pluginName]: { [pluginId]: content } }
      Object.entries(allContent || {}).forEach(([, byPluginId]) => {
        Object.values(byPluginId || {}).forEach((content) => {
          const versions = content?.loadedVersions;
          if (!Array.isArray(versions)) {
            return; // 非 docs 插件(theme / pages / 搜索等), 跳过
          }
          // 只保留最新版本: v1/v2 内容高度重叠, 全放会让结果里出现大量重复条目
          const latest = versions.filter(
            (v) => v.isLast || v.versionName === 'current',
          );
          (latest.length ? latest : versions).forEach((version) => {
            (version.docs || []).forEach((doc) => {
              if (
                !doc?.permalink ||
                doc.unlisted ||
                doc.draft ||
                doc.frontMatter?.draft
              ) {
                return;
              }
              if (seen.has(doc.permalink)) {
                return;
              }
              seen.add(doc.permalink);
              items.push({
                title: doc.title || doc.frontMatter?.title || '',
                desc: doc.description || doc.frontMatter?.description || '',
                permalink: doc.permalink,
              });
            });
          });
        });
      });

      actions.setGlobalData({items});
      // eslint-disable-next-line no-console
      console.log(`[home-search-index] 收录 ${items.length} 篇文档`);
    },
  };
};
