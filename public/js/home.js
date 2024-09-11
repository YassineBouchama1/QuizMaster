const menuBtn = document.querySelector('.menu-btn');
const navigation = document.querySelector('.navigation');

menuBtn.addEventListener('click', () => {
    navigation.classList.toggle('active');
    menuBtn.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll(".slideshow img");
    let currentSlide = 0;

    slides[currentSlide].classList.add("active");


    function showNextSlide() {
        slides[currentSlide].classList.remove("active");
        
        currentSlide = (currentSlide + 1) % slides.length;

        slides[currentSlide].classList.add("active");
    }

    setInterval(showNextSlide, 3000);
});