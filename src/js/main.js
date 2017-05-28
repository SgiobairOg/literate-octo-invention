const animations = document.querySelectorAll('.animated');
const placemarks = document.querySelectorAll('[data-placemark]');
const progressBar = document.querySelector('.progress__bar');

const debounce = (func, wait=20, immediate=true) => {
  let timeout;
  return (...args) => {
    let context = this;
    const later = () => {
      timeout = null;
      if(!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const checkAnimation = (e) => {
  
  animations.forEach( animation => {
    const animationTrigger = (window.scrollY + window.innerHeight) - animation.offsetHeight;
  
    const isShowing = animationTrigger > animation.offsetTop;
    
    if( isShowing) {
      animation.classList.remove('inactive');
    } else {
      animation.classList.add('inactive');
    }
  })
};

const checkProgress = (e) => {
  const body = document.body,
      html = document.documentElement;
  
  const pageHeight = Math.max( body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight );
  
  //console.log(pageHeight, window.scrollY + window.innerHeight, (((window.scrollY+ window.innerHeight) / pageHeight) * 100));
  progressBar.style.width = `${((window.scrollY / (pageHeight - window.innerHeight)) * 100)}vw`;
};

const checkBG = (e) => {
  const bg2Target = document.querySelector('.offerings');
  
  const bg2Trigger = (bg2Target.offsetTop + (bg2Target.offsetHeight / 6));
  
  if( window.scrollY > bg2Trigger ) document.querySelector('.wrapper').classList.add('bg2');
  if( window.scrollY <= bg2Trigger ) document.querySelector('.wrapper').classList.remove('bg2');
  
};

const checkPlacemark = (e) => {
  let current = '';
  
  placemarks.forEach( mark => {
    if( mark.offsetTop < ( window.scrollY + ( 4 * window.innerHeight/5 ))) {
      current = mark.dataset.placemark;
      
    }
  });
  
  history.replaceState(null, null, current);
};

const initAnimation = (e) => {
  animations.forEach(animation => animation.classList.add('inactive'));
};

if(animations.length > 0) {
  window.addEventListener('load', initAnimation);
  window.addEventListener('scroll', debounce(checkAnimation, 10));
}
if(placemarks.length > 0) {
  window.addEventListener('scroll', debounce(checkPlacemark, 10));
}