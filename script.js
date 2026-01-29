// ================================================
// THEME SYSTEM
// ================================================

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved theme or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

// Theme toggle functionality
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// ================================================
// MOBILE NAVIGATION
// ================================================

const mobileToggle = document.getElementById('mobileToggle');
const mainNav = document.getElementById('mainNav');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });
    
    // Close menu when clicking nav links
    const navLinks = mainNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
        });
    });
}

// ================================================
// SCROLL ANIMATIONS
// ================================================

// Simple AOS (Animate On Scroll) implementation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));
});

// ================================================
// HEADER SCROLL EFFECT
// ================================================

let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 10) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ================================================
// PHOTO ARCHIVE FUNCTIONALITY
// ================================================

if (document.querySelector('.gallery-grid')) {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const period = item.getAttribute('data-period');
                
                if (filter === 'all' || filter === period) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-caption')?.textContent || '';
            
            lightboxImage.src = img.src;
            lightboxCaption.textContent = caption;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // ESC key to close lightbox
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox?.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// ================================================
// SEARCH FUNCTIONALITY (for catalog pages)
// ================================================

const searchInput = document.getElementById('searchInput');
const catalogItems = document.querySelectorAll('.catalog-item');

if (searchInput && catalogItems.length > 0) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        catalogItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            
            if (text.includes(searchTerm)) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 10);
            } else {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
}

// ================================================
// ADMIN PANEL FUNCTIONALITY
// ================================================

if (document.getElementById('adminLogin')) {
    const adminLoginForm = document.getElementById('adminLoginForm');
    const adminLogin = document.getElementById('adminLogin');
    const adminPanel = document.getElementById('adminPanel');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Simple password check (client-side only)
    const ADMIN_PASSWORD = 'admin2026'; // Change this to your password
    
    // Check if already logged in
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    if (isLoggedIn === 'true') {
        adminLogin.style.display = 'none';
        adminPanel.classList.add('active');
    }
    
    adminLoginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('adminPassword').value;
        
        if (password === ADMIN_PASSWORD) {
            sessionStorage.setItem('adminLoggedIn', 'true');
            adminLogin.style.display = 'none';
            adminPanel.classList.add('active');
        } else {
            alert('Невірний пароль');
        }
    });
    
    logoutBtn?.addEventListener('click', () => {
        sessionStorage.removeItem('adminLoggedIn');
        location.reload();
    });
    
    // Tab switching
    const adminTabs = document.querySelectorAll('.admin-tab');
    const adminForms = document.querySelectorAll('.admin-form');
    
    adminTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            adminTabs.forEach(t => t.classList.remove('active'));
            adminForms.forEach(f => f.style.display = 'none');
            
            tab.classList.add('active');
            adminForms[index].style.display = 'block';
        });
    });
    
    // File upload preview
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const preview = input.parentElement.querySelector('.file-preview');
                    if (preview) {
                        preview.src = event.target.result;
                        preview.style.display = 'block';
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    });
    
    // ====== ВАЖЛИВО: ЗАМІНІТЬ ЦЮ АДРЕСУ НА СВОЮ! ======
    // Інструкцію як отримати свою адресу дивись в ІНСТРУКЦІЯ.txt
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyx5mKLGCLMhBO1p4jd-pQSHlp5mITWiQL3LEDDi6ahL8Jjlx85NdNd2PWBG1n-bPwZ-Q/exec';
    
    // Photo form submission (збереження фото в Google Sheets)
    const photoForm = document.getElementById('photoForm');

    photoForm?.addEventListener('submit', async (e) => {
        e.preventDefault();

        const imageUrl = document.getElementById('photoUrl').value;
        const title = document.getElementById('photoTitle').value;
        const period = document.getElementById('photoPeriod').value;

        if (!imageUrl || !title || !period) {
            alert('Заповни всі поля');
            return;
        }

        // Показуємо, що йде завантаження
        const submitBtn = photoForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Додаю...';
        submitBtn.disabled = true;

        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'addPhoto',
                    imageUrl: imageUrl,
                    title: title,
                    period: period,
                    date: new Date().toLocaleDateString('uk-UA')
                })
            });

            alert('Фото успішно додано! ✅\n\nОновіть сторінку фотоархіву через кілька секунд.');
            photoForm.reset();

        } catch (error) {
            alert('Помилка! Перевірте інтернет.');
            console.error('Помилка:', error);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
    
    // Book form submission
    const bookForm = document.getElementById('bookForm');
    bookForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Книгу успішно додано! (В повній версії це буде збережено в базі даних)');
        bookForm.reset();
    });
    
    // Metric book form submission
    const metricForm = document.getElementById('metricForm');
    metricForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Запис успішно додано! (В повній версії це буде збережено в базі даних)');
        metricForm.reset();
    });
}

// ================================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ================================================
// ACTIVE NAV LINK HIGHLIGHTING
// ================================================

const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// ================================================
// ЗАВАНТАЖЕННЯ ФОТО З GOOGLE SHEETS
// ================================================

// Функція для завантаження фотографій з Google Sheets
async function loadPhotosFromGoogleSheets() {
    const galleryGrid = document.querySelector('.gallery-grid');
    
    // Якщо ми не на сторінці галереї, нічого не робимо
    if (!galleryGrid) return;
    
    // Адреса Google Script (замініть на свою!)
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyx5mKLGCLMhBO1p4jd-pQSHlp5mITWiQL3LEDDi6ahL8Jjlx85NdNd2PWBG1n-bPwZ-Q/exec';
    
    try {
        const response = await fetch(GOOGLE_SCRIPT_URL + '?action=getPhotos');
        const data = await response.json();
        
        if (data.status === 'success' && data.photos && data.photos.length > 0) {
            // Очищаємо галерею від прикладів
            galleryGrid.innerHTML = '';
            
            // Додаємо всі фото з таблиці
            data.photos.forEach((photo, index) => {
                const delay = index * 50; // Анімація з затримкою
                
                const photoElement = document.createElement('div');
                photoElement.className = 'gallery-item';
                photoElement.setAttribute('data-period', photo.period);
                photoElement.setAttribute('data-aos', 'fade-up');
                photoElement.setAttribute('data-aos-delay', delay);
                
                photoElement.innerHTML = `
                    <img src="${photo.imageUrl}" alt="${photo.title}">
                    <div class="gallery-caption">
                        ${photo.title}
                    </div>
                `;
                
                galleryGrid.appendChild(photoElement);
            });
            
            // Повторно додаємо обробники для лайтбоксу
            initGalleryLightbox();
        }
    } catch (error) {
        console.log('Не вдалося завантажити фото з Google Sheets, показуємо приклади');
        // Якщо помилка - залишаємо приклади, які вже є в HTML
    }
}

// Функція для ініціалізації лайтбоксу після завантаження фото
function initGalleryLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-caption')?.textContent || '';
            
            lightboxImage.src = img.src;
            lightboxCaption.textContent = caption;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
}

// Завантажуємо фото при завантаженні сторінки
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadPhotosFromGoogleSheets);
} else {
    loadPhotosFromGoogleSheets();
}
