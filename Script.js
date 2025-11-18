// AOS Initialization with easing for smoothness
AOS.init({
    duration: 1200,
    easing: 'ease-in-out',
    once: true
});

// Loader fade-out
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loader').classList.add('fade-out');
        setTimeout(function() {
            document.getElementById('loader').style.display = 'none';
        }, 2000);
    }, 1000);
});

// Smooth scrolling
$(document).ready(function() {
    $('a.smooth-scroll').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {
                window.location.hash = hash;
            });
        }
    });
});

// Premium Scroll-to-Top with progress ring
document.addEventListener('DOMContentLoaded', function() {
    const btn = document.getElementById('scrollToTopBtn');
    const circle = btn.querySelector('.progress-ringcircle');

    // Prepare ring math
    const radius = 22;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    const updateProgress = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
        const winHeight = window.innerHeight;
        const maxScroll = docHeight - winHeight;
        const progress = maxScroll > 0 ? (scrollTop / maxScroll) : 0;
        const offset = circumference - (progress * circumference);
        circle.style.strokeDashoffset = offset;

        // visibility
        if (scrollTop > 300) {
            if (btn.style.display !== 'flex') {
                btn.style.display = 'flex';
            }
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
            // small delay to allow fade-out
            setTimeout(() => {
                if (!btn.classList.contains('show')) {
                    btn.style.display = 'none';
                }
            }, 200);
        }
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });

    btn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Theme toggle with transition
$(document).ready(function() {
    const defaultTheme = 'light-theme';
    const currentTheme = localStorage.getItem('theme') || defaultTheme;

    function toggleTheme(theme) {
        $('body').removeClass('light-theme dark-theme').addClass(theme);
        localStorage.setItem('theme', theme);
        updateIcons(theme);
    }

    function updateIcons(theme) {
        if (theme === 'dark-theme') {
            $('#sun-icon').addClass('active');
            $('#moon-icon').removeClass('active');
        } else {
            $('#moon-icon').addClass('active');
            $('#sun-icon').removeClass('active');
        }
    }

    toggleTheme(currentTheme);

    $('.theme-toggle-button').click(function() {
        const newTheme = $('body').hasClass('dark-theme') ? 'light-theme' : 'dark-theme';
        toggleTheme(newTheme);
    });
});

// Typing animation in header - hardened
// - Runs after window load to ensure Typed is ready
// - Guards against missing element or library
window.addEventListener('load', function() {
    const target = document.querySelector('#typed-text');
    if (target && window.Typed) {
        // Clear any previous content just in case
        target.textContent = '';
        new Typed('#typed-text', {
            strings: [
                'Hi, I\'m Anshuman',
                'React Native | .NET Core | React.js',
                'Angular | Umbraco CMS',
                'Full-Stack Developer'
            ],
            typeSpeed: 55,
            backSpeed: 24,
            backDelay: 1100,
            startDelay: 120,
            smartBackspace: true,
            loop: true,
            showCursor: false
        });
    }
});

// Simple parallax on header using scroll
window.addEventListener('scroll', function() {
    const video = document.querySelector('#headerVideo');
    if (video) {
        video.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    }
});

// Navbar shadow/background on scroll - single listener
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    navbar.classList.toggle('scrolled', window.scrollY > 0);
});

// Custom cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorCircle = document.querySelector('.cursor-circle');
let mouseX = 0, mouseY = 0;
let circleX = 0, circleY = 0;
const speed = 0.1;

const animateCursor = () => {
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';

    const dx = mouseX - circleX;
    const dy = mouseY - circleY;
    circleX += dx * speed;
    circleY += dy * speed;

    cursorCircle.style.left = circleX + 'px';
    cursorCircle.style.top = circleY + 'px';

    requestAnimationFrame(animateCursor);
};

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    animateCursor();
});

const interactiveElements = document.querySelectorAll('a, button, input[type="submit"], .interactive');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorCircle.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorCircle.style.borderColor = '#f88130';
    });
    el.addEventListener('mouseleave', () => {
        cursorCircle.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorCircle.style.borderColor = '#153d5c';
    });
});

// Animate proficiency bars when in view - IntersectionObserver
document.addEventListener('DOMContentLoaded', function() {
    const progressBars = document.querySelectorAll('.progress-bar');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
                bar.classList.add('filled');
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));
});

// Updated: Marquee Scroll Enhancement - Pause on hover and responsive speed
document.addEventListener('DOMContentLoaded', function() {
    const marquee = document.querySelector('.projects-track');
    if (marquee) {
        const originalDuration = 30; // Base speed in seconds
        let animationDuration = originalDuration;

        // Pause on hover
        marquee.addEventListener('mouseenter', () => {
            marquee.style.animationPlayState = 'paused';
        });

        marquee.addEventListener('mouseleave', () => {
            marquee.style.animationPlayState = 'running';
        });

        // Responsive speed adjustment
        function adjustSpeed() {
            const width = window.innerWidth;
            if (width < 768) {
                animationDuration = 40; // Slower on mobile
            } else {
                animationDuration = 30;
            }
            marquee.style.animationDuration = animationDuration + 's';
        }

        adjustSpeed();
        window.addEventListener('resize', adjustSpeed);
    }
});

// Marquee Enhancement - Pause on hover and responsive speed
document.addEventListener('DOMContentLoaded', function() {
    const marquee = document.querySelector('.projects-track');
    if (marquee) {
        const baseDuration = 35; // Base scroll speed in seconds
        let animationDuration = baseDuration;

        // Pause on hover
        marquee.addEventListener('mouseenter', () => {
            marquee.style.animationPlayState = 'paused';
        });

        marquee.addEventListener('mouseleave', () => {
            marquee.style.animationPlayState = 'running';
        });

        // Adjust speed based on screen size
        function adjustSpeed() {
            const width = window.innerWidth;
            if (width < 768) {
                animationDuration = 45; // Slower on tablet/mobile
            } else if (width < 480) {
                animationDuration = 50; // Even slower on small mobile
            } else {
                animationDuration = baseDuration;
            }
            marquee.style.animationDuration = animationDuration + 's';
        }

        adjustSpeed();
        window.addEventListener('resize', adjustSpeed);
    }
});
