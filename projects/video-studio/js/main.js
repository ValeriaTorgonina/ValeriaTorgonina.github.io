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
    const burgerBtn = $('.main-header .mobile-burger');
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
    $('.popup-wrapper .close-btn').on('click', function(e) {
        $('.popup-wrapper').hide();
        $("#video").attr("src","");
    })
}


// document.addEventListener("DOMContentLoaded", function() {
//     window.scrollTo(0,0);
// });