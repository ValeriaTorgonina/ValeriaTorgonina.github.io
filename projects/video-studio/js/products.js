var sliderPopular = new Swiper('.popular__slider', {
    slidesPerView: "auto",
    navigation: {
        nextEl: '#popular-next',
        prevEl: '#popular-prev',
    },
});

var sliderChecked = new Swiper('.checked__slider', {
    slidesPerView: "auto",
    navigation: {
        nextEl: '#checked-next',
        prevEl: '#checked-prev',
    },
});

var sliderActual = new Swiper('.actual__slider', {
    slidesPerView: "auto",
    navigation: {
        nextEl: '#actual-next',
        prevEl: '#actual-prev',
    },
});

$(document).ready(function() {
    toggleProductMenu();
    toggleFilter();
    clearSearch();
    toggleImgslider();
})

function toggleImgslider() {
    const imgs = $('.product-details__img-row img');
    const bigImg = $('.product-details__big-img')
    imgs.on('click', function() {
        imgs.removeClass('active');
        $(this).addClass('active');
        const src = $(this).attr('src');
        bigImg.attr('src', src);
    })
}

function clearSearch() {
    $('.search .close-btn').on('click', (e) => {
        document.querySelector('.search input').value = "";
    })
}

function toggleProductMenu() {
    const productMenu = $('.products-nav');
    const burgerBtn = $('.products-header .mobile-burger');
    burgerBtn.on('click', () => {
        productMenu.toggleClass('open');
    })
}

function toggleFilter() {
    const filter = $('.products-filter');
    const openBtn = $('.filter-btn');
    openBtn.on('click', () => {
        filter.toggleClass('open');
    })
}

$('body').on('click', (e) => {
    let target = e.target;
    let currentTarget = e.currentTarget;
    let isFilter = false;
    let isOpenBtn = false;
    let isProductNav = false;
    let isOpenNavBtn = false;
    while(target !== currentTarget) {
        if(target.classList.contains('products-filter')) {
            isFilter = true;
        }
        if(target.classList.contains('filter-btn')) {
            isOpenBtn = true;
        }
        if(target.classList.contains('products-nav')) {
            isProductNav = true;
        }
        if(target.classList.contains('mobile-burger')) {
            isOpenNavBtn = true;
        }
        target = target.parentElement;
    }
    if(!isFilter && !isOpenBtn) {
        $('.products-filter').removeClass('open');
    }
    if(!isProductNav && !isOpenNavBtn) {
        $('.products-nav').removeClass('open');
    }
})