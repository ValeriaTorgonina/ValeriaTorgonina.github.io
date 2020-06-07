class Animation {
  static animate({start, duration, step, timeLine}) {      
    const currTime = Date.now() - start;
    if (currTime <= duration) {
      step(timeLine(currTime, duration));
      requestAnimationFrame(() => Animation.animate({start, duration, step, timeLine}));
    }
  }
  static easeInOutQuart(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
  }
}

class CircleProgressController {
  constructor(selector) {
    this.items = [...document.querySelectorAll(selector)].map(elem => new CircleProgressItem(elem));  
    this.isInited = false;
  }

  init() {
    if(!this.isInited) {
      this.items.forEach(el => el.render());
      this.isInited = true;
    }
  }

  reset() {
    this.items.forEach(el => el.reset());
    this.isInited = false;
  }
};

class CircleProgressItem {
  constructor(elem) {
    this.elem = elem;
    this.size = elem.getBoundingClientRect().width;
    this.percent = elem.getAttribute('data-cp-percentage');
    this.elem.innerHTML = this.generateInnerHTML(this.percent, this.size);

    this.canvas = new CircleProgressCanvas({
      elem: this.elem.querySelector('.percentage__canvas'),
      lineColor: this.elem.getAttribute('data-cp-color'),
      lineWidth: 15,
      radius: 140,
      size: this.size * 2
    }); 

    this.valueElem = this.elem.querySelector('.percentage__value');
    this.canvas.elem.style.width = this.canvas.elem.style.height = `${this.size}px`;
    this.from = 0;
    this.duration = 3000;
  }

  generateInnerHTML(percent, size) {
    return `
    <span class="percentage">
      <b class="percentage__value">${percent}</b><span class="percentage__symbol">%</span>
    </span>
    <canvas 
      class="percentage__canvas" 
      width="${size * 2}" 
      height="${size * 2}"
    >
    </canvas>`
  }

  render() {
    Animation.animate({
      start: Date.now(),
      duration: this.duration,
      step: (percent) => {
        this.valueElem.textContent = Math.round(percent);
        this.canvas.nextStep(percent);
      },
      timeLine: (currTime, duration) => Animation.easeInOutQuart(currTime, this.from, this.percent, duration)
    })
  }

  reset() {
    this.valueElem.textContent = 0;
    this.canvas.nextStep(0);
  }

  destroy() {}
};

class CircleProgressCanvas {
  
  /**
   * 
   * @param {{
   *  elem: HTMLCanvasElement, 
   *  size: number, 
   *  lineWidth: number, // 15
   *  radius: number // 140
   *  lineColor: string // elem.getAttribute('data-cp-color')
   * }} opts 
   */
  constructor(opts) {
    Object.assign(this, opts);
    this.ctx = this.elem.getContext('2d');
    this.centerY = this.centerX = this.size / 2;
    this.cStart = 1.5 * Math.PI;
  }

  nextStep(currPercent) {
    const circleEnd = this.cStart + (currPercent / 50) * Math.PI;
    this._clear();
    this._drawBaseCircle();
    this._drawArc(circleEnd, this.lineColor);
  }

  _clear() {
    this.ctx.clearRect(0, 0, this.size, this.size);
  }

  _drawBaseCircle() {
    this._drawArc(Math.PI * 4, "#e8eedf");
  }

  _drawArc(end, lineColor) {
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, this.radius, this.cStart, end, false);
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.strokeStyle = lineColor;
    this.ctx.stroke();
  }
};

class Works {
  constructor() {
    this.worksText = document.querySelector(".works__inner .text");
    this.worksLink = document.querySelector(".works__description-link");
    this.worksTags = document.querySelector(".works__tags");
    this.worksValues = [
      {
        id: "works-item-1",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur numquam reiciendis ipsam nisi veniam tempore.",
        link: "https://github.com/ValeriaTorgonina/Lian",
        tags: ["gulp", "бэм", "scss"],
      },
      {
        id: "works-item-2",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis explicabo harum perferendis soluta omnis, quo assumenda sunt pariatur.",
        link: "https://github.com/ValeriaTorgonina/piroll",
        tags: ["react", "jquery", "scss"],
      },
      {
        id: "works-item-3",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic nesciunt dolore fugiat? Repellendus repudiandae maxime nihil quasi voluptates? Voluptatem?",
        link: "https://github.com/ValeriaTorgonina/boostfolia",
        tags: ["gulp", "jquery"],
      },
      {
        id: "works-item-4",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur numquam reiciendis ipsam nisi veniam tempore.",
        link: "https://github.com/ValeriaTorgonina/theBand",
        tags: ["gulp", "photoshop", "scss"],
      },
      {
        id: "works-item-5",
        text: "Lorem dolor sit amet consectetur adipisicing elit. Corporis explicabo harum perferendis soluta omnis, quo assumenda sunt pariatur.",
        link: "https://github.com/ValeriaTorgonina/css-drawing",
        tags: ["gulp", "html5", "scss"],
      },
    ];
    this.worksSlider = new Swiper('.works__slider', {
      slidesPerView: 1,
      spaceBetween: 35,
      loop: true,
      speed: 500,
  
      pagination: {
        el: '#works-pagination',
        clickable: true,
        // dynamicBullets: true,
        // dynamicMainBullets: 5,
      },

      navigation: {
        nextEl: '#works-next',
        prevEl: '#works-prev',
      },
    })
    this.changeWorksText();
    this.addHandlerForWorksSlider();
  };

  addHandlerForWorksSlider() {
    this.worksSlider.on('transitionEnd', () => {
      this.changeWorksText();
    })
  }

  changeWorksText() {
    const active = document.querySelector('.works__slider .swiper-slide-active').getAttribute('id');
    const activeValue = this.worksValues.find(item => item.id === active);
    this.worksText.innerHTML = activeValue.text;
    this.worksLink.innerHTML = activeValue.link;
    this.worksLink.setAttribute('href', activeValue.link);
    this.addWorksTags(activeValue.tags);
  }

  addWorksTags(tags) {
    this.worksTags.innerHTML = '';
    tags.map(tag => {
      let tagsItem = document.createElement('span');
      tagsItem.className = "works__tags-item";
      tagsItem.innerHTML = tag;
      this.worksTags.append(tagsItem);
    })
  }
};

class Header {
  constructor() {
    this.header = document.querySelector('.main-header');
    this.headerMenu = document.querySelector('.main-nav__list');
    this.burgerBtn = document.querySelector('.main-nav__burger');
    this.toggleMenu();
  }

  hideHeader() {
    this.header.classList.add('out');
    this.headerMenu.classList.remove('open');
    this.burgerBtn.classList.remove('cross');
  }

  showHeader() {
    this.header.classList.remove('out');
  }

  toggleMenu() {
    this.burgerBtn.onclick = () => {
      this.headerMenu.classList.toggle('open');
      this.burgerBtn.classList.toggle('cross');
    }
  }
};

document.addEventListener("DOMContentLoaded", function() {
  new Works();

  const skillsSlider = new Swiper ('.skills__list', {
    slidesPerColumnFill: 'row',
    slidesPerView: 1,
    slidesPerColumn: 1,
    speed: 500,

    navigation: {
      nextEl: '#skills-next',
      prevEl: '#skills-prev',
    },

    breakpoints: {
      600: {
        slidesPerView: 2,
        slidesPerColumn: 2,
      },
      800: {
        slidesPerView: 3,
        slidesPerColumn: 2,
      },
    },
  });

  const testimonialsSlider = new Swiper ('.testimonials__slider', {
    spaceBetween: 150,
    speed: 1000,
    loop: true,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
  });
});
const header = new Header();
const skillsController = new CircleProgressController('.counter');
const skills = document.querySelector(".skills");
const skillsCordTop = skills.offsetTop;
let scrollPrev = 0;

document.addEventListener("scroll", function() {
  if(skillsCordTop <= pageYOffset) {
    skillsController.init();
  }

  if (window.scrollY > scrollPrev ) {
    header.hideHeader();
  } else {
    header.showHeader();
  }
  scrollPrev = window.scrollY;
});