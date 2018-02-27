// slider

var nessSlider = document.getElementById('nessSliderBg'),
    sliders = nessSlider.getElementsByClassName('nessSlide'),
    sliderControlLeft = document.getElementById('nessSliderControlLeft'),
    sliderControlRight = document.getElementById('nessSliderControlRight'),
    activeSliderCount = 0,
    activeSliderStyle = sliders[0].getAttribute('data-style'),
    sliderInterval = 8400,
    sliderTimeout;

function switchSlider(d = null, r = null) {
    window.clearInterval(sliderTimeout)
    sliderControlLeft.removeEventListener('click', ctlLeft)
    sliderControlRight.removeEventListener('click', ctlRight)

    var newSliderCount;

    if (d) {
        if (activeSliderCount + d >= sliders.length) {
            newSliderCount = 0;
        } else if (activeSliderCount + d < 0) {
            newSliderCount = sliders.length - 1;
        } else {
            newSliderCount = activeSliderCount + d;
        }
    } else {
        if (activeSliderCount + 1 >= sliders.length) {
            newSliderCount = 0;
        } else {
            newSliderCount = activeSliderCount + 1;
        }
    }

    var newSliderStyle = sliders[newSliderCount].getAttribute('data-style');
    activeSliderStyle = sliders[activeSliderCount].getAttribute('data-style');
    nessSlider.classList.add('to-' + newSliderStyle)
    nessSlider.classList.add('fadeBefore')

    sliders[activeSliderCount].classList.add('out')

    window.setTimeout(function() {
        sliders[activeSliderCount].classList.remove('on')
        sliders[activeSliderCount].classList.remove('out')
        sliders[newSliderCount].classList.add('on')

        nessSlider.classList.remove(activeSliderStyle)
        nessSlider.classList.add(newSliderStyle)
        nessSlider.classList.remove('fadeBefore')

        activeSliderCount = newSliderCount;

        window.setTimeout(function() {
            nessSlider.classList.remove('to-' + newSliderStyle)

            sliderTimeout = window.setInterval(switchSlider, sliderInterval);
            sliderControlLeft.addEventListener('click', ctlLeft)
            sliderControlRight.addEventListener('click', ctlRight)
        }, 720)
    }, 720)
}

function ctlLeft() { 
    switchSlider(-1, true) 
}
function ctlRight() { 
    switchSlider(1, true) 
}

// init
window.setTimeout(function() {
//    sliders[0].classList.remove('out')

    sliderControlLeft.addEventListener('click', ctlLeft)
    sliderControlRight.addEventListener('click', ctlRight)

    sliderTimeout = window.setInterval(switchSlider, sliderInterval);
}, 240)