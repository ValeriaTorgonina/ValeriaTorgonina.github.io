class Animation{static animate({start:e,duration:t,step:s,timeLine:i}){const r=Date.now()-e;r<=t&&(s(i(r,t)),requestAnimationFrame(()=>Animation.animate({start:e,duration:t,step:s,timeLine:i})))}static easeInOutQuart(e,t,s,i){return(e/=i/2)<1?s/2*e*e*e*e+t:-s/2*((e-=2)*e*e*e-2)+t}}class CircleProgressController{constructor(e){this.items=[...document.querySelectorAll(e)].map(e=>new CircleProgressItem(e)),this.isInited=!1}init(){this.isInited||(this.items.forEach(e=>e.render()),this.isInited=!0)}reset(){this.items.forEach(e=>e.reset()),this.isInited=!1}}class CircleProgressItem{constructor(e){this.elem=e,this.size=e.getBoundingClientRect().width,this.percent=e.getAttribute("data-cp-percentage"),this.elem.innerHTML=this.generateInnerHTML(this.percent,this.size),this.canvas=new CircleProgressCanvas({elem:this.elem.querySelector(".percentage__canvas"),lineColor:this.elem.getAttribute("data-cp-color"),lineWidth:15,radius:140,size:2*this.size}),this.valueElem=this.elem.querySelector(".percentage__value"),this.canvas.elem.style.width=this.canvas.elem.style.height=`${this.size}px`,this.from=0,this.duration=3e3}generateInnerHTML(e,t){return`\n    <span class="percentage">\n      <b class="percentage__value">${e}</b><span class="percentage__symbol">%</span>\n    </span>\n    <canvas \n      class="percentage__canvas" \n      width="${2*t}" \n      height="${2*t}"\n    >\n    </canvas>`}render(){Animation.animate({start:Date.now(),duration:this.duration,step:e=>{this.valueElem.textContent=Math.round(e),this.canvas.nextStep(e)},timeLine:(e,t)=>Animation.easeInOutQuart(e,this.from,this.percent,t)})}reset(){this.valueElem.textContent=0,this.canvas.nextStep(0)}destroy(){}}class CircleProgressCanvas{constructor(e){Object.assign(this,e),this.ctx=this.elem.getContext("2d"),this.centerY=this.centerX=this.size/2,this.cStart=1.5*Math.PI}nextStep(e){const t=this.cStart+e/50*Math.PI;this._clear(),this._drawBaseCircle(),this._drawArc(t,this.lineColor)}_clear(){this.ctx.clearRect(0,0,this.size,this.size)}_drawBaseCircle(){this._drawArc(4*Math.PI,"#e8eedf")}_drawArc(e,t){this.ctx.beginPath(),this.ctx.arc(this.centerX,this.centerY,this.radius,this.cStart,e,!1),this.ctx.lineWidth=this.lineWidth,this.ctx.strokeStyle=t,this.ctx.stroke()}}class Works{constructor(){this.worksText=document.querySelector(".works__inner .text"),this.worksLink=document.querySelector(".works__description-link"),this.worksTags=document.querySelector(".works__tags"),this.worksValues=[{id:"works-item-1",text:"Это один из проектов, в доработке которых я участвовала на прошлой работе. Мои обязанности простирались от правки отступов и кнопочек до доработки js и написания адаптивных версий",link:"Нет",tags:["html5","css3","jquery"]},{id:"works-item-2",text:"Это один из проектов, в доработке которых я участвовала на прошлой работе. Мои обязанности простирались от правки отступов и кнопочек до доработки js и написания адаптивных версий",link:"Нет",tags:["html5","css3","jquery"]},{id:"works-item-3",text:"Это один из проектов, в доработке которых я участвовала на прошлой работе. Мои обязанности простирались от правки отступов и кнопочек до доработки js и написания адаптивных версий",link:"Нет",tags:["html5","css3","jquery"]},{id:"works-item-4",text:"При верстке theBand мне захотелось попробовать отказаться от jquery. Спойлер: у меня получилось (и я нашла действительно классную библиотеку для слайдеров - Swiper). Также я увлеклась плеером, который должен был находиться на странице, и позаботилась о том, чтобы он 'издавал звуки'.",link:"https://github.com/ValeriaTorgonina/theBand",tags:["native js","swiper"]},{id:"works-item-5",text:"На boostfolia я оттачивала навыки. Помимо этого я познакомилась с паралакс-эффектом и опробовала его на первом экране.",link:"https://github.com/ValeriaTorgonina/boostfolia",tags:["parallax effect"]},{id:"works-item-6",text:"Piroll стал первым проектом, на котором я начала изучать тонкости оптимизации, научилась собирать спрайты и полезла в gulp для его доработки (изначально я брала готовый сборщик). Также здесь я начала писать js для обработки кликов, всплывающих окон и т.д.",link:"https://github.com/ValeriaTorgonina/piroll",tags:["gulp","jquery","lazyload"]},{id:"works-item-7",text:"Мой первый многостраничный проект. Когда я делала Lian, еще практически ничего не знала о многих нюансах в верстке и надеялась отточить на этом проекте методологию БЭМ. Lian в этом списке потому, что относительно него отлично видно мой прогресс в качестве верстальщика.",link:"https://github.com/ValeriaTorgonina/Lian",tags:["html5","бэм","scss"]},{id:"works-item-8",text:"Бонус. Это просто страница с моими рисунками на css. Каждая содержит маленькую анимацию.",link:"https://github.com/ValeriaTorgonina/css-drawing",tags:["scss","animation"]}],this.worksSlider=new Swiper(".works__slider",{slidesPerView:1,spaceBetween:35,loop:!0,speed:500,pagination:{el:"#works-pagination",clickable:!0},navigation:{nextEl:"#works-next",prevEl:"#works-prev"}}),this.changeWorksText(),this.addHandlerForWorksSlider()}addHandlerForWorksSlider(){this.worksSlider.on("transitionEnd",()=>{this.changeWorksText()})}changeWorksText(){const e=document.querySelector(".works__slider .swiper-slide-active").getAttribute("id"),t=this.worksValues.find(t=>t.id===e);this.worksText.innerHTML=t.text,this.changeWorksLinks(t.link),this.addWorksTags(t.tags)}changeWorksLinks(e){this.worksLink.innerHTML=e,e.length<=3?(this.worksLink.setAttribute("href","#"),this.worksLink.style="pointer-events: none;"):(this.worksLink.setAttribute("href",e),this.worksLink.style="pointer-events: auto;")}addWorksTags(e){this.worksTags.innerHTML="",e.map(e=>{let t=document.createElement("span");t.className="works__tags-item",t.innerHTML=e,this.worksTags.append(t)})}}class Header{constructor(){this.header=document.querySelector(".main-header"),this.headerMenu=document.querySelector(".main-nav__list"),this.burgerBtn=document.querySelector(".main-nav__burger"),this.toggleMenu()}hideHeader(){this.header.classList.add("out"),this.headerMenu.classList.remove("open"),this.burgerBtn.classList.remove("cross")}showHeader(){this.header.classList.remove("out")}toggleMenu(){this.burgerBtn.onclick=(()=>{this.headerMenu.classList.toggle("open"),this.burgerBtn.classList.toggle("cross")})}}document.addEventListener("DOMContentLoaded",function(){new Works,AOS.init({duration:800,disable:"mobile"});new Rellax(".rellax"),new Swiper(".skills__list",{slidesPerColumnFill:"row",slidesPerView:1,slidesPerColumn:1,speed:500,navigation:{nextEl:"#skills-next",prevEl:"#skills-prev"},breakpoints:{600:{slidesPerView:2,slidesPerColumn:2},800:{slidesPerView:3,slidesPerColumn:2}}}),new Swiper(".testimonials__slider",{spaceBetween:150,speed:1e3,loop:!0,autoplay:{delay:3e3,disableOnInteraction:!1}})});const header=new Header,skillsController=new CircleProgressController(".counter"),skills=document.querySelector(".skills"),skillsCordTop=skills.offsetTop,halfOfWindow=document.documentElement.clientHeight/2;let scrollPrev=0;document.addEventListener("scroll",function(){skillsCordTop<=pageYOffset+halfOfWindow&&skillsController.init(),window.scrollY>window.innerHeight&&window.scrollY>scrollPrev?header.hideHeader():header.showHeader(),scrollPrev=window.scrollY});