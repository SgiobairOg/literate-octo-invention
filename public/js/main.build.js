'use strict';

var animations = document.querySelectorAll('.animated');
var placemarks = document.querySelectorAll('[data-placemark]');
var progressBar = document.querySelector('.progress__bar');

/* https://remysharp.com/2010/07/21/throttling-function-calls */
var throttle = function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last = void 0,
      deferTimer = void 0;
  return function () {
    var context = scope || this;

    var now = +new Date(),
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
};

/*const debounce = (func, wait=20, immediate=true) => {
  let timeout;
  return (...args) => {
    let context = this;
    const later = () => {
      timeout = null
      if(!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);//
  };
};*/

var checkAnimation = function checkAnimation(e) {

  animations.forEach(function (animation) {
    var animationTrigger = window.scrollY + window.innerHeight - animation.offsetHeight;

    var isShowing = animationTrigger > animation.offsetTop;

    if (isShowing) {
      animation.classList.remove('inactive');
    } else {
      animation.classList.add('inactive');
    }
  });
};

var checkProgress = function checkProgress(e) {
  var body = document.body,
      html = document.documentElement;

  var pageHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

  //console.log(pageHeight, window.scrollY + window.innerHeight, (((window.scrollY+ window.innerHeight) / pageHeight) * 100));
  progressBar.style.width = window.scrollY / (pageHeight - window.innerHeight) * 100 + 'vw';
};

var checkBG = function checkBG(e) {
  var bg2Target = document.querySelector('.offerings');

  var bg2Trigger = bg2Target.offsetTop + bg2Target.offsetHeight / 6;

  if (window.scrollY > bg2Trigger) document.querySelector('.wrapper').classList.add('bg2');
  if (window.scrollY <= bg2Trigger) document.querySelector('.wrapper').classList.remove('bg2');
};

var checkPlacemark = function checkPlacemark(e) {
  var current = '';

  placemarks.forEach(function (mark) {
    if (mark.offsetTop < window.scrollY + 4 * window.innerHeight / 5) {
      current = mark.dataset.placemark;
    }
  });

  history.replaceState(null, null, current);
};

var initAnimation = function initAnimation(e) {
  animations.forEach(function (animation) {
    return animation.classList.add('inactive');
  });
};

if (animations.length > 0) {
  window.addEventListener('load', initAnimation);
  window.addEventListener('scroll', throttle(checkAnimation, 100));
}
if (placemarks.length > 0) {
  window.addEventListener('scroll', throttle(checkPlacemark, 100));
}

//# sourceMappingURL=main.build.js.map