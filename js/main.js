// Start of exercise

// Intilization of variables

let _header = document.querySelector('.info-container__header');
let themeChosen = document.createElement('span');
themeChosen.innerHTML = ' Food and drinks.';
_header.appendChild(themeChosen);
const colorPalette = document.getElementById('color-palette');

//Chosen colours = #fa0050 - #fecd36 - #e4b382 - #089e94;

let chosenColours = [
    // new Colours('Red Crayola', '#fa0050'),
    // new Colours('Sunglow', '#fecd36'),
    // new Colours('Middle Yellow Red', '#e4b382'),
    // new Colours('Persian Green', '#089e94'),
];

let numberOfCircles;

class Colours {
    constructor(name, color) {
        this.name = name,
        this.color = color
    }
}

const disableBecauseOfResolution = () => {
    document.querySelectorAll('.circles-child').forEach(circle => {
    circle.style.backgroundColor = '#cccccc';
    circle.dataset.selector = 'not-event-circle';
    });
    let _select = document.querySelector('.configpanel__selector');
    _select.disabled = true;
    let _checkbox = document.querySelector('.configpanel__overlay__checkbox');
    _checkbox.disabled = true;
}

const returnToDefault = () => {
    document.querySelectorAll('.circles-child').forEach(circle => {
    circle.dataset.selector = 'circle';
    });
    let _select = document.querySelector('.configpanel__selector');
    _select.disabled = false;
    let _checkbox = document.querySelector('.configpanel__overlay__checkbox');
    _checkbox.disabled = false;
}

const checkWindowResolution = () => {
    if(window.innerWidth < 500){
        disableBecauseOfResolution();
    } else {
        returnToDefault();
        resetColorsFromCircles();
    }
}
window.addEventListener('resize', () => {
    checkWindowResolution();
} )

const createCircles = (number) => {
        let circleContainer = document.createElement("div");
        circleContainer.classList.add('circles')
        let lastCircle = circleContainer;
        for (let i = 0; i <= number-1; i++) {
            let circle = document.createElement("div");
            circle.style.width = 290 - 290/number*i + "px";
            circle.style.height = 290 - 290/number*i + "px";
            circle.classList.add("circles-child");
            circle.dataset.selector = 'circle';
            lastCircle.appendChild(circle);
            lastCircle = circle;
        }
        document.querySelector('.circles-recipient').appendChild(circleContainer);
}

const createAllCircles = number => {
    if(number > 15){
        alert('No podemos crear tantos circulos');
        return;
    } else if(number > 0) {
        if(document.querySelector('.circles')){
        removeCircles();
        createCircles(number)
        saveNumberOfCircles(number);
    } else {
        createCircles(number);
        saveNumberOfCircles(number);
    }
}
}

const removeCircles = () => {
    let circles = document.querySelector('.circles');
    circles.remove();
}

const changeColorCircle = target => {
    let _select = document.querySelector('.configpanel__selector');
    target.style.backgroundColor = _select.value;
}

const changeColorOfAllBehind = e => {
    if(checkOverlay()){
        let circleToPaint = e.target.parentElement; 
        let interval = setInterval(()=>{
            if(circleToPaint.dataset.selector === 'circle'){
                changeColorCircle(circleToPaint);
                circleToPaint = circleToPaint.parentElement;
            } else {clearInterval(interval)}
        }, 50)
    }
}

const checkOverlay = ()=> {
    let overlayCheckbox = document.querySelector('.configpanel__overlay__checkbox');
    if(overlayCheckbox.checked){
        return true
    }
}

const addColorToArray = hexColor =>{
        let newColour = new Colours('User Color', hexColor);
        chosenColours.push(newColour);
        saveArrayToLocalStorage();
        return newColour;
}

const removeColorFromArray = ()=>{
    if(chosenColours.length > 0){
        chosenColours.pop();
        saveArrayToLocalStorage();
        return true
    } else {
        alert('No quedan colores por quitar')
        return false
    }
}

const displayNewColor = colorObject => {
    let _select = document.querySelector('.configpanel__selector');
    let _option = document.createElement('option');
    _option.innerHTML = colorObject.name;
    _option.dataset.selector = 'option';
    _option.value = colorObject.color;
    _option.style.backgroundColor = colorObject.color; 
    _select.appendChild(_option);
}

function selectLastColorPicked() {
    let _select = document.querySelector('.configpanel__selector');
    let colorPicker = document.querySelector('.configpanel__palette');
    _select.value = colorPicker.value;
}

const resetColorsFromCircles = () => {
    document.querySelectorAll('.circles-child').forEach(circle=>{
        circle.style.backgroundColor = '#ffffff'
    })
}

function resetColorsFromLocalStorageAndSelect(){
    localStorage.removeItem('chosenColours');
    let _select = document.querySelector('.configpanel__selector');
    _select.innerHTML = '';
    let chosenColours = [
        new Colours('Red Crayola', '#fa0050'),
        new Colours('Sunglow', '#fecd36'),
        new Colours('Middle Yellow Red', '#e4b382'),
        new Colours('Persian Green', '#089e94'),
    ];
    chosenColours.forEach(color => {
        let _select = document.querySelector('.configpanel__selector');
        let _option = document.createElement('option');
        _option.innerHTML = color.name;
        _option.dataset.selector = 'option';
        _option.value = color.color;
        _option.style.backgroundColor = color.color; 
        _select.appendChild(_option);
    })
    document.getElementById('color-palette').value = chosenColours[0].color;
}

const saveNumberOfCircles = (number) => {
    localStorage.setItem('numberOfCircles', number);
}

const loadNumberOfCircles = () => {
    let number = localStorage.getItem('numberOfCircles');
    if(number !== null){
        numberOfCircles = number;
    }
    return numberOfCircles;
}

const displayCirclesFromLocalStorage = () => {
    if(localStorage.getItem('numberOfCircles') !== null){
        let number = loadNumberOfCircles();
        createAllCircles(number);
    } else {
        let number = 4;
        createAllCircles(number);
    }
}

const saveArrayToLocalStorage = () => {
    localStorage.setItem('chosenColours', JSON.stringify(chosenColours));
}

const loadArrayFromLocalStorage = () => {
    let array = JSON.parse(localStorage.getItem('chosenColours'));
    if(array !== null){
        chosenColours = array;
    }
    
    return chosenColours;
}
const displayColorsFromLocalStorage = () => {
    if(localStorage.getItem('chosenColours') !== null){
        let array = loadArrayFromLocalStorage();
        array.forEach(color => {
            displayNewColor(color);
        } )
    } else {
        chosenColours = [
            new Colours('Red Crayola', '#fa0050'),
            new Colours('Sunglow', '#fecd36'),
            new Colours('Middle Yellow Red', '#e4b382'),
            new Colours('Persian Green', '#089e94'),
        ];

        chosenColours.forEach(color => {
            displayNewColor(color);
        } )
    }
}

///////// EVENT LISTENERS //////////////

document.addEventListener('DOMContentLoaded', ()=>{
    displayColorsFromLocalStorage();
    displayCirclesFromLocalStorage();
    checkWindowResolution();
    }
)

document.addEventListener('click', e=>{
    if(e.target.dataset.selector === 'circle'){
        changeColorCircle(e.target);
        changeColorOfAllBehind(e);
        return;
    } else if(e.target.dataset.selector === 'reset'){
        resetColorsFromCircles();
        resetColorsFromLocalStorageAndSelect();
        return;
    }
    else if(e.target.dataset.selector === 'addcolor'){
        let newColor = addColorToArray(colorPalette.value);
        displayNewColor(newColor);
        selectLastColorPicked();
        return
    } else if(e.target.dataset.selector === 'removecolor'){
        let _select = document.querySelector('.configpanel__selector');
        if(removeColorFromArray()){
            _select.removeChild(_select.lastChild)
        }
        return
    } else if(e.target.dataset.selector === 'addcircle'){
        let number = document.querySelector('.configpanel__number').value;
        createAllCircles(number);
        return;
    }
})

document.addEventListener('change', e=>{
    if(e.target.dataset.selector === 'color-picker'){
        let colorPicker = document.getElementById('color-palette');
        let colorSelector = document.getElementById('colours');
        colorPicker.value = colorSelector.value;
    }
})