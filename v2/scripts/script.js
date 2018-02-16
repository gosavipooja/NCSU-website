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

function readFile(startPos, stopPos, fileName) {        
    if (!fileName) {
        fileName = 'resources/note.txt';
    }

    var file = fileName;
    var start = parseInt(startPos) || 0;
    var stop = parseInt(stopPos) || file.size - 1;

    var reader = new FileReader();
    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function(evt) {
        if (evt.target.readyState == FileReader.DONE) { // DONE == 2
        document.getElementById('byte_content').textContent = evt.target.result;
        document.getElementById('byte_range').textContent = 
            ['Read bytes: ', start + 1, ' - ', stop + 1,
                ' of ', file.size, ' byte file'].join('');
        }
    };

    var blob = file.slice(start, stop + 1);
    reader.readAsBinaryString(blob);
}