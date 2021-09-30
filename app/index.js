import document from 'document'
import './widgets/slider'

const mySliderEl = document.getElementById('mySlider')
const mySlider2El = document.getElementById('mySlider2')
const labelEl = document.getElementById('label')

mySliderEl.onchange = mySliderChange

function mySliderChange(val) {
  labelEl.text = `${(val)}, ${(mySlider2El.value)}` // lazy way to show how to get a slider's value without a listener
}

//only style gets applied


mySliderEl.track_bg.style.fill = "orange";
mySliderEl.track.style.fill = "magenta";
//mySliderEl.marker.style.fill = "red";
mySliderEl.track_bg.style.opacity = 1;

mySlider2El.track_bg.style.fill = "blue";
mySlider2El.track.style.fill = "limegreen";
mySlider2El.marker.style.fill = "yellow";
mySlider2El.track_bg.style.opacity = 1;


//no error for x,y, but no influence
//as not exposed
mySlider2El.x = 20;
mySliderEl.marker.cx = 50;
mySlider2El.track.x = 100;
mySlyderEl.track.y = 200;
mySliderEl.y = 250;
