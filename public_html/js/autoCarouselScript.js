/*****************************************************************************
 * This is the javascript file for implementing the automatic photo
 * carousel.
 * My original carousel worked suboptimally. I had designed it to append and 
 * remove a child div with photo every few seconds, but it made the contents
 * below jump up and down with each append and remove. It was clunky.
 * 
 * I found the code below on W3Schools.com and modified it slightly to fit
 * my needs.
 * 
 *****************************************************************************/

//slide number starts at 0
let slideNumber = 0;
// calls photoCarousel function
photoCarousel();

function photoCarousel() {
  let i; 
  // creates an array of divs that contain photos from the html page
  let photos = document.getElementsByClassName("videoMain");

  // for loop hides them all by setting display to none
  for (i = 0; i < photos.length; i++) {
    photos[i].style.display = "none";
  }

  // increment the slide number, and if end of array sets slide number back
  slideNumber++;
  if (slideNumber > photos.length) {
      slideNumber = 1}

  // changes the style to block to display it
  photos[slideNumber-1].style.display = "block";

  // change image after 3 seconds
  setTimeout(photoCarousel, 3000);
} 