/* ========================================
   SUMMER KISSES - MAIN JAVASCRIPT
   ======================================== */

/*
    本檔案負責網站的主要互動功能：
    - 導航選單的展開收合
    - 響應式選單控制
    - 一般互動功能
    - 搭配 Bootstrap 5 的導航功能
*/

// ===== GLOBAL VARIABLES =====
let navbarToggler, navbarCollapse;

// ===== NAVIGATION MENU FUNCTIONS =====

/**
 * 初始化導航選單功能
 */
function initNavigation() {
    navbarToggler = document.querySelector('.navbar-toggler');
    navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (!navbarToggler || !navbarCollapse) {
        console.warn('找不到導航選單元素');
        return;
    }
    
    console.log('初始化導航選單');
    
    // 監聽Bootstrap選單狀態變化
    navbarCollapse.addEventListener('shown.bs.collapse', function() {
        document.body.classList.add('menu-open');
    });
    
    navbarCollapse.addEventListener('hidden.bs.collapse', function() {
        document.body.classList.remove('menu-open');
    });
    
    // 點擊選單外區域關閉選單
    document.addEventListener('click', function(event) {
        if (!navbarToggler.contains(event.target) && 
            !navbarCollapse.contains(event.target) && 
            navbarCollapse.classList.contains('show')) {
            
            // 使用Bootstrap的方法關閉選單
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
    });
    
    // 點擊導航連結關閉選單
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 991) { // 只在行動版關閉選單
                // 使用Bootstrap的方法關閉選單
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        });
    });
    
    // 點擊關閉按鈕關閉選單
    const menuCloseBtn = document.querySelector('.menu-close-btn');
    if (menuCloseBtn) {
        menuCloseBtn.addEventListener('click', function() {
            // 使用Bootstrap的方法關閉選單
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        });
    }
}

/**
 * 處理視窗大小變化
 */
function handleResize() {
    if (window.innerWidth > 991) {
        // 桌面版：確保選單是展開的
        navbarCollapse.classList.remove('show');
        navbarToggler.classList.add('collapsed');
        document.body.classList.remove('menu-open');
    }
}

// ===== UTILITY FUNCTIONS =====

/**
 * 平滑滾動到指定元素
 */
function smoothScrollTo(element, offset = 0) {
    if (!element) return;
    
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const headerHeight = document.querySelector('header').offsetHeight;
    const targetPosition = elementPosition - headerHeight - offset;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

/**
 * 處理錨點連結
 */
function initAnchorLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                smoothScrollTo(targetElement);
            }
        });
    });
}

// ===== INITIALIZATION =====

/**
 * 主要初始化函數
 */
function init() {
    console.log('初始化主要功能');
    
    // 初始化導航選單
    initNavigation();
    
    // 初始化錨點連結
    initAnchorLinks();
    
    // 綁定視窗大小變化事件
    window.addEventListener('resize', handleResize);
    
    console.log('主要功能初始化完成');
}

// ===== EVENT LISTENERS =====

// 當 DOM 載入完成後初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 載入完成，開始初始化主要功能');
    init();
});

// ===== EXPORT FOR MODULE SYSTEMS =====
// 如果使用模組系統，可以匯出函數
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        init,
        initNavigation,
        smoothScrollTo
    };
} 