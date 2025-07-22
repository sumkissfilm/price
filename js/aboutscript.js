/* ===== Variables and Constants ===== */
const scrollThreshold = 100;
const animationDelay = 200;
const fadeInOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

/* ===== DOM Elements ===== */
const header = document.querySelector('header');
const hero = document.querySelector('.about-hero');

/* ===== Functions ===== */
function handleScroll() {
    if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

function handleHeaderScroll() {
    if (!hero) return;
    
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    if (window.scrollY > heroBottom) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

/* ===== Event Listeners ===== */
document.addEventListener('DOMContentLoaded', function() {
    // 初始化滾動事件
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleHeaderScroll);

    // 導航欄滾動效果
    const navbar = document.querySelector('.navbar');
    const scrollThreshold = 50;

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 初始檢查滾動狀態
    if (window.scrollY > scrollThreshold) {
        navbar.classList.add('scrolled');
    }

    // 點擊導航鏈接時平滑滾動到目標位置
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // 在移動設備上，點擊後關閉導航菜單
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (window.getComputedStyle(navbarToggler).display !== 'none') {
                    // 使用Bootstrap的方法關閉選單
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            }
        });
    });

    // Handle scroll animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    /* 移除團隊成員hover效果，因為HTML使用Bootstrap定位 */

    // Story image hover effect
    const storyImages = document.querySelectorAll('.story-image');
    
    storyImages.forEach(image => {
        const img = image.querySelector('img');
        if (img) {
            image.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.05)';
            });

            image.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
            });
        }
    });

    /* 移除未使用的按鈕效果，因為HTML使用Bootstrap按鈕 */
});