function togglePopup() {
    var cards = document.body.querySelectorAll('.product-card');
    Array.prototype.forEach.call(cards, function(card) {
        var openBtn = card.querySelector('.product-card__info-btn');
        var closeBtn = card.querySelector('.cross-btn');
        var popup = card.querySelector('.product-card__popup');
        openBtn.addEventListener('click', function() {
            popup.classList.add('open');
        })
        closeBtn.addEventListener('click', function() {
            popup.classList.remove('open');
        })
    });
}

togglePopup();

function cardSliderInit() {
    if(!cardSlider) {
        cardSlider = new Swiper('.main__cards-wrapper', {
            slidesPerView: 1,
            spaceBetween: 100,
            centeredSlides: true,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true,
            },
        });
    }
}

function cardSliderDestroy () {
    if(cardSlider) {
        cardSlider.destroy();
        cardSlider = null;
    }
}

var cardSlider = null;
var mediaQuerySize = 768;

window.addEventListener('resize', function() {
    var windowWidth = window.innerWidth;
    
    if (windowWidth <= mediaQuerySize) {
        cardSliderInit();
    } else {
        cardSliderDestroy();
    }
});

document.addEventListener("DOMContentLoaded", function() {
    var windowWidth = window.innerWidth;
    if (windowWidth <= mediaQuerySize) {
        cardSliderInit();
    } else {
        cardSliderDestroy();
    }

    var scene = document.getElementById('scene');
    var parallaxInstance = new Parallax(scene);
})

var header = document.querySelector('.main-header');
var scrollPrev = 0;
      
function hideHeader() {
    header.classList.add('out');
}
      
function showHeader() {
    header.classList.remove('out');
}
    
document.addEventListener("scroll", function() {

    if (pageYOffset > scrollPrev) {
        hideHeader();
    } else {
        showHeader();
    }
    scrollPrev = window.pageYOffset;
});