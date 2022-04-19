window.addEventListener("scroll", scrollFunc);

// variables for window scrolling transitions
let scrollID = document.getElementById("mainEntoHide");
let scrollID1 = document.getElementById("mainCodeHide");
let exploreTag = document.getElementById("exploreTag");

// code for making the navigation bar appear and disappear
let topBar = document.getElementById("topBar");
let formerY = window.pageYOffset;

/**
 * function for checking if user is scrolling up or down the page
 * if scrolling down, navbar disappears, if up, navbar reappears
 */
window.onscroll = function() {

var currentY = window.pageYOffset;
    if (formerY > currentY) {
        topBar.style.top = "0";
    } 
    else {
        topBar.style.top = "-60px";
    }
formerY = currentY;
}



// can be used later for a slide in 
//let photoSlide = document.getElementById("slideImgBefore");
function scrollFunc() {
    
    let ycoord = window.scrollY;
    if (ycoord >= 100) {
        scrollID.id = "mainEnto";
        exploreTag.remove();

    }
    
    let ycoord1 = window.scrollY;
    if (ycoord1 >= 300) {
        scrollID1.id = "mainCode";
    }

    // let ycoord1 = window.scrollY;
    // if (ycoord1 >= 525) {
    //     photoSlide.id = "slideImgAfter"
    // }
};





