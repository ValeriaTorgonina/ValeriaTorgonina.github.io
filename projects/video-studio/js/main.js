$(document).ready(function() {
    toggleMenu();
    togglePopup();
    playVideo();
    closeBanner();
})

function closeBanner() {
    $('.banner__btn').on('click', function(e) {
        e.preventDefault();
        $('.banner').hide();
    })
}

function toggleMenu() {
    const menu = $('.main-nav');
    const burgerBtn = $('.mobile-burger');
    burgerBtn.on('click', () => {
        menu.toggleClass('open');
    })
}

function playVideo() {
    $('.play-btn').on('click', function(e) {
        const playBtn = $(this);
        const videoInner = playBtn.parent();
        videoInner.addClass('play')
        const poster = videoInner[0].querySelector('img');
        const video = videoInner[0].querySelector('iframe');
        let src = $(video).attr('src');
        $(video).show();
        $(poster).hide();
        playBtn.hide();
        $(video).attr('src', src + '?autoplay=1');
    })
}

function togglePopup() {
    const video = $("#video").attr("src");

    $('.reviews__video-link').on('click', function(e) {
        e.preventDefault();
        $('#video-popup').show();
        $("#video").attr("src", video);
    })
    $(".not-found").on('click', function(e) {
        e.preventDefault();
        $('#not-found-popup').show();
    })
    
    $('.overlay').on('click', function(e) {
        $('.popup-wrapper').hide();
        $("#video").attr("src","");
    })
    $('.close-btn').on('click', function(e) {
        $('.popup-wrapper').hide();
        $("#video").attr("src","");
    })
}

AOS.init({
    disable: 'mobile',
    offset: 200,
});
 
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

// if ('objectFit' in document.documentElement.style === false) {
// 	document.addEventListener('DOMContentLoaded', function () {
// 		Array.prototype.forEach.call(document.querySelectorAll('img[data-object-fit]'), function (image) {
// 			(image.runtimeStyle || image.style).background = 'url("' + image.src + '") no-repeat 50%/' + (image.currentStyle ? image.currentStyle['object-fit'] : image.getAttribute('data-object-fit'));

// 			image.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'' + image.width + '\' height=\'' + image.height + '\'%3E%3C/svg%3E';
// 		});
// 	});
// }


// document.addEventListener("DOMContentLoaded", function() {
//     window.scrollTo(0,0);
// });