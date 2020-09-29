var longReviewsSlider = new Swiper('.long-reviews__slider', {
    speed: 1500,
    autoplay: true,
    loop: true,
});

var reviewsSlider = new Swiper('.reviews__slider', {
    speed: 1000,
    loop: true,
    spaceBetween: 20,
    pagination: {
        el: '#reviews-pagination',
        type: 'bullets',
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
    }
});

var teamSlider = new Swiper('.team__slider', {
    speed: 1000,
    loop: true,
    initialSlide: 2,
    navigation: {
        nextEl: '#long-next',
        prevEl: '#long-prev',
    },
    spaceBetween: 20,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        850: {
            slidesPerView: 3,
        },
        1060: {
            slidesPerView: 4,
            centeredSlides: false,
        },
        1260: {
            slidesPerView: 5,
            centeredSlides: true,
        }
    }
});

AOS.init({
    disable: 'mobile',
    offset: 200,
});