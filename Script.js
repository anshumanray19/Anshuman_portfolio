AOS.init({
    duration: 2000,
});

window.addEventListener('load', function() {
            setTimeout(function() {
                document.getElementById('loader').style.display = 'none';
                document.getElementById('content').style.display = 'block';
            }, 100); 
        });

$(document).ready(function() {
$('nav a').on('click', function(event) {
if (this.hash !== '') {
    event.preventDefault();
    const hash = this.hash;
    $('html, body').animate({
        scrollTop: $(hash).offset().top
    }, 1500, function() {
        window.location.hash = hash;
    });
}
});
});

  function generateRaindrops() {
            const header = document.querySelector('header');
            const numOfDrops = 20; 
            const dropContainer = document.createElement('div');
            dropContainer.classList.add('raindrop-container');
            header.appendChild(dropContainer);

            for (let i = 0; i < numOfDrops; i++) {
                const drop = document.createElement('div');
                drop.classList.add('raindrop');
                drop.style.left = `${Math.random() * 100}%`; 
                drop.style.animationDuration = `${1 + Math.random()}s`; 
                dropContainer.appendChild(drop);
            }
        }
        document.addEventListener('DOMContentLoaded', () => {
            generateRaindrops();
        });

//scroll button
function scrollToTop() {
window.scrollTo({
top: 0,
behavior: 'smooth'
});
}
document.addEventListener('DOMContentLoaded', function () {
var scrollToTopBtn = document.getElementById('scrollToTopBtn');

function checkScroll() {
if (window.pageYOffset > 0) {
    scrollToTopBtn.style.display = 'block';
} else {
    scrollToTopBtn.style.display = 'none';
}
}

window.addEventListener('scroll', checkScroll);

scrollToTopBtn.addEventListener('click', scrollToTop);
});


// Theme specific
$(document).ready(function() {
    const defaultTheme = 'light-theme'; 
    const currentTheme = localStorage.getItem('theme') || defaultTheme; 

    function toggleTheme(theme) {
        $('body').removeClass('light-theme dark-theme').addClass(theme);
        localStorage.setItem('theme', theme);
        updateIcons(theme);
    }

    toggleTheme(currentTheme);
    function updateIcons(theme) {
        if (theme === 'dark-theme') {
            $('#sun-icon').removeClass('active');
            $('#moon-icon').addClass('active');
        } else {
            $('#moon-icon').removeClass('active');
            $('#sun-icon').addClass('active');
        }
    }

    $('.theme-toggle-button').click(function() {
        const newTheme = $('body').hasClass('dark-theme') ? 'light-theme' : 'dark-theme';
        toggleTheme(newTheme);
    });
});

/* For scroll event */
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});