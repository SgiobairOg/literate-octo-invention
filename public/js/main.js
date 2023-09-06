
const animations = document.querySelectorAll('.animated')
  , placemarks = document.querySelectorAll('[data-placemark]')
  , progressBar = document.querySelector('.progress__bar')
  , bg2Target = document.querySelector('.offerings')
  , bg3Target = document.querySelector('.projects')
  , bg4Target = document.querySelector('.experience')
  , wrapper = document.querySelector('.wrapper').classList
  , backdrop = document.querySelector('.page__backdrop').classList
  , body = document.body
  , html = document.documentElement
  , pageHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight )
  , scrollSpeed = 160
  , innerHeight = window.innerHeight;
  
let latestScrollY = 0
  , ticking = false;

const checkAnimation = ( scrollY ) => {
  
  _.forEach(animations, animation => {
    const animationTrigger = (scrollY + innerHeight) - animation.positionData.offsetHeight;
  
    const isShowing = animationTrigger > animation.positionData.offsetTop;
    
    if( isShowing ) {
      animation.classList.remove('inactive');
    } else {
      animation.classList.add('inactive');
    }
  })
};

const checkProgress = ( scrollY ) => {
  progressBar.style.width = `${((scrollY / (pageHeight - innerHeight)) * 100)}vw`;
};

const checkPlacemark = ( scrollY ) => {
  let current = '';
  
  _.forEach(placemarks, mark => {
    if( mark.offsetTop < ( scrollY + ( 4 * innerHeight/5 ))) {
      current = mark.dataset.placemark;
    }
  });
  
  history.replaceState(null, null, current);
};


const checkScroll = () => {
  latestScrollY = window.scrollY;
  
  getTicker();
};

const getTicker = () => {
  if(!ticking) requestAnimationFrame(update);
  
  ticking = true;
};

const update = () => {
  ticking = false;
  
  const currScrollY = latestScrollY;
  
  if (animations.length > 0) {
    checkAnimation( currScrollY );
  }
  
  if (placemarks.length > 0) {
    checkPlacemark( currScrollY );
  }
  
  if (progressBar != null) {
    checkProgress( currScrollY );
  }
};

const initScrollResponders = () => {
  _.forEach(animations, animation => {
    animation.classList.add('inactive');
    animation.positionData = {
      offsetHeight: animation.offsetHeight,
      offsetTop: animation.offsetTop
    };
  });
};



window.addEventListener('load', initScrollResponders);
window.addEventListener('scroll', _.throttle(checkScroll, scrollSpeed));