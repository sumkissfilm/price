/* ========================================
   SUMMER KISSES - SCROLL JAVASCRIPT
   ======================================== */

/*
    本檔案負責 header 導覽列的滾動監聽與背景變色互動：
    - 當頁面滾動超過 hero 區塊底部時，為 header 加上 .scrolled 類別（由 CSS 控制背景色）
    - 主要搭配 css/header-navigation.css 及 index.html header 結構
    - 不更動 header 內容，只負責 class 切換
*/

// ===== GLOBAL VARIABLES =====
let header, hero;

// ===== SCROLL EFFECTS =====

/**
 * 檢查滾動位置並更新頁首樣式
 * 當滾動超過 hero 區塊底部時，為頁首添加背景色
 */
function checkScroll() {
    if (!hero || !header) {
        console.warn('找不到必要的 DOM 元素:', { header: !!header, hero: !!hero });
        return;
    }
    
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const scrollThreshold = heroBottom - header.offsetHeight;
    const currentScrollY = window.scrollY;
    
    console.log('滾動檢查:', {
        heroBottom,
        scrollThreshold,
        currentScrollY,
        shouldAddBackground: currentScrollY > scrollThreshold
    });
    
    if (currentScrollY > scrollThreshold) {
        if (!header.classList.contains('scrolled')) {
            header.classList.add('scrolled');
            console.log('添加 scrolled 類別');
        }
    } else {
        if (header.classList.contains('scrolled')) {
            header.classList.remove('scrolled');
            console.log('移除 scrolled 類別');
        }
    }
}

// ===== INITIALIZATION =====

/**
 * 初始化滾動效果
 * 設定必要的 DOM 元素並綁定滾動事件
 */
function initScrollEffects() {
    // 獲取必要的 DOM 元素
    header = document.querySelector('header');
    hero = document.querySelector('.about-hero');
    
    if (!header) {
        console.error('找不到 header 元素');
        return;
    }
    
    if (!hero) {
        console.error('找不到 hero 元素');
        return;
    }
    
    console.log('初始化滾動效果:', {
        header: header,
        hero: hero,
        heroHeight: hero.offsetHeight
    });
    
    // 綁定滾動事件
    window.addEventListener('scroll', checkScroll);
    
    // 初始檢查
    checkScroll();
}

// ===== EVENT LISTENERS =====

// 當 DOM 載入完成後初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 載入完成，開始初始化滾動效果');
    initScrollEffects();
});

// 當頁面完全載入後再次檢查（確保圖片等資源已載入）
window.addEventListener('load', function() {
    console.log('頁面完全載入，重新檢查滾動效果');
    // 重新獲取元素（以防動態載入）
    header = document.querySelector('header');
    hero = document.querySelector('.about-hero');
    checkScroll();
});

// ===== EXPORT FOR MODULE SYSTEMS =====
// 如果使用模組系統，可以匯出函數
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        checkScroll,
        initScrollEffects
    };
} 