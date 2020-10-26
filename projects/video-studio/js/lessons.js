$('.lessons-item__body').hide();

$('.lessons-item').on('click', e => {
    const item = e.currentTarget;
    const itemBody = item.querySelector('.lessons-item__body');

    if(itemBody.style.display == 'none') {
        $('.lessons-item__body').slideUp("300");
        $(itemBody).slideDown("300");

        $('.lessons-item').removeClass('active');
        $(item).addClass('active');
    }else if(!e.target.closest('.lessons-item__body')) {
        $(itemBody).slideUp("300");
        $(item).removeClass('active');
    }
})