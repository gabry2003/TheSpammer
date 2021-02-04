$(function() {
    // init feather icons
    feather.replace();
});

$('#vai-a-download').click(function(e) {
    e.preventDefault();

    $([document.documentElement, document.body]).animate({
        scrollTop: $("#download").offset().top
    }, 2000);
});

const swiper = new Swiper('.swiper-container', {
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
});
