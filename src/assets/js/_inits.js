//----------------------------------------------
// Imports
//----------------------------------------------
import WOW from './vendor/_wow.js';
import SmoothScroll from 'smooth-scroll';
import Formspree from './components/_formspree.js';

//----------------------------------------------
// Inits
//----------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

  var header = document.getElementsByClassName('mast__title')[0];
  var array = header.innerHTML.split(' ');
  header.innerHTML = '';
  array.forEach(idx => {
    header.innerHTML += `<span>${idx}</span><span>&nbsp;</span>`;
  });

  // WOW
  const wow = new WOW({
    boxClass: 'js-wow'
  });

  // Smooth Scroll
  const scroll = new SmoothScroll('a[href*="#"]');

  // Inits
  wow.init();
  Formspree.init();

});
