//----------------------------------------------
// Imports
//----------------------------------------------
import WOW from './vendor/_wow.js';
import Formspree from './components/_formspree.js';

//----------------------------------------------
// Inits
//----------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

  // WOW
  const wow = new WOW();

  // Inits
  wow.init();
  Formspree.init();

});
