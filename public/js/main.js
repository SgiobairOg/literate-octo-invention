

const animations = document.querySelectorAll('.animated');
const placemarks = document.querySelectorAll('[data-placemark]');
const progressBar = document.querySelector('.progress__bar');
const scrollSpeed = 160;

const checkAnimation = (e) => {
  
  _.forEach(animations, animation => {
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
  
  if(bg2Target != null) {
    const bg2Trigger = (bg2Target.offsetTop + (bg2Target.offsetHeight / 6));
  
    if (window.scrollY > bg2Trigger) document.querySelector('.wrapper').classList.add('bg2');
    if (window.scrollY <= bg2Trigger) document.querySelector('.wrapper').classList.remove('bg2');
  }
};

const checkPlacemark = (e) => {
  let current = '';
  
  _.forEach(placemarks, mark => {
    if( mark.offsetTop < ( window.scrollY + ( 4 * window.innerHeight/5 ))) {
      current = mark.dataset.placemark;
      
    }
  });
  
  history.replaceState(null, null, current);
};

const initAnimation = (e) => {
  _.forEach(animations, animation => animation.classList.add('inactive'));
};

const checkScroll = () => {
  if (animations.length > 0) {
    checkAnimation();
  }
  if (placemarks.length > 0) {
    checkPlacemark();
  }
  if (progressBar != null) {
    checkProgress();
  }
  checkBG();
};


window.addEventListener('load', initAnimation);
window.addEventListener('scroll', _.throttle(checkScroll, scrollSpeed));