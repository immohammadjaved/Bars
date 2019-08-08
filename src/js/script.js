
var endpoint;
var buttonGroup = document.querySelector('.btn-group');
var barGroup = document.querySelector('.bar-group');
var selectBox = document.querySelector('.select-box');
var bars = '';
var buttons = '';
var select = '';

fetch('http://pb-api.herokuapp.com/bars')
    .then(function (res) {
        return res.json()
    })
    .then(function (result) {
        endpoint = result;

        renderBars();
        renderButtons();
        renderOptions();

        /**
         * Declaring after button rendering
         */
        var btns = document.querySelectorAll('.btn');

        /**
         * Adding Event Listners to all Button Elements
         */
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', btnEvent);
        }
    });


/**
 * Function for rendering the Buttons
 * renderButtons()
 */
function renderButtons() {
    buttons = '';
    endpoint.buttons.forEach(function (button) {
        buttons += `<button type="button" class="btn" attr-value="${button}">${button}</button>`
    });
    buttonGroup.innerHTML = buttons;
}

/**
 * Function for rendering the options for Slect
 * renderOptions()
 */
function renderOptions() {
    select = '';
    endpoint.bars.forEach(function (bar, i) {
        select += `<option value="${i}">#Progress ${i + 1}</option>`;
    });
    selectBox.innerHTML = select;
}

/**
 * Function for rendering the Bars
 * renderBars()
 */
function renderBars() {
    bars = '';
    endpoint.bars.forEach(function (bar) {
        var barValue = (bar / endpoint.limit) * 100;
        if (bar > endpoint.limit) {
            bars += `<div class="progress">
                     <div class="progress-bar bg-danger" role="progressbar" style="width: ${barValue}%"
                        aria-valuenow="${barValue}" aria-valuemin="0" aria-valuemax="${endpoint.limit}"></div>
                        <span class="progress-indicator">${bar}%</span>
                     </div>`
        } else {
            bars += `<div class="progress">
                     <div class="progress-bar" role="progressbar" style="width: ${barValue}%"
                        aria-valuemin="0" aria-valuemax="${endpoint.limit}"></div>
                        <span class="progress-indicator">${bar}%</span>
                     </div>`
        }
    });
    barGroup.innerHTML = bars;
}

/**
 * Button Click Events
 */
function btnEvent() {
    console.log('btnevent')
    var selectedBar = selectBox.options[selectBox.selectedIndex].value;
    var value = this.getAttribute('attr-value').toString();
    var type = value.substring(0, 1);

    if (type == '-') {
        val = value.substring(1, value.length + 1);
        endpoint.bars[selectedBar] -= +val;

        if (endpoint.bars[selectedBar] < 0) {
            endpoint.bars[selectedBar] = 0;
        }
    } else {
        endpoint.bars[selectedBar] += +value;
    }
    renderBars();
}