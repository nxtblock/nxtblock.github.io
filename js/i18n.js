// 国际化翻译数据
const i18nData = {
  'zh-CN': {
    lang_zh_cn: '中文',
    lang_zh_tw: '繁體',
    lang_en: 'English',
    home: '首页',
    projects: '项目',
    team: '团队',
    support: '支持我们',
    links: '链接',
    hero_tagline: '用开源点亮 OI 工具生态',
    hero_title: '你好，我们是 <span class="brand">GenGen</span> 队',
    hero_subtitle: '一支由 OIer 与开发者组成的小队，利用休息时间打造顺手的工具：从桌面工具箱到在线脚本，专注简洁、稳定与可扩展。',
    browse_projects: '浏览项目',
    support_us: '支持我们',
    hero_cta_text: 'Star、分享与赞赏，都是推动我们前行的燃料。',
    footer_slogan: 'Welcome GenGen Studio'
  },
  'zh-TW': {
    lang_zh_cn: '简体',
    lang_zh_tw: '繁體',
    lang_en: 'English',
    home: '首頁',
    projects: '項目',
    team: '團隊',
    support: '支持我們',
    links: '鏈接',
    hero_tagline: '用開源點亮 OI 工具生態',
    hero_title: '你好，我們是 <span class="brand">GenGen</span> 隊',
    hero_subtitle: '一支由 OIer 與開發者組成的小隊，利用休息時間打造順手的工具：從桌面工具箱到在線腳本，專注簡潔、穩定與可擴展。',
    browse_projects: '瀏覽項目',
    support_us: '支持我們',
    hero_cta_text: 'Star、分享與讚賞，都是推動我們前行的燃料。',
    footer_slogan: 'Welcome GenGen Studio'
  },
  'en': {
    lang_zh_cn: 'Simplified',
    lang_zh_tw: 'Traditional',
    lang_en: 'English',
    home: 'Home',
    projects: 'Projects',
    team: 'Team',
    support: 'Support Us',
    links: 'Links',
    hero_tagline: 'Illuminating OI Tool Ecosystem with Open Source',
    hero_title: 'Hello, We are <span class="brand">GenGen</span> Team',
    hero_subtitle: 'A small team composed of OIers and developers, creating handy tools in our spare time: from desktop toolboxes to online scripts, focusing on simplicity, stability, and scalability.',
    browse_projects: 'Browse Projects',
    support_us: 'Support Us',
    hero_cta_text: 'Stars, shares, and appreciation are all fuel that drives us forward.',
    footer_slogan: 'Welcome GenGen Studio'
  }
};

// 默认语言
const defaultLanguage = 'en';

// 获取浏览器语言
function getBrowserLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  
  // 检查是否支持简体中文
  if (browserLang.startsWith('zh-CN') || browserLang.startsWith('zh-Hans')) {
    return 'zh-CN';
  }
  // 检查是否支持繁体中文
  else if (browserLang.startsWith('zh-TW') || browserLang.startsWith('zh-Hant') || 
           browserLang.startsWith('zh-HK') || browserLang.startsWith('zh-MO')) {
    return 'zh-TW';
  }
  // 默认英文
  else {
    return 'en';
  }
}

// 获取当前语言
function getCurrentLanguage() {
  return localStorage.getItem('language') || getBrowserLanguage();
}

// 设置语言
function setLanguage(lang) {
  // 如果语言不在支持范围内，默认为英文
  if (!i18nData[lang]) {
    lang = defaultLanguage;
  }
  
  // 保存到本地存储
  localStorage.setItem('language', lang);
  
  // 更新HTML语言属性
  document.documentElement.lang = lang;
  
  // 翻译页面内容
  translatePage(lang);
  
  // 更新语言选择器
  const langSelector = document.getElementById('language-selector');
  if (langSelector) {
    langSelector.value = lang;
  }
}

// 翻译页面内容
function translatePage(lang) {
  const translations = i18nData[lang] || i18nData[defaultLanguage];
  
  // 翻译带有data-i18n属性的元素
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[key]) {
      // 检查是否包含HTML标签
      if (translations[key].includes('<') && translations[key].includes('>')) {
        element.innerHTML = translations[key];
      } else {
        element.textContent = translations[key];
      }
    }
  });
  
  // 更新选项的文本（如果需要）
  const options = document.querySelectorAll('option[data-i18n]');
  options.forEach(option => {
    const key = option.getAttribute('data-i18n');
    if (translations[key]) {
      option.textContent = translations[key];
    }
  });
}