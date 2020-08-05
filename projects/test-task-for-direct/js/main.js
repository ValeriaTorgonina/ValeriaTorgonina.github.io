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