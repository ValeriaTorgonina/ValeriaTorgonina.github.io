
function scrollHeader() {
  const header = $('.main-header')
  let scrollPrev = 0;
  $(window).scroll(() => {
    const scrolled = $(window).scrollTop();
    if ( scrolled > $(window).height() && scrolled > scrollPrev ) {
      header.addClass('out');
    } else {
      header.removeClass('out');
    }
    scrollPrev = scrolled;
  })
};

function toggleMenu() {
  const menu = $('.main-nav__list');
  const burgerBtn = $('.main-nav__burger');
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
    $('.main-nav__burger').removeClass('cross');
    $('.main-header').addClass('out');
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
}

function filter() {
  const buttons = $('.works__filter-button');
  const images = $('.works__item').toArray()
  buttons.click(function () {
    buttons.removeClass('active');
    $(this).addClass('active');
    const btnName = $(this).attr('name');

    images.forEach(item => {
      $(item).show();
      if($(item).attr('title') !== btnName) {  
        $(item).hide();
      }      
      if(btnName === "all") {
        $(item).show();
      }
    })
  })
}

function sliderChange() {
  const skillsValues = [
    {
      id: "person-slide-1",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur numquam reiciendis ipsam nisi veniam tempore.",
      photo: "88%",
      sketch: "92%",
      illustrator: "90%",
      afterEffects: "98%"
    },
    {
      id: "person-slide-2",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis explicabo harum perferendis soluta omnis, quo assumenda sunt pariatur.",
      photo: "55%",
      sketch: "34%",
      illustrator: "70%",
      afterEffects: "89%"
    },
    {
      id: "person-slide-3",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic nesciunt dolore fugiat? Repellendus repudiandae maxime nihil quasi voluptates? Voluptatem?",
      photo: "91%",
      sketch: "78%",
      illustrator: "43%",
      afterEffects: "82%"
    }
  ];
  const skillsText = $(".team__skills .text");
  const skillsDecor = $(".team__skills-decor");
  const skillsPercent = $(".team__skills-percent");
  const slider = $(".team__person-slider");
  slider.on('changed.owl.carousel', () => {
    setTimeout(() => {
      const active = $(".owl-item.active > .team__person-slide").attr("id");
      const activeValue = skillsValues.find(item => item.id === active);
      changeSkills(skillsDecor[0], skillsPercent[0], activeValue.photo);
      changeSkills(skillsDecor[1], skillsPercent[1], activeValue.sketch);
      changeSkills(skillsDecor[2], skillsPercent[2], activeValue.illustrator);
      changeSkills(skillsDecor[3], skillsPercent[3], activeValue.afterEffects);
      skillsText[0].innerHTML = activeValue.text;
    }, 1)
  })
}

function changeSkills(item1, item2, value) {
  item1.style.background = `linear-gradient(to right, #e84c3d ${value}, white ${value})`;
  item2.innerHTML = value;
};

function togglePopup() {
  const popup = $('.popup');
  const overlay = $('.overlay');
  $('.article__look').click(() => {
    console.log('b')
    popup.addClass('open');
    overlay.addClass('open');
    $('body').css("overflow", "hidden");
  })
  overlay.click(() => {
    popup.removeClass('open');
    overlay.removeClass('open');
    $('body').css("overflow", "visible");
  })
}

function inputChange() {
  const wrapper = $(".input-wrapper");
  wrapper.focusout(function() {
    const input = $(".input", this);
    const text = $(".input-text", this);
    if(input.val() !== "") {
      text.addClass("top")
    }else {
      text.removeClass("top")
    }
  })
}

function toggleSliders() {
  if($(window).width() < 940) {
    $(".blog__inner").addClass("owl-carousel owl-theme");
    $(".plans__inner").addClass("owl-carousel owl-theme");

    $('.blog__inner').owlCarousel({
      loop: true,
      smartSpeed: 200,
      items: 1,
      lazyLoad: true,
      center: true,

      responsive: {
        0: {
          dots: true,
          nav: false,
        },
        410: {
          nav: true,
          dots: false,
          navText: ['<div class="prev"></div>', '<div class="next"></div>'],
        }
      }
    });

    $('.plans__inner').owlCarousel({
      loop: true,
      smartSpeed: 200,
      nav: false,
      lazyLoad: true,
      dots: true,
      responsive: {
        0: {
          items: 1
        },
        560: {
          items: 2
        },
        800: {
          items: 3
        },
      }
    });
  }

  if($(window).width() > 940) {
    $(".blog__inner").trigger('destroy.owl.carousel').removeClass('owl-carousel owl-theme');
    $(".plans__inner").trigger('destroy.owl.carousel').removeClass('owl-carousel owl-theme');
  }
}

$(document).ready(() => {
  var rellax = new Rellax('.rellax',{
    center: true
  });

  $('.tools__slider').owlCarousel({
    loop: true,
    smartSpeed: 200,
    margin: 20,
    lazyLoad: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
        dots: true,
      },
      650: {
        items: 2,
        nav: true,
        dots: false,
        navText: ['<div class="prev"></div>', '<div class="next"></div>'],
      },
      950: {
        items: 3,
        nav: true,
        dots: false,
        navText: ['<div class="prev"></div>', '<div class="next"></div>'],
      },
    }
  });

  $('.team__person-slider').owlCarousel({
    loop: true,
    smartSpeed: 500,
    items: 1,
    lazyLoad: true,

    responsive: {
      0: {
        dots: true,
        nav: false,
      },
      450: {
        navText: ['<div class="prev"></div>', '<div class="next"></div>'],
        dots: false,
        nav: true,
      },
      800: {
        dots: true,
        nav: false,
      },
    }
  });

  scrollHeader();
  toggleMenu();
  getActiveLink();
  playVideo();
  filter();
  sliderChange();
  togglePopup();
  inputChange();
  toggleSliders();
});

$(window).resize(() => {
  toggleSliders()
})