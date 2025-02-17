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
        myCarousel.next();
    }, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function restartAutoSlideAfterDelay() {
    clearTimeout(restartAutoSlideTimeout);
    restartAutoSlideTimeout = setTimeout(() => {
        userInteracted = false;
        startAutoSlide();
    }, 5000); // Reinicia el carrusel después de 5 segundos de inactividad
}

window.onload = function() {
    myCarousel = new bootstrap.Carousel(document.getElementById("carouselExample"), {
        interval: false,
        wrap: true
    });

    startAutoSlide();
    setTimeout(closeWindow, 60000);
};

// Eventos para detener el auto-slide cuando el usuario interactúa
document.querySelector(".carousel-control-prev").addEventListener("click", () => {
    stopAutoSlide();
    userInteracted = true;
    restartAutoSlideAfterDelay();
});

document.querySelector(".carousel-control-next").addEventListener("click", () => {
    stopAutoSlide();
    userInteracted = true;
    restartAutoSlideAfterDelay();
});