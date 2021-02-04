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