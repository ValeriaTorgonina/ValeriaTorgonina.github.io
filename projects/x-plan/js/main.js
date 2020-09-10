var page = new Vue({
    el: '#page',
    data: function() {
        return {
            showBlog: false,
            showSuccess: false,
            formType: 'mail',
        }
    },
    methods: {
        footerBtnClick: function(value) {
            this.formType = value;
            this.changeFooterBtns(value);
        },
        changeFooterBtns: function(value) {
            if(value === 'socials' || value === 'sms') {
                this.openPopup('blog');
            }
        },
        openPopup: function(value) {
            if(value === 'blog') {
                this.showBlog = true;
            }
            if(value === 'success') {
                event.preventDefault();
                this.showSuccess = true;
            }
        },
        closePopup: function() {
            this.showBlog = false;
            this.showSuccess = false;
        }
    },
})

document.addEventListener("DOMContentLoaded", function() {
    window.scrollTo(0,0);
});

function animateMarquee(el, duration) {
    const innerEl = el.querySelector('.marquee__inner');
    const innerWidth = innerEl.offsetWidth;
    const cloneEl = innerEl.cloneNode(true);
    el.appendChild(cloneEl);
    
    let start = performance.now();
    let progress;
    let translateX;
  
    requestAnimationFrame(function step(now) {
      progress = (now - start) / duration;
   
      if (progress > 1) {
          progress %= 1;
        start = now;
      }
  
      translateX = innerWidth * progress;
      
      innerEl.style.transform = `translate3d(-${translateX}px, 0 , 0)`;
      cloneEl.style.transform = `translate3d(-${translateX}px, 0 , 0)`;
      requestAnimationFrame(step);
    });
  }
  
  const marquee = document.querySelector('#marquee');
  

  animateMarquee(marquee, 18000);