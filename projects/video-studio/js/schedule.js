// datapicker

////day

function getDay() {
    $('.date-filter input').on('input', e => {
        $('.date-filter__decor')[0].textContent = e.target.value;
    })
    
    $(function () {
        $('#datetimepicker4').datetimepicker({
            format: "dd, DD MMM YYYY",
            locale: 'ru',
        });
    });
}

////week

function getWeek() {
    $('.date-filter input').on('input', e => {
        const value = e.target.value;
        const firstDay = moment(value).startOf('isoweek').format('DD');
        const lastDay = moment(value).endOf('isoweek').locale('ru').format('DD MMM YYYY');
        $('.date-filter__decor')[0].textContent = `${firstDay}-${lastDay}`;
    })

    $(function () {
        $('#datetimepicker4').datetimepicker({
            format: "MM-DD-YYYY",
            locale: 'ru',
        });
    });
}

////month

function getMonth() {
    $('.date-filter input').on('input', e => {
        $('.date-filter__decor')[0].textContent = e.target.value;
    })
    
    $(function () {
        $('#datetimepicker4').datetimepicker({
            format: "MMMM YYYY",
            locale: 'ru',
        });
    });
}

////destroy 
// function destroyDate() {
//     $('#datetimepicker4').datetimepicker("destroy");
// }

getWeek();

// переключать item в list
$('.schedule-list__item').on('click', e => {
    const item = $(e.currentTarget);
    const isToggleBtn = e.target.closest('.schedule-list__item-toggle');
    if(!item.hasClass('active')) {
        $('.schedule-list__item').removeClass('active');
        item.addClass('active');
    }else if(isToggleBtn) {
        item.removeClass('active');
    }
})

$(document).on('click', 'body', e => {
    const islistItem = e.target.closest('.schedule-list__item');
    const isWeekEventItem = e.target.closest('.schedule-calendar .event');
    const isMonthEventItem = e.target.closest('.schedule-month__cell-item');
    if(!islistItem) {
        $('.schedule-list__item').removeClass('active');
    }
    if(!isWeekEventItem && !isMonthEventItem) {
        $('.schedule-popup').hide();
    }
})

//переключать таблицы
 
$('.schedule-calendar__tabs').on('click', e => {
    const btn = e.target.closest('.schedule-calendar__tabs-btn');
    if(btn) {
        const elemName = btn.getAttribute('data-elem');
        // if(elemName == 'month') {
        //     destroyDate();
        //     getMonth();
        // }
        // if(elemName == 'week') {
        //     destroyDate();
        //     getWeek();
        // }
        // if(elemName == 'day') {
        //     destroyDate();
        //     getDay();
        // }
        const elem = (`#${elemName}`);
        $('.schedule-calendar__inner > *').hide().removeClass('active');
        $(elem).show().addClass('active');
        $('.schedule-calendar__tabs-btn').removeClass('active');
        $(btn).addClass('active');
    }
})

// увеличивать таблицы
 
$('.schedule-calendar__open').on('click', () => {
    document.body.style.overflow = 'hidden';
    $('.schedule-calendar__inner .active').addClass('open');
    $('.schedule-calendar__inner > .close-btn').show();
})

$('.schedule-calendar__inner > .close-btn').on('click', () => {
    document.body.style.overflow = 'auto';
    $('.schedule-calendar__inner .open').removeClass('open');
    $('.schedule-calendar__inner > .close-btn').hide();
})

// попапы событий

const eventElems = [
    ...$('.schedule-calendar .event'),
    ...$('.schedule-month__cell-item')
];

eventElems.forEach(elem => {
    const popup = elem.querySelector('.schedule-popup');
    const closeBtn = $('.schedule-popup .close-btn');

    Popper.createPopper(elem, popup, {
        placement: 'bottom',
        modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 20],
              },
            },
        ],
    });

    $(popup).hide();

    closeBtn.on('click', () => {
        $(popup).hide();
    })

    $(elem).on('click', e => {
        $('.wrapper')[0].dispatchEvent(new Event('scroll'));
        const isCloseBtn = e.target.closest('.close-btn');
        if(!isCloseBtn) {
            $('.schedule-popup').hide();
            $(popup).show();
        }
    });
})
