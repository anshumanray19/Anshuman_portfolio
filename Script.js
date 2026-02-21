/* =========================================================
   ANSHUMAN PORTFOLIO — Premium Redesign – Script
   Pure vanilla JS, no jQuery
   ========================================================= */

// ========== 1. PARTICLE CANVAS ==========
(function () {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, particles = [], mouseX = -9999, mouseY = -9999;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.r = Math.random() * 1.8 + 0.4;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.alpha = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > w) this.vx *= -1;
            if (this.y < 0 || this.y > h) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(168,85,247,${this.alpha})`;
            ctx.fill();
        }
    }

    const count = Math.min(Math.floor((w * h) / 12000), 120);
    for (let i = 0; i < count; i++) particles.push(new Particle());

    function connectParticles() {
        const maxDist = 120;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < maxDist) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(168,85,247,${0.06 * (1 - dist / maxDist)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
            // Mouse interaction
            const dx = particles[i].x - mouseX;
            const dy = particles[i].y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouseX, mouseY);
                ctx.strokeStyle = `rgba(168,85,247,${0.15 * (1 - dist / 150)})`;
                ctx.lineWidth = 0.6;
                ctx.stroke();
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
    window.addEventListener('mouseleave', () => { mouseX = -9999; mouseY = -9999; });
})();


// ========== 2. LOADER ==========
window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    if (!loader) return;
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => { loader.style.display = 'none'; }, 600);
    }, 1200);
});


// ========== 3. TYPED.JS INIT ==========
window.addEventListener('load', function () {
    const target = document.querySelector('#typed-text');
    if (target && window.Typed) {
        target.textContent = '';
        new Typed('#typed-text', {
            strings: [
                "Hi, I'm Anshuman",
                'React Native | .NET Core | React.js',
                'Angular | Umbraco CMS',
                'Full-Stack Developer'
            ],
            typeSpeed: 55,
            backSpeed: 24,
            backDelay: 1100,
            startDelay: 300,
            smartBackspace: true,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
});


// ========== 4. INTERSECTION OBSERVER — REVEAL ==========
document.addEventListener('DOMContentLoaded', function () {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay || '0', 10);
                setTimeout(() => entry.target.classList.add('visible'), delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
});


// ========== 5. NAVBAR — scroll glass + active section ==========
document.addEventListener('DOMContentLoaded', function () {
    const nav = document.getElementById('navbar');
    const links = document.querySelectorAll('.nav__link[data-section]');
    const sections = Array.from(links).map(l => document.getElementById(l.dataset.section)).filter(Boolean);

    window.addEventListener('scroll', () => {
        // Glass bg on scroll
        nav.classList.toggle('scrolled', window.scrollY > 60);

        // Active section
        const scrollY = window.scrollY + 200;
        let currentId = '';
        sections.forEach(sec => {
            if (sec.offsetTop <= scrollY) currentId = sec.id;
        });
        links.forEach(l => {
            l.classList.toggle('active', l.dataset.section === currentId);
        });
    }, { passive: true });

    // Smooth scroll for nav links
    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.getElementById(link.dataset.section);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu if open
            document.getElementById('navLinks')?.classList.remove('open');
            document.getElementById('hamburger')?.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
});


// ========== 6. THEME TOGGLE ==========
document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const stored = localStorage.getItem('portfolio-theme');
    if (stored) html.setAttribute('data-theme', stored);

    toggle?.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('portfolio-theme', next);
    });
});


// ========== 7. MAGNETIC CURSOR ==========
(function () {
    const dot = document.querySelector('.cursor--dot');
    const circle = document.querySelector('.cursor--circle');
    if (!dot || !circle) return;
    // Hide cursor on touch devices
    if ('ontouchstart' in window) { dot.style.display = 'none'; circle.style.display = 'none'; return; }

    let mx = 0, my = 0, cx = 0, cy = 0;
    const speed = 0.12;

    function animate() {
        cx += (mx - cx) * speed;
        cy += (my - cy) * speed;
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
        circle.style.left = cx + 'px';
        circle.style.top = cy + 'px';
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    // Hover effects on interactive elements
    document.addEventListener('mouseover', e => {
        const interactive = e.target.closest('a, button, input[type="submit"], .tilt-card, .skill-item, .education-card');
        if (interactive) circle.classList.add('hover');
    });
    document.addEventListener('mouseout', e => {
        const interactive = e.target.closest('a, button, input[type="submit"], .tilt-card, .skill-item, .education-card');
        if (interactive) circle.classList.remove('hover');
    });
})();


// ========== 8. PROJECT CARD TILT ==========
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
        });
    });
});


// ========== 9. PROFICIENCY LIQUID SPHERES ==========
document.addEventListener('DOMContentLoaded', function () {
    // Observe the card container since the liquid is initially out of bounds
    const cards = document.querySelectorAll('.prof-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const liquid = card.querySelector('.liquid');
                const counter = card.querySelector('.count');

                if (liquid) {
                    // Animate Liquid
                    const percent = parseInt(liquid.dataset.percent, 10);
                    const targetTop = 100 - percent;
                    liquid.style.top = `${targetTop}%`;

                    // Animate Counter
                    if (counter) {
                        animateCounter(counter, 0, percent, 2000);
                    }
                }
                observer.unobserve(card);
            }
        });
    }, { threshold: 0.3 });

    cards.forEach(card => observer.observe(card));

    function animateCounter(el, start, end, duration) {
        const startTime = performance.now();
        function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            el.textContent = Math.round(start + (end - start) * eased);
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }
});

// ========== 9.5 PROJECT MARQUEE CLONE ==========
document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('marqueeTrack');
    if (!track) return;

    // Duplicate the content to create a seamless infinite scroll
    const clone = track.innerHTML;
    track.innerHTML += clone;
});


// ========== 10. SCROLL TO TOP ==========
document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;
    const circle = btn.querySelector('.scroll-top__ring-fill');
    const radius = 24;
    const circumference = 2 * Math.PI * radius;

    if (circle) {
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;
    }

    function update() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? scrollTop / docHeight : 0;

        if (circle) {
            circle.style.strokeDashoffset = circumference - progress * circumference;
        }

        if (scrollTop > 400) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    }

    window.addEventListener('scroll', update, { passive: true });
    update();

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});


// ========== 11. HAMBURGER MENU ==========
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });
});


// ========== 12. HERO PARALLAX ==========
window.addEventListener('scroll', function () {
    const video = document.getElementById('heroVideo');
    if (video) {
        video.style.transform = `translateY(${window.scrollY * 0.25}px)`;
    }
}, { passive: true });
