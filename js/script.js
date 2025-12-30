// js/script.js
// 年份
document.getElementById('y').textContent = new Date().getFullYear();

// 移动端菜单开关
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn?.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});
// 点击导航后关闭菜单（移动端）
navLinks.querySelectorAll('a').forEach(a=>{
  a.addEventListener('click', ()=> navLinks.classList.remove('show'));
});

// ScrollSpy：滚动高亮当前导航项
const links = Array.from(document.querySelectorAll('.nav-links a'));
const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

const setActive = (id) => {
  links.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + id);
  });
};

const observer = new IntersectionObserver((entries) => {
  const visible = entries
    .filter(e => e.isIntersecting)
    .sort((a,b) => b.intersectionRatio - a.intersectionRatio);
  if (visible[0]) setActive(visible[0].target.id);
}, { rootMargin: "-40% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] });

sections.forEach(sec => observer.observe(sec));

// 可选：锚点跳转微调（兼容部分浏览器的滚动偏移）
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if(!el) return;
    e.preventDefault();
    const top = el.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) + 8);
    window.scrollTo({ top, behavior: 'smooth' });
    history.replaceState(null, '', '#' + id);
  })
});

// 获取模态框元素
const modal = document.getElementById("myModal");

// 获取图片元素 - 修复支持我们页面的打开大图功能
// 注意：支持我们页面的图片已经有onclick事件，这里不再重复绑定
const modalImg = document.getElementById("img01");

// 获取关闭按钮
const closeButtons = document.getElementsByClassName("close");
for (let i = 0; i < closeButtons.length; i++) {
  closeButtons[i].onclick = function() { 
    if (modal) {
      modal.style.display = "none";
    }
  }
}

// 使用事件委托处理动态内容或稍后加载的内容
document.addEventListener('click', function(e) {
  if (e.target && e.target.className === 'close') {
    if (modal) {
      modal.style.display = "none";
    }
  }
});

// 点击模态框外区域关闭模态框
if (modal) {
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

// 深浅色模式切换功能
document.addEventListener('DOMContentLoaded', function() {
  // 检查用户偏好和本地存储
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  let isDarkMode;

  // 检查本地存储是否有设置
  const storedDarkMode = localStorage.getItem('darkMode');
  if (storedDarkMode !== null) {
    isDarkMode = storedDarkMode === 'true';
  } else {
    // 如果没有本地存储，使用系统偏好
    isDarkMode = prefersDarkScheme.matches;
  }

  // 设置初始状态
  if (isDarkMode) {
    document.body.classList.add('dark');
    document.body.classList.remove('light');
  } else {
    document.body.classList.add('light');
    document.body.classList.remove('dark');
  }

  // 深浅色模式切换按钮
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      const isCurrentlyDark = document.body.classList.contains('dark');

      if (isCurrentlyDark) {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        localStorage.setItem('darkMode', 'false');
      } else {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
      }
    });
  }
});

// 语言选择功能
document.addEventListener('DOMContentLoaded', function() {
  const languageSelector = document.getElementById('language-selector');
  
  // 检查国际化函数是否存在
  if (typeof getCurrentLanguage === 'function' && typeof setLanguage === 'function') {
    // 初始化语言
    const currentLang = getCurrentLanguage();
    setLanguage(currentLang);
    
    if (languageSelector) {
      languageSelector.addEventListener('change', function() {
        const selectedLang = this.value;
        setLanguage(selectedLang);
      });
    }
  }
});

