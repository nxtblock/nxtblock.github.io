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

// 深浅色模式切换功能
$(document).ready(function() {
  // 设置初始状态为深色模式
  let isDarkMode = true;
  
  // 设置深色模式初始状态
  gsap.set("#moon, .star", {opacity: 0});
  gsap.set("#sun, #cloud, #moon", {x: 15});
  gsap.set(".star", {x: 35, y: -5});
  
  $("#day").click(function(){
    gsap.to("#sun", 1, {x: -157, opacity: 0, ease: Power1.easeInOut});
    gsap.to("#cloud", .5, {opacity: 0, ease: Power1.easeInOut});
    gsap.to("#moon", 1, {x: -157, rotate: -360, transformOrigin: "center", opacity: 1, ease: Power1.easeInOut});
    gsap.to(".star", .5, {opacity: 1, ease: Power1.easeInOut});
    gsap.to("#night", 1, {background: "#224f6d", borderColor: "#cad4d8", ease: Power1.easeInOut});
    gsap.to("#background", 1, {background: "#0d1f2b", ease: Power1.easeInOut});
    $(this).css({"pointer-events": "none"});
    
    setTimeout(function(){
      $("#night").css({"pointer-events": "all"})
    }, 1000);
    
    isDarkMode = true;
    document.body.classList.remove('light');
    document.body.classList.add('dark');
  });

  $("#night").click(function(){
    gsap.to("#sun", 1, {x: 15, opacity: 1, ease: Power1.easeInOut});
    gsap.to("#cloud", 1, {opacity: 1, ease: Power1.easeInOut});
    gsap.to("#moon", 1, {opacity: 0, x: 35, rotate: 360, transformOrigin: "center", ease: Power1.easeInOut});
    gsap.to(".star", 1, {opacity: 0, ease: Power1.easeInOut});
    gsap.to("#night", 1, {background: "#9cd6ef", borderColor: "#65c0e7", ease: Power1.easeInOut});
    gsap.to("#background", 1, {background: "#d3edf8", ease: Power1.easeInOut});
    $(this).css({"pointer-events": "none"});
    
    setTimeout(function(){
      $("#day").css({"pointer-events": "all"})
    }, 1000);
    
    isDarkMode = false;
    document.body.classList.remove('dark');
    document.body.classList.add('light');
  });
});

// 语言选择功能
document.addEventListener('DOMContentLoaded', function() {
  const languageSelector = document.getElementById('language-selector');
  
  languageSelector.addEventListener('change', function() {
    const selectedLang = this.value;
    
    // 更新页面语言属性
    document.documentElement.lang = selectedLang;
    
    // 使用translate.js进行翻译
    translate.setLanguage(selectedLang);
  });
});