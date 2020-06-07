
(function toggleMenu() {
  const menu = $('.main-nav');
  const burgerBtn = $('.list-btn');
  burgerBtn.click(() => {
    menu.toggleClass('active-main-nav');
  })
})();

(function initializeMasonry() {
  if($(".album__content").length > 0) {
    var msnry = new Masonry(".album__content", {
      gutter: 30
    });    
  };
  if($(".blog-card-wrapper").length > 0) {
    var msnry = new Masonry(".blog-card-wrapper", {
      gutter: 30
    });    
  };
})();
