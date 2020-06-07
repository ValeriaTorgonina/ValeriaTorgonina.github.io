
function scrollHeader() {
  const header = $('.main-header')
  let scrollPrev = 0;
  $(window).scroll(() => {
    const scrolled = $(window).scrollTop();
    if ( scrolled > 100 && scrolled > scrollPrev ) {
      header.addClass('out');
    } else {
      header.removeClass('out');
    }
    scrollPrev = scrolled;
  })
};

function getMenu() {
  const menu = $('.main-nav__list');
  const burgerBtn = $('.main-nav__mobile-burger');
  burgerBtn.click(() => {
    menu.toggleClass('open');
    burgerBtn.toggleClass('cross');
  })
}

function getActiveLink() {
  const links = $('.main-nav__link');
  links.click(function () {
    links.removeClass('active');
    $(this).addClass('active');
    $('.main-nav__list').removeClass('open');
    $('.main-nav__mobile-burger').removeClass('cross');
    $('.main-header').addClass('out');
  })
}

function togglePopup() {
  const popup = $('.popup');
  const overlay = $('.overlay');
  $('.work__item').click(() => {
    popup.addClass('open');
    overlay.addClass('open');
  })
  $('.overlay').click(() => {
    popup.removeClass('open');
    overlay.removeClass('open');
  })
}

function getMoreWorks() {
  const workBtn = $('.work__button');
  const workInner = $('.work__inner');

  workBtn.click(() => {
    workInner.toggleClass('all-works');
    if(workInner.hasClass('all-works')) {
      workBtn.text('it is all work');
    }
    else{
      workBtn.text('load more work');
    }
  })
}

function playVideo() {
  const video = $('#process__video');
  const playBtn = $('.process__play-button');
  playBtn.click(() => {
    video.attr('controls', true);
    $(video).get(0).play();
    playBtn.hide();
  })

  video.on('pause', () => {
    playBtn.show();
    video.attr('controls', false);
  })
}

$(document).ready(() => {
  $('.owl-carousel').owlCarousel({
    loop: true,
    smartSpeed: 500,
    items: 1,
    nav: false,
    dots: true,
  });

  scrollHeader();
  getMenu();
  getActiveLink();
  togglePopup();
  getMoreWorks();
  playVideo();
});


