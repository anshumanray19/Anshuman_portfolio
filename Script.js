AOS.init({
    duration: 3000,
});

$(document).ready(function() {
$('nav a').on('click', function(event) {
if (this.hash !== '') {
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


$(document).ready(function() {
// Check the theme preference from localStorage on page load
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
$('body').addClass(currentTheme);
if (currentTheme === 'dark-theme') {
    $('#themeToggle').prop('checked', true);
}
}

// Toggle theme when switch is changed
$('#themeToggle').change(function() {
if ($(this).prop('checked')) {
    $('body').removeClass('light-theme').addClass('dark-theme');
    localStorage.setItem('theme', 'dark-theme');
} else {
    $('body').removeClass('dark-theme').addClass('light-theme');
    localStorage.setItem('theme', 'light-theme');
}
});
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
