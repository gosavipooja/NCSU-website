$(document).ready(function() {
    $('.expand1').click(function() {
        $('.gobtn1').attr('src', ($('.gobtn1').attr('src') == 'images/go.png' ? 'images/go-clicked.png' : 'images/go.png'));
        $('.content1').slideToggle('fast');
    });
    $('.expand2').click(function() {
        $('.gobtn2').attr('src', ($('.gobtn2').attr('src') == 'images/go.png' ? 'images/go-clicked.png' : 'images/go.png'));
        $('.content2').slideToggle('fast');
    });
    $('.expand3').click(function() {
        $('.gobtn3').attr('src', ($('.gobtn3').attr('src') == 'images/go.png' ? 'images/go-clicked.png' : 'images/go.png'));
        $('.content3').slideToggle('fast');
    });
    $('.expand4').click(function() {
        $('.gobtn4').attr('src', ($('.gobtn4').attr('src') == 'images/go.png' ? 'images/go-clicked.png' : 'images/go.png'));
        $('.content4').slideToggle('fast');
    });
});