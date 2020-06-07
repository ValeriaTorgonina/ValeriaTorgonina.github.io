document.addEventListener("DOMContentLoaded", function() {
  class Player {
    constructor() {
      this.playBtn = document.querySelector(".audio-player__play");
      this.range = document.querySelector('.audio-player__range');
      this.rangeDecor = document.querySelector('.audio-player__range-decor');
      this.playlist = document.querySelector(".player__playlist");
      this.trackTitle = document.querySelector('.player__titles .player__track');
      this.nextBtn = document.querySelector('.audio-player__next');
      this.prevBtn = document.querySelector('.audio-player__prev');
      this.tracks = this.getAllTracks();
      this.renderPlaylist();
      this.audio = new Audio(`../assets/audio/come-along.mp3`);
      this.activeTrack = this.getActiveTrack();
      this.playlistItems = document.querySelectorAll(".player__playlist-item");
      this.playlistBtns = document.querySelectorAll(".player__play-btn");
      this.addHandlerForPlayButton();
      this.addHandlerForPlaylist();
      this.addHandlerForAudioRange();
      this.addHandlerForNextButton();
      this.addHandlerForPrevButton();
      this.changeActivePlaylistItem(this.activeTrack.name);
    }

    buildListItemHTML(dataName, trackText, trackTime, i, isActive) {
      return (
      `<li class="player__playlist-item" data-name="${dataName}">
        <button class="player__play-btn ${isActive ? 'active' : ''}"></button>
        <span class="player__track">${this.padZero(i)}. ${trackText}</span>
        <span class="player__track-time">${trackTime}</span>
      </li>`
      )
    }

    padZero(num) {
      return num < 10 ? `0${num}` : num;
    }

    getAllTracks() {
      return [
        {
          "name": "come-along",
          "text": "come along",
          "active": true
        },
        {
          "name": "put-it-on-me",
          "text": "Put it on me"
        },
        {
          "name": "cold-cold-cold",
          "text": "cold cold cold"
        },
        {
          "name": "darkside",
          "text": "darkside"
        },
        {
          "name": "out-of-black",
          "text": "out of black"
        },
        {
          "name": "overdose",
          "text": "overdose"
        },
        {
          "name": "feeling-good",
          "text": "feeling good"
        },
        {
          "name": "everything-black",
          "text": "everything black"
        },
        {
          "name": "blood-water",
          "text": "blood // water"
        }
      ];
    }

    renderPlaylist() {
      this.playlist.innerHTML = this.tracks.map((item, i) => {
        return this.buildListItemHTML(
          item.name, 
          item.text, 
          `${Math.floor(Math.random() * 3 + 2)}:${this.padZero(Math.floor(Math.random() * 60))}`,
          i+1,
          item.active,
        )
      }).join('');
    }

    getActiveTrack() {
      return this.tracks.find(item => item.active);
    }

    addHandlerForNextButton() {
      this.nextBtn.onclick = () => {
        const activeTrackIndex = this.tracks.findIndex(item => {
          return item.name == this.activeTrack.name;
        })
        if(activeTrackIndex + 1 === this.tracks.length) {
          this.changeActivePlaylistItem(this.tracks[0].name);
        }else{
          this.changeActivePlaylistItem(this.tracks[activeTrackIndex + 1].name);
        }
      }
    }

    addHandlerForPrevButton() {
      this.prevBtn.onclick = () => {
        const activeTrackIndex = this.tracks.findIndex(item => {
          return item.name == this.activeTrack.name;
        })
        if(activeTrackIndex === 0) {
          this.changeActivePlaylistItem(this.tracks[this.tracks.length - 1].name);
        }else{
          this.changeActivePlaylistItem(this.tracks[activeTrackIndex - 1].name);
        }
      }
    }

    addHandlerForPlaylist() {
      this.playlist.onclick = e => {
        // change active button
        const trackItem = e.target.closest('.player__playlist-item');
        // add track to player
        const name = trackItem.dataset.name;
        this.changeActivePlaylistItem(name)
      }
    };

    addHandlerForAudioRange() {
      this.range.onchange = () => {
        this.audio.currentTime = this.range.value;
      };
    
      this.audio.addEventListener('timeupdate', () => {
        let curtime = parseInt(this.audio.currentTime, 10);
        if(curtime + 1 > this.audio.duration) {
          this.rangeDecor.slyle.width = '100%';
        }else {
          this.rangeDecor.style.width = `${curtime / this.audio.duration * 100 + 0.5}%`;
        }
        this.range.value = this.audio.currentTime;
      });
    }

    addHandlerForPlayButton() {
      this.playBtn.onclick = () => {
        const pauseBtn = document.querySelector(".pause");
        if(!pauseBtn) {
          this.audio.play();
          this.range.setAttribute('max', this.audio.duration);
          this.playBtn.classList.add('pause');
        }else {
          this.audio.pause();
          this.playBtn.classList.remove('pause');
        }
      }
    };

    changeActivePlaylistItem(name) {
      this.tracks = this.tracks.map(item => {
        return {
          ...item, 
          active: item.name === name,
        }
      });
      this.activeTrack = this.getActiveTrack();
      this.changeActivePlaylistBtn();
      this.reloadAudio();
      this.changeTrack();
    }

    changeActivePlaylistBtn() {
      this.playlistBtns.forEach(item => item.classList.remove('active'));
      const activePlaylistItem = [...this.playlistItems].find(item => item.dataset.name === this.activeTrack.name);
      activePlaylistItem.querySelector('.player__play-btn').classList.add('active');
    }

    changeTrack() {
      this.audio.pause();
      this.trackTitle.textContent = this.activeTrack.text;
      this.audio.setAttribute('src', `../assets/audio/${this.activeTrack.name}.mp3`);
    }

    reloadAudio() {
      this.playBtn.classList.remove('pause');
      this.rangeDecor.style.width = '0%';
      this.audio.load();
    }
  }

  new Player();


  const rellax = new Rellax('.rellax');

  const aboutSwiper = new Swiper ('.about__swiper', {
    loop: true,
    speed: 1500,
    parallax: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  })

  let aboutListItems = document.querySelectorAll(".about__item");  
  const aboutListItemsArr = [...aboutListItems];

  aboutSwiper.on('slideChange', function() {
    setTimeout(()=>{
      aboutListItems.forEach(item => item.classList.remove("active"));
      let activeSlide = document.querySelector(".swiper-slide-active"); 
      const activeIndex = activeSlide.getAttribute('data-swiper-slide-index');
      aboutListItemsArr[activeIndex].classList.add("active");
    }, 100)
  }) 

  const dotsSwiper = new Swiper ('.dots-slider', {
    loop: false,
    speed: 500,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      0: {
        slidesPerView: 3,
        spaceBetween: 40,
        initialSlide: 5,
      },
      500: {
        slidesPerView: 5,
        spaceBetween: 40,
        initialSlide: 3,
      },
      770: {
        slidesPerView: 7,
        spaceBetween: 32,
        initialSlide: 3,
      },
      1100: {
        slidesPerView: 7,
        spaceBetween: 10,
        initialSlide: 1,
      },
      1600: {
        slidesPerView: 10,
        spaceBetween: 10,
        initialSlide: 1,
      }
    }
  })
});




