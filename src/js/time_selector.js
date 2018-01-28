$(function () {

    var sectorSize = ($('.timeslots').width()*6.666/100);
    $('.sector').css('width', sectorSize);
    var step = sectorSize/4;
    var prevX = 0;

    $(window).resize(function () {
        sectorSize = ($('.timeslots').width()*6.666/100);
        $('.sector').css('width', sectorSize);
        step = sectorSize/4;
    });

    $('.timeslot_free').on("mousemove", function (e) {
        var x = e.pageX - $(this).offset().left - sectorSize/2;
        var sector = $(this).children(".sector");
        var w = sectorSize;

        if (x < 0){
            sector.css('left', 0);
        }

        if (x + w*1.25 > $(this).width()){
            sector.css('right', 0);
            sector.css('left', 'auto');
        }

        if (x > 0 && x+w < $(this).width() && Math.abs(x - prevX) > step) {
            var tmp = (x/step).toFixed(0);

            sector.css('left', tmp*step);
            prevX = x;
        }
    }).on("mouseleave", function () {
        prevX = 0;
    }).on("mouseenter", function () {
        if ($(this).width() < sectorSize){
            $(this).children('.sector').css('width', '100%');
        }
    })

});