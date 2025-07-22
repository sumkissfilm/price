/* ========================================
   SUMMER KISSES - FOOTER JAVASCRIPT
   ======================================== */

/*
    本檔案負責頁尾的互動功能：
    - 頁尾動畫效果
    - 社群媒體連結處理
    - 無障礙功能
    - 響應式設計支援
*/

// ===== GLOBAL VARIABLES =====
let footer, socialLinks;

// ===== FOOTER FUNCTIONS =====

/**
 * 初始化頁尾功能
 */
function initFooter() {
    footer = document.querySelector('footer');
    socialLinks = document.querySelectorAll('.social-links a, .footer-section a');
    
    if (!footer) {
        console.warn('找不到 footer 元素');
        return;
    }
    
    console.log('初始化頁尾功能');
    
    // 初始化社群媒體連結
    initSocialLinks();
    
    // 初始化動畫效果
    initFooterAnimations();
    
    // 初始化無障礙功能
    initAccessibility();
}

/**
 * 初始化社群媒體連結
 */
function initSocialLinks() {
    socialLinks.forEach(link => {
        // 為外部連結添加 target="_blank" 和 rel="noopener noreferrer"
        if (link.hostname !== window.location.hostname) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
        
        // 添加點擊追蹤（可選）
        link.addEventListener('click', function(e) {
            console.log('點擊社群連結:', this.href);
        });
        
        // 添加鍵盤導航支援
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

/**
 * 初始化頁尾動畫效果
 */
function initFooterAnimations() {
    // 檢查頁尾是否在視窗中
    function checkFooterVisibility() {
        if (!footer) return;
        
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // 當頁尾進入視窗時添加動畫類別
        if (footerRect.top < windowHeight) {
            footer.classList.add('visible');
        }
    }
    
    // 綁定滾動事件
    window.addEventListener('scroll', checkFooterVisibility);
    
    // 初始檢查
    checkFooterVisibility();
}

/**
 * 初始化無障礙功能
 */
function initAccessibility() {
    // 為所有社群媒體圖示添加 aria-label
    const socialIcons = document.querySelectorAll('.social-links a i, .footer-section a i');
    socialIcons.forEach(icon => {
        const link = icon.closest('a');
        if (link && !link.getAttribute('aria-label')) {
            const iconClass = icon.className;
            let label = '';
            
            if (iconClass.includes('youtube')) {
                label = 'YouTube';
            } else if (iconClass.includes('instagram')) {
                label = 'Instagram';
            } else if (iconClass.includes('facebook')) {
                label = 'Facebook';
            } else if (iconClass.includes('home')) {
                label = '首頁';
            } else {
                label = '社群媒體連結';
            }
            
            link.setAttribute('aria-label', label);
        }
    });
    
    // 添加焦點可見性
    const focusableElements = footer.querySelectorAll('a, button, [tabindex]');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #f7bc51';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

/**
 * 處理頁尾響應式設計
 */
function handleFooterResponsive() {
    if (!footer) return;
    
    const windowWidth = window.innerWidth;
    const footerContent = footer.querySelector('.footer-content');
    
    if (windowWidth <= 768) {
        // 手機版：調整佈局
        if (footerContent) {
            footerContent.style.flexDirection = 'column';
            footerContent.style.gap = '2rem';
        }
    } else {
        // 桌面版：恢復水平佈局
        if (footerContent) {
            footerContent.style.flexDirection = 'row';
            footerContent.style.gap = '4rem';
        }
    }
}

/**
 * 平滑滾動到頁尾
 */
function scrollToFooter() {
    if (!footer) return;
    
    footer.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// ===== UTILITY FUNCTIONS =====

/**
 * 檢查頁尾是否在視窗底部
 */
function isFooterAtBottom() {
    if (!footer) return false;
    
    const footerRect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    return footerRect.bottom <= windowHeight;
}

/**
 * 獲取頁尾高度
 */
function getFooterHeight() {
    return footer ? footer.offsetHeight : 0;
}

// ===== EVENT LISTENERS =====

// 當 DOM 載入完成後初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 載入完成，開始初始化頁尾功能');
    initFooter();
});

// 處理視窗大小變化
window.addEventListener('resize', function() {
    handleFooterResponsive();
});

// 處理頁面可見性變化
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // 頁面重新可見時重新檢查
        initFooterAnimations();
    }
});

// ===== EXPORT FOR MODULE SYSTEMS =====
// 如果使用模組系統，可以匯出函數
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initFooter,
        initSocialLinks,
        initFooterAnimations,
        initAccessibility,
        scrollToFooter,
        isFooterAtBottom,
        getFooterHeight
    };
} 