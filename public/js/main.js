
const animations = document.querySelectorAll('.animated')
  , placemarks = document.querySelectorAll('[data-placemark]')
  , progressBar = document.querySelector('.progress__bar')
  , bg2Target = document.querySelector('.offerings')
  , wrapper = document.querySelector('.wrapper').classList
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

const checkBG = ( scrollY ) => {
  if(bg2Target != null) {
    if (scrollY > bg2Target.positionData.trigger) wrapper.add('bg2');
    if (scrollY <= bg2Target.positionData.trigger) wrapper.remove('bg2');
  }
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
  checkBG( currScrollY );
};

const initAnimation = () => {
  _.forEach(animations, animation => {
    animation.classList.add('inactive');
    animation.positionData = {
      offsetHeight: animation.offsetHeight,
      offsetTop: animation.offsetTop
    };
  });
  
  if( bg2Target != null ) {
    bg2Target.positionData = {
      trigger: (bg2Target.offsetTop + (bg2Target.offsetHeight / 6))
    };
  }
};

const preloadImages = (array) => {
  if (!preloadImages.list) {
    preloadImages.list = [];
  }
  const list = preloadImages.list;
  _.forEach( array, (i) => {
    let img = new Image();
    img.onload = () => {
      let index = list.indexOf(this);
      if (index !== -1) {
        // remove image from the array once it's loaded
        // for memory consumption reasons
        list.splice(index, 1);
      }
    };
    list.push(img);
    img.src = i;
  });
};

preloadImages(["../img/laptop.png", "../img/laptop@2x.png"]);

window.addEventListener('load', initAnimation);
window.addEventListener('scroll', _.throttle(checkScroll, scrollSpeed));