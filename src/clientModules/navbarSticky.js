// 导航栏滚动行为: 页面在最顶部(未滚动)时, 导航栏悬浮下移留白; 一旦往下滚动,
// 就贴到视口最顶, 节省纵向空间。
//
// 为什么需要 JS:
//   sticky 的 top 是固定黏附位置, 做不到「未滚动时悬浮下移、滚动时才贴顶」——
//   要么一直贴在固定 top, 要么一直不贴。故用 scroll 监听给 <html> 打/去
//   .navbar-scrolled 标记, 由 custom.css 里的两条规则切换定位:
//     - 默认(无标记): .navbar 保持悬浮(带顶部 margin / top 偏移)
//     - html.navbar-scrolled: .navbar top:0、去掉顶部 margin, 贴到视口顶
function updateNavbar() {
  const scrolled = (typeof window !== 'undefined' ? window.scrollY : 0) > 8;
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('navbar-scrolled', scrolled);
  }
}

export function onRouteDidUpdate() {
  updateNavbar();
}

if (typeof window !== 'undefined') {
  window.addEventListener('scroll', updateNavbar, {passive: true});
  updateNavbar();
}
