//----------------------------------------------
// Imports
//----------------------------------------------
import WOW from './vendor/_wow.js';
import SmoothScroll from 'smooth-scroll';
// import Formspree from './components/_formspree.js';

//----------------------------------------------
// Inits
//----------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

  // WOW
  const wow = new WOW({
    boxClass: 'js-wow'
  });

  // Smooth Scroll
  const scroll = new SmoothScroll('a[href*="#"]');

  // Inits
  wow.init();
  // Formspree.init();

});
