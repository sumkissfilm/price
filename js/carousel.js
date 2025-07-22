/* ========================================
   SUMMER KISSES - CAROUSEL JAVASCRIPT
   ======================================== */

/*
    本檔案負責文字輪播功能：
    - 處理關於我們頁面的文字輪播
    - 提供切換按鈕功能
    - 手動切換功能
*/

// ===== GLOBAL VARIABLES =====
let currentSlide = 0;
let totalSlides = 0;
let carouselContainer, carouselContent, carouselButtons, scrollHint;

// ===== CAROUSEL FUNCTIONS =====

/**
 * 初始化輪播功能
 */
function initCarousel() {
    carouselContainer = document.querySelector('.text-carousel-container');
    carouselContent = document.querySelector('.carousel-content');
    carouselButtons = document.querySelectorAll('.carousel-btn');
    scrollHint = document.querySelector('.scroll-hint');
    
    if (!carouselContainer || !carouselContent || carouselButtons.length === 0) {
        console.warn('找不到輪播元素');
        return;
    }
    
    totalSlides = carouselButtons.length;
    
    console.log('初始化輪播功能:', {
        totalSlides,
        carouselContainer: !!carouselContainer,
        carouselContent: !!carouselContent,
        carouselButtons: carouselButtons.length,
        scrollHint: !!scrollHint
    });
    
    // 綁定按鈕事件
    carouselButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            goToSlide(index);
        });
    });
    
    // 初始化滑動提示
    initScrollHint();
    
    // 初始顯示第一張
    showSlide(0);
}

/**
 * 切換到指定幻燈片
 */
function goToSlide(slideIndex) {
    if (slideIndex < 0 || slideIndex >= totalSlides) {
        console.warn('無效的幻燈片索引:', slideIndex);
        return;
    }
    
    currentSlide = slideIndex;
    showSlide(currentSlide);
    updateButtons();
    
    // 確保文字容器顯示第一行
    resetTextContainerScroll();
    
    console.log('切換到幻燈片:', currentSlide);
}

/**
 * 顯示指定幻燈片
 */
function showSlide(slideIndex) {
    const messages = document.querySelectorAll('.message-content');
    const buttons = document.querySelectorAll('.carousel-btn');
    
    // 隱藏所有訊息
    messages.forEach(message => {
        message.classList.remove('active');
    });
    
    // 移除所有按鈕的 active 狀態
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    
    // 顯示指定訊息
    if (messages[slideIndex]) {
        messages[slideIndex].classList.add('active');
    }
    
    // 啟用指定按鈕
    if (buttons[slideIndex]) {
        buttons[slideIndex].classList.add('active');
    }
}

/**
 * 更新按鈕狀態
 */
function updateButtons() {
    carouselButtons.forEach((button, index) => {
        if (index === currentSlide) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

/**
 * 下一張幻燈片
 */
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
    updateButtons();
    
    // 確保文字容器顯示第一行
    resetTextContainerScroll();
}

/**
 * 上一張幻燈片
 */
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
    updateButtons();
    
    // 確保文字容器顯示第一行
    resetTextContainerScroll();
}

/**
 * 處理鍵盤事件
 */
function handleKeyboard(e) {
    if (!carouselContainer) return;
    
    switch(e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            prevSlide();
            break;
        case 'ArrowRight':
            e.preventDefault();
            nextSlide();
            break;
    }
}

/**
 * 重置文字容器滾動位置
 */
function resetTextContainerScroll() {
    const activeMessage = document.querySelector('.message-content.active');
    if (activeMessage) {
        // 將文字容器滾動到頂部，確保顯示第一行
        activeMessage.scrollTo({
            top: 0,
            behavior: 'instant'
        });
        
        // 重置滑動提示
        resetScrollHint();
    }
}

/**
 * 初始化滑動提示
 */
function initScrollHint() {
    if (!scrollHint) return;
    
    // 只在非桌面版顯示滑動提示
    if (window.innerWidth < 992) {
        scrollHint.style.display = 'block';
        
        // 為每個訊息容器添加滾動監聽
        const messages = document.querySelectorAll('.message-content');
        messages.forEach(message => {
            message.addEventListener('scroll', handleMessageScroll);
        });
    } else {
        scrollHint.style.display = 'none';
    }
}

/**
 * 處理訊息滾動事件
 */
function handleMessageScroll() {
    if (!scrollHint) return;
    
    const activeMessage = document.querySelector('.message-content.active');
    if (!activeMessage) return;
    
    // 檢查是否滾動到底部
    const isAtBottom = activeMessage.scrollTop + activeMessage.clientHeight >= activeMessage.scrollHeight - 10;
    
    if (isAtBottom) {
        scrollHint.style.opacity = '0';
    } else {
        scrollHint.style.opacity = '0.8';
    }
}

/**
 * 重置滑動提示
 */
function resetScrollHint() {
    if (!scrollHint) return;
    
    // 只在非桌面版顯示
    if (window.innerWidth < 992) {
        scrollHint.style.display = 'block';
        scrollHint.style.opacity = '0.8';
    } else {
        scrollHint.style.display = 'none';
    }
}

/**
 * 處理視窗大小改變
 */
function handleWindowResize() {
    // 重新初始化滑動提示
    initScrollHint();
}

// ===== EVENT LISTENERS =====

// 當 DOM 載入完成後初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM 載入完成，開始初始化輪播功能');
    initCarousel();
});

// 綁定鍵盤事件
document.addEventListener('keydown', handleKeyboard);

// 綁定視窗大小改變事件
window.addEventListener('resize', handleWindowResize);

// ===== EXPORT FOR MODULE SYSTEMS =====
// 如果使用模組系統，可以匯出函數
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initCarousel,
        goToSlide,
        nextSlide,
        prevSlide
    };
} 