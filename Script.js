// AOS Initialization with easing for smoothness
AOS.init({
    duration: 1200, // Slightly faster for elegance
    easing: 'ease-in-out',
    once: true // Animate only once
});

// Loader fade-out
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loader').classList.add('fade-out');
        setTimeout(() => { document.getElementById('loader').style.display = 'none'; }, 500);
    }, 100);
});

// Smooth scrolling
$(document).ready(function() {
    $('a.smooth-scroll').on('click', function(event) {
        if (this.hash !== '') {
            event.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() { // Faster scroll for better UX
                window.location.hash = hash;
            });
        }
    });
});

//Nav

document.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Generate raindrops (optimized: fewer on mobile)
// function generateRaindrops() {
//     const header = document.querySelector('header');
//     const numOfDrops = window.innerWidth < 768 ? 10 : 20; // Fewer on mobile
//     for (let i = 0; i < numOfDrops; i++) {
//         const drop = document.createElement('div');
//         drop.classList.add('raindrop');
//         drop.style.left = `${Math.random() * 100}%`;
//         drop.style.animationDuration = `${1.5 + Math.random()}s`;
//         header.appendChild(drop);
//     }
// }
// document.addEventListener('DOMContentLoaded', generateRaindrops);

// Scroll to top
document.addEventListener('DOMContentLoaded', function () {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    window.addEventListener('scroll', () => {
        scrollToTopBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none'; // Show after scrolling more
    });
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

// Typing animation in header
document.addEventListener('DOMContentLoaded', () => {
    new Typed('#typed-text', {
        strings: ["Hi, I'm Anshuman"],
        typeSpeed: 60,
        startDelay: 100,
        loop: false,
        showCursor: false // Removes the typing cursor
    });
});

// Animate proficiency bars on scroll
const animateBars = () => {
    document.querySelectorAll('.animate-fill').forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = `${width}%`;
    });
};
window.addEventListener('scroll', () => {
    if (document.getElementById('proficiency').getBoundingClientRect().top < window.innerHeight) {
        animateBars();
    }
});

// Simple parallax on header (using scroll)
window.addEventListener('scroll', () => {
    const video = document.querySelector('#headerVideo');
    video.style.transform = `translateY(${window.scrollY * 0.3}px)`; // Subtle parallax
});

// Navbar shadow on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    navbar.classList.toggle('scrolled', window.scrollY > 0);
});


 // Select the two cursor elements
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorCircle = document.querySelector('.cursor-circle');

  // Create two variables to store the position of the mouse
  let mouseX = 0;
  let mouseY = 0;

  // Create two variables to store the position of the circle
  let circleX = 0;
  let circleY = 0;

  // Set the speed of the circle's movement
  const speed = 0.1;

  // This function will be called on every frame
  const animate = () => {
    // Get the current position of the mouse
    const posX = mouseX;
    const posY = mouseY;

    // Move the dot directly to the mouse's position
    // The CSS 'transform: translate(-50%, -50%)' will center it on the cursor
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Calculate the distance between the circle and the mouse
    const dx = mouseX - circleX;
    const dy = mouseY - circleY;

    // Move the circle a fraction of the distance to the mouse
    // This creates the smooth, "lagging" effect
    circleX += dx * speed;
    circleY += dy * speed;

    // Apply the new position to the circle
    cursorCircle.style.left = `${circleX}px`;
    cursorCircle.style.top = `${circleY}px`;

    // Request the next frame to continue the animation
    requestAnimationFrame(animate);
  };

  // Add an event listener to update the mouse position
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Start the animation
  animate();

  // (Optional) Add hover effect on links and buttons
  const interactiveElements = document.querySelectorAll('a, button, input[type="submit"], .interactive');

  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursorCircle.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorCircle.style.borderColor = '#f88130';
    });
    el.addEventListener('mouseleave', () => {
      cursorCircle.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorCircle.style.borderColor = '#153d5c';
    });
  });



  document.addEventListener('DOMContentLoaded', function () {
    const progressBars = document.querySelectorAll('.progress-bar');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute('data-width');
                    bar.style.width = `${width}%`;
                    bar.classList.add('filled');
                    observer.unobserve(bar);
                }
            });
        },
        { threshold: 0.5 }
    );

    progressBars.forEach((bar) => {
        observer.observe(bar);
    });
});