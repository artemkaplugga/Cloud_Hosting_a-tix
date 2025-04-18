// Swiper initialization code will go here 

document.addEventListener('DOMContentLoaded', function () {
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 0) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Добавление параллакс-эффекта для баннера
    const bannerSection = document.querySelector('.banner');
    const bannerImage = document.querySelector('.banner-image img');
    const particlesContainer = document.querySelector('.particles-container');
    
    // Создаем частицы
    function createParticles() {
        if (!particlesContainer) return;
        
        // Очищаем контейнер
        particlesContainer.innerHTML = '';
        
        // Создаем случайное количество частиц
        const particleCount = Math.floor(Math.random() * 15) + 10;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Размер от 2px до 6px
            const size = Math.random() * 4 + 2;
            
            // Случайное положение
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Скорость анимации от 15s до 30s
            const animDuration = Math.random() * 15 + 15;
            
            // Задержка от 0 до 5s
            const delay = Math.random() * 5;
            
            // Стили частицы
            particle.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${posX}%;
                top: ${posY}%;
                animation-duration: ${animDuration}s;
                animation-delay: ${delay}s;
                opacity: ${Math.random() * 0.5 + 0.3};
            `;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Создаем стили для частиц
    function createParticleStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .particle {
                position: absolute;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                pointer-events: none;
                animation: floatParticle linear infinite;
            }
            
            @keyframes floatParticle {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                }
                25% {
                    transform: translate(100px, -50px) rotate(90deg);
                }
                50% {
                    transform: translate(50px, -100px) rotate(180deg);
                }
                75% {
                    transform: translate(-50px, -50px) rotate(270deg);
                }
                100% {
                    transform: translate(0, 0) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    if (bannerSection && bannerImage) {
        // Создаем стили и частицы
        createParticleStyles();
        createParticles();
        
        // Обновляем частицы каждые 30 секунд
        setInterval(createParticles, 30000);
        
        window.addEventListener('mousemove', function(e) {
            let mouseX = e.clientX / window.innerWidth;
            let mouseY = e.clientY / window.innerHeight;
            
            let moveX = (mouseX - 0.5) * 30;
            let moveY = (mouseY - 0.5) * 30;
            
            bannerImage.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
            
            // Добавляем эффект для частиц
            if (particlesContainer) {
                particlesContainer.style.transform = `translate(${moveX * 0.2}px, ${moveY * 0.2}px)`;
            }
        });
        
        // Анимация появления при скролле
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
        }
        
        function handleScrollAnimation() {
            if (isInViewport(bannerSection)) {
                bannerSection.classList.add('visible');
            }
        }
        
        window.addEventListener('scroll', handleScrollAnimation);
        handleScrollAnimation(); // Запустить сразу при загрузке
    }

    // Инициализация Swiper
    const swiper = new Swiper('.mySwiper', {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // Handle video background
    const videoElement = document.querySelector('.hero-background-video');
    const fallbackImage = document.querySelector('.hero-background-video + img');
    
    if (videoElement) {
        // Add event listeners to check if video can play
        videoElement.addEventListener('error', function() {
            handleVideoError();
        });
        
        // Some browsers don't support autoplay, so we need to check this
        videoElement.addEventListener('canplay', function() {
            videoElement.play().catch(function() {
                handleVideoError();
            });
        });
        
        // Try to play the video
        if (videoElement.readyState >= 3) { // HAVE_FUTURE_DATA or higher
            videoElement.play().catch(function() {
                handleVideoError();
            });
        }
    }
    
    function handleVideoError() {
        // If video can't be played, show the fallback image
        if (fallbackImage) {
            videoElement.style.display = 'none';
            fallbackImage.style.display = 'block';
        }
    }

    // Detect scroll for section animations
    const sections = document.querySelectorAll('.hosting-promo, .features-strip, .services-overview, .why-aetix');
    
    const handleScroll = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
            }
        });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check on page load
    handleScroll();

    // Модальные окна
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const closeButtons = document.querySelectorAll('.modal-close');
    
    // Открытие модальных окон
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    registerBtn.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    // Закрытие модальных окон
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
            document.body.style.overflow = '';
        });
    });

    // Закрытие при клике вне модального окна
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = '';
        }
        if (e.target === registerModal) {
            registerModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Показать/скрыть пароль
    const showPasswordToggles = document.querySelectorAll('input[type="checkbox"]');
    showPasswordToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const passwordInput = this.closest('.form-group').querySelector('input[type="password"]');
            passwordInput.type = this.checked ? 'text' : 'password';
        });
    });

    // Управление авторизацией и профилем пользователя
    const authLinks = document.querySelector('.auth-links');
    const userProfile = document.getElementById('userProfile');
    const userAvatar = document.getElementById('userAvatar');
    const userMenuHeader = document.querySelector('.user-menu-header');
    const logoutBtn = document.getElementById('logoutBtn');

    // Функция для получения инициалов из имени
    function getInitials(name) {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    }

    // Функция для сброса UI в состояние "не авторизован"
    function resetUIToLoggedOut() {
        // Показываем кнопки входа/регистрации
        if (loginBtn) loginBtn.style.display = 'inline';
        if (document.querySelector('.auth-separator')) document.querySelector('.auth-separator').style.display = 'inline';
        if (registerBtn) registerBtn.style.display = 'inline';
        // Скрываем профиль
        if (userProfile) userProfile.style.display = 'none';
    }

    // Функция для обновления UI после входа
    function updateUIAfterLogin(userData) {
        // Скрываем кнопки входа/регистрации
        if (loginBtn) loginBtn.style.display = 'none';
        if (document.querySelector('.auth-separator')) document.querySelector('.auth-separator').style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';

        // Показываем профиль
        if (userProfile) userProfile.style.display = 'block';
        
        // Устанавливаем инициалы в аватар
        if (userAvatar) userAvatar.textContent = getInitials(userData.username);
        
        // Обновляем информацию в меню
        if (userMenuHeader) {
            userMenuHeader.querySelector('.user-name').textContent = userData.username;
            userMenuHeader.querySelector('.user-email').textContent = userData.email;
        }

        // Сохраняем данные пользователя
        localStorage.setItem('user', JSON.stringify(userData));
    }

    // Функция для выхода
    function logout() {
        localStorage.removeItem('user');
        // Немедленно обновляем UI (хотя это не повлияет после редиректа)
        resetUIToLoggedOut(); 
        window.location.href = 'index.html';
    }

    // Проверяем, есть ли сохраненный пользователь при загрузке страницы
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
        try {
            const parsedUser = JSON.parse(savedUser);
            updateUIAfterLogin(parsedUser);
        } catch (error) {
            console.error("Ошибка парсинга сохраненных данных пользователя:", error);
            localStorage.removeItem('user'); // Очищаем поврежденные данные
            resetUIToLoggedOut(); // Явно сбрасываем UI
        }
    } else {
        resetUIToLoggedOut(); // Явно сбрасываем UI, если пользователя нет
    }

    // Обработка отправки форм
    const forms = document.querySelectorAll('.modal-form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Собираем данные формы
            const formData = new FormData(form);
            const userData = {
                username: formData.get('studentId') || formData.get('regStudentId'),
                email: formData.get('regEmail') || 'user@example.com',
                password: formData.get('password') || formData.get('regPassword')
            };

            // Здесь должен быть запрос к серверу
            // Имитируем успешную авторизацию
            updateUIAfterLogin(userData);

            // Закрываем модальное окно
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
            document.body.style.overflow = '';
        });
    });

    // Обработка клика по аватару
    userAvatar.addEventListener('click', function(e) {
        const userMenu = this.nextElementSibling;
        userMenu.classList.toggle('active');
        e.stopPropagation();
    });

    // Закрытие меню при клике вне его
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.user-menu') && !e.target.closest('.user-avatar')) {
            document.querySelector('.user-menu').classList.remove('active');
        }
    });

    // Обработка выхода
    if (logoutBtn) { // Убедимся, что кнопка выхода есть на странице
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }

      // FAQ functionality
      document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle the clicked item
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

}); 