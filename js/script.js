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

// 获取图片元素
const img = document.querySelector("#support .rounded img");
const modalImg = document.getElementById("img01");
const captionText = document.getElementById("caption");

// 当用户点击图片时，打开模态框
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

// 获取关闭按钮
const span = document.getElementsByClassName("close")[0];

// 当用户点击关闭按钮时，关闭模态框
span.onclick = function() { 
  modal.style.display = "none";
}

// 点击模态框外区域关闭模态框
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// 添加主题切换功能
function toggleTheme() {
  const currentTheme = document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light';
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  if (window.switchTheme) {
    window.switchTheme(newTheme);
  } else {
    // 如果全局函数不可用，则直接切换类
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
      document.querySelector('meta[name="theme-color"]').setAttribute('content', '#0f172a');
    } else {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
      document.querySelector('meta[name="theme-color"]').setAttribute('content', '#f8fafc');
    }
    localStorage.setItem('theme', newTheme);
  }
}

// 可选：添加主题切换按钮到页面
function addThemeToggle() {
  // 创建主题切换按钮
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = '🌓'; // 使用月亮/太阳图标
  themeToggle.setAttribute('aria-label', '切换主题');
  themeToggle.style.cssText = `
    background: transparent;
    border: 1px solid #334155;
    color: #a6adbb;
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 14px;
    cursor: pointer;
    margin-left: 10px;
  `;
  
  themeToggle.addEventListener('click', toggleTheme);
  
  // 尝试将按钮添加到导航栏
  const navContainer = document.querySelector('.nav > div');
  if (navContainer) {
    navContainer.appendChild(themeToggle);
  }
}

// 页面加载完成后添加主题切换按钮
document.addEventListener('DOMContentLoaded', addThemeToggle);