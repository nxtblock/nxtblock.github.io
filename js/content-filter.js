// content-filter.js - 内容过滤功能
(function() {
  // 低俗词汇列表（示例）
  const profanityList = [
    // 英文低俗词汇
    'fuck', 'fucking', 'fucked', 'fucker', 'shit', 'damn', 'bitch', 'bastard', 'cunt', 'dick', 'piss', 'arse',
    'hell', 'bloody', 'bugger', 'bollocks', 'wanker', 'tosser', 'prick', 'slut', 'whore', 'nigger', 'nigga',
    'asshole', 'douche', 'douchebag', 'pussy', 'cock', 'bastard', 'twat', 'minge', 'gash', 'dildo',
    
    // 中文低俗词汇
    '他妈', '他娘', '滚蛋', '去死', '操你', '操他', '操她', '我操', '我靠', '我草', '卧槽', '妈蛋', '妈的', '狗日',
    '草泥马', '法克', '佛祖', '靠北', '靠腰', '干你', '干他', '干她', '干死', '贱人', '贱货', '婊子', '混蛋', '王八蛋',
    '猪头', '猪猡', '畜生', '人渣', '垃圾', '神经病', '白痴', '弱智', '蠢货', '傻逼', '傻B', 'SB', '二B', '二逼',
    '滚开', '闭嘴', '去死吧', '滚粗', '滚犊子', '滚蛋', '滚', '滚远点', '滚一边去', '死开', '死远点', '不得好死',
    '短命', '短命鬼', '天杀', '该死', '死绝', '断子绝孙', '绝后', '断后', '断子', '绝孙', '断子绝孙',
    
    // 更多可能的词汇
    'tmd', 'tm', 'nm', 'nmsl', 'wsm', 'wdnmd', 'cnm', 'nmf', 'fku', 'fk', 'smt', 'dyj', 'dy', 'sb'
  ];

  // 将词汇列表转换为正则表达式
  const profanityRegex = new RegExp(`\\b(${profanityList.join('|')})\\b`, 'gi');

  // 过滤文本函数
  function filterText(text) {
    if (!text) return text;
    
    // 替换低俗词汇为星号
    return text.replace(profanityRegex, match => '*'.repeat(match.length));
  }

  // 递归过滤DOM节点中的文本
  function filterNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      // 过滤文本节点
      node.textContent = filterText(node.textContent);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // 过滤元素节点的属性
      for (let attr of node.attributes || []) {
        if (attr.name.startsWith('data-') || ['title', 'alt', 'placeholder', 'value'].includes(attr.name)) {
          attr.value = filterText(attr.value);
        }
      }
      
      // 递归过滤子节点
      for (let child of node.childNodes) {
        filterNode(child);
      }
    }
  }

  // 页面加载完成后过滤所有内容
  function filterPageContent() {
    filterNode(document.body);
  }

  // 监听动态内容添加
  function setupMutationObserver() {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            filterNode(node);
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // 页面加载完成后执行过滤
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      filterPageContent();
      setupMutationObserver();
    });
  } else {
    filterPageContent();
    setupMutationObserver();
  }
})();