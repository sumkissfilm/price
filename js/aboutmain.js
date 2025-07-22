// Header Background Change on Scroll
const header = document.querySelector('header');
const hero = document.querySelector('.hero');

function handleHeaderScroll() {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    if (window.scrollY > heroBottom) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleHeaderScroll);

// Navigation Menu
document.addEventListener('DOMContentLoaded', function() {
    // Header Background Change on Scroll
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');

    function handleHeaderScroll() {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        if (window.scrollY > heroBottom) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll);

    // Navigation Menu Setup
    const menuToggle = document.querySelector('.menu-toggle');
    const navContainer = document.querySelector('.nav-container');
    const navOverlay = document.querySelector('.nav-overlay');
    const dropdowns = document.querySelectorAll('.dropdown, .nav-item.dropdown');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // Debug output
    console.log('初始化菜單...');
    console.log('菜單項數量:', dropdowns.length);
    dropdowns.forEach((dropdown, i) => {
        const link = dropdown.querySelector('.nav-link');
        const menu = dropdown.querySelector('.dropdown-menu');
        const items = menu ? menu.querySelectorAll('li') : [];
        console.log(`菜單項 ${i+1}:`, link ? link.textContent : '無鏈接');
        console.log(`子菜單項數量:`, items.length);
    });

    // Mobile menu toggle - 使用Bootstrap處理，這裡只監聽狀態變化
    if (navbarToggler && navbarCollapse) {
        // 監聽Bootstrap選單狀態變化
        navbarCollapse.addEventListener('shown.bs.collapse', function() {
            document.body.classList.add('menu-open');
        });
        
        navbarCollapse.addEventListener('hidden.bs.collapse', function() {
            document.body.classList.remove('menu-open');
        });
    }

    // Dropdown menu functionality
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            toggle.addEventListener('click', (e) => {
                // Only prevent default on mobile
                if (window.innerWidth <= 900) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other dropdowns
                    dropdowns.forEach(item => {
                        if (item !== dropdown) {
                            item.classList.remove('active');
                            const otherMenu = item.querySelector('.dropdown-menu');
                            if (otherMenu) otherMenu.classList.remove('show');
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                    menu.classList.toggle('show');
                }
            });
        }
    });

    // Handle dropdown menu links
    document.querySelectorAll('.dropdown-menu a').forEach(link => {
        link.addEventListener('click', function() {
            if (navContainer) navContainer.classList.remove('active');
            if (navOverlay) navOverlay.classList.remove('active');
            
            // 使用Bootstrap的方法關閉選單
            if (navbarCollapse) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
            
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) menu.classList.remove('show');
            });
        });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900) {
            if (navContainer) navContainer.classList.remove('active');
            if (navOverlay) navOverlay.classList.remove('active');
            
            // 使用Bootstrap的方法關閉選單
            if (navbarCollapse) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
            
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) menu.classList.remove('show');
            });
        }
    });

    // Smooth scroll functionality
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation observer setup
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

        document.querySelectorAll('.service-card, .work-item').forEach(el => {
        observer.observe(el);
    });
}); 