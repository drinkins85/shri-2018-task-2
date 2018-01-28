;(function(){

    document.addEventListener('DOMContentLoaded', function () {
        shiftTimePanel()
    });
    window.addEventListener('resize', function(){
        shiftTimePanel()
    });

    function shiftTimePanel() {
        var checkedElem = document.querySelector('.scroll-container');
        var timePanel = document.querySelector('.time-panel');
        var currentTime = document.querySelector('.current-time');

        if (typeof checkedElem !== 'undefined' && checkedElem !== null && typeof timePanel !== 'undefined' && timePanel !== null && typeof currentTime !== 'undefined' && currentTime !== null) {

            var scrollbarWidth = getScrollBarWidth(checkedElem);

            if (scrollbarWidth > 0) {
                if (getComputedStyle(timePanel).position === 'fixed') {
                    timePanel.style.paddingRight = scrollbarWidth + 'px';
                }
                if (getComputedStyle(currentTime).position === 'fixed') {
                    currentTime.style.paddingRight = scrollbarWidth + 'px';
                }
            } else {
                timePanel.style.paddingRight = 0;
                currentTime.style.paddingRight = 0;
            }

        }
    }
    function getScrollBarWidth(elem) {
        return elem.offsetWidth - elem.clientWidth
    }
}());