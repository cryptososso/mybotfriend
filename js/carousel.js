const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children); // select elements in a parent div//
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNavs =  document.querySelector('.carousel__nav');
const dots = Array.from(dotsNavs.children);

const slideSize = slides[0].getBoundingClientRect(); //Adjust the slides size depending on the screen size 
const slideWidth = slideSize.width;//Get width only 

// arrange the slides next to one another
//slides[0].style.left = slideWidth * 0 + "px";
//slides[1].style.left = slideWidth * 1 + "px";
// slides[2].style.left = slideWidth * 2 + "px";

// using loop 
const setSlidePosition = (slide, index) =>{
   slide.style.left = slideWidth * index + 'px';
};

slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) =>{
   track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
   currentSlide.classList.remove('current-slide');
   targetSlide.classList.add('current-slide');
}

const updateDots = (currentDot, targetDot) =>{
   currentDot.classList.remove('current-slide');
   targetDot.classList.add('current-slide')
}

const addHideArrows = (slides, prevButton, nextButton, targetIndex) =>{
   if(targetIndex === 0){
      prevButton.classList.add('is-hidden');
      nextButton.classList.remove('is-hidden');
   }else if(targetIndex === slides.length - 1){
      prevButton.classList.remove('is-hidden');
      nextButton.classList.add('is-hidden');
   }else{
      prevButton.classList.remove('is-hidden');
      nextButton.classList.remove('is-hidden')
   }
}

 
// move slide to the left 
prevButton.addEventListener('click', e =>{
   const currentSlide = track.querySelector('.current-slide');
   const prevSlide = currentSlide.previousElementSibling;
   const currentDot = dotsNavs.querySelector('.current-slide');
   const prevDot = currentDot.previousElementSibling;
   const prevIndex = slides.findIndex(slide => slide === prevSlide)

   moveToSlide(track, currentSlide, prevSlide);
   updateDots(currentDot, prevDot);
   addHideArrows(slides, prevButton, nextButton, prevIndex);
})


// move slide to the right  
nextButton.addEventListener('click', e => {
   const currentSlide = track.querySelector('.current-slide'); 
   const nextSlide = currentSlide.nextElementSibling;
   const currentDot = dotsNavs.querySelector('.current-slide');
   const nextDot = currentDot.nextElementSibling;
   const nextIndex = slides.findIndex(slide => slide === nextSlide)
   // move to the next slide
   moveToSlide(track, currentSlide, nextSlide);
   updateDots(currentDot, nextDot)
   addHideArrows(slides, prevButton, nextButton, nextIndex);
})

// nav indicator move to next slide 

dotsNavs.addEventListener('click', e =>{
   // what indicator was click on 
   const targetDot = e.target.closest('button');
   
   if(!targetDot) return;

   const currentSlide = track.querySelector('.current-slide');
   const currentDot = dotsNavs.querySelector('.current-slide');
   const targetIndex = dots.findIndex(dot => dot === targetDot)
   const targetSlide = slides[targetIndex];

   moveToSlide(track, currentSlide, targetSlide);

   updateDots(currentDot, targetDot);
   
   addHideArrows(slides, prevButton, nextButton, targetIndex);
} )







// move slide to the right  example

// nextButton.addEventListener('click', e => {
   //const currentSlide = track.querySelector('.current-slide'); 
   //const nextSlide = currentSlide.nextElementSibling;
   //const amountToMove = nextSlide.style.left;
   // move to the next slide
   //track.style.transform = 'translateX(-' + amountToMove + ')';
   //currentSlide.classList.remove('current-slide');
   //nextSlide.classList.add('current-slide');
//})


