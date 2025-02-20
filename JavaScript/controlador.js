let myCarousel;
let autoSlideInterval;
let userInteracted = false;
let restartAutoSlideTimeout;

function closeWindow() {
    var sound = document.getElementById("close-sound");
    sound.play();
    setTimeout(() => {
        window.close();
    }, 1000);
}

function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(() => {
        if (!userInteracted) {
            myCarousel.next();
        }
    }, 5000); // Cambia de imagen cada 5 segundos
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function restartAutoSlideAfterDelay() {
    clearTimeout(restartAutoSlideTimeout);
    restartAutoSlideTimeout = setTimeout(() => {
        userInteracted = false; // Restablece el auto-slide
        startAutoSlide();
    }, 5000); // Espera 5 segundos antes de reanudar el auto-slide
}

window.onload = function() {
    myCarousel = new bootstrap.Carousel(document.getElementById("carouselExample"), {
        interval: false,
        wrap: true
    });

    startAutoSlide();
    setTimeout(closeWindow, 60000);

    let prevButton = document.querySelector(".carousel-nav .carousel-control-prev");
    let nextButton = document.querySelector(".carousel-nav .carousel-control-next");

    if (prevButton && nextButton) {
        prevButton.addEventListener("click", () => {
            stopAutoSlide();
            userInteracted = true;
            restartAutoSlideAfterDelay();
        });

        nextButton.addEventListener("click", () => {
            stopAutoSlide();
            userInteracted = true;
            restartAutoSlideAfterDelay();
        });
    }
};
