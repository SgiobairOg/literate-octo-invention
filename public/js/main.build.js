'use strict';

var animations = document.querySelectorAll('.animated');
var placemarks = document.querySelectorAll('[data-placemark]');
var progressBar = document.querySelector('.progress__bar');
var scrollSpeed = 160;

var checkAnimation = function checkAnimation(e) {

  _.forEach(animations, function (animation) {
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

  if (bg2Target != null) {
    var bg2Trigger = bg2Target.offsetTop + bg2Target.offsetHeight / 6;

    if (window.scrollY > bg2Trigger) document.querySelector('.wrapper').classList.add('bg2');
    if (window.scrollY <= bg2Trigger) document.querySelector('.wrapper').classList.remove('bg2');
  }
};

var checkPlacemark = function checkPlacemark(e) {
  var current = '';

  _.forEach(placemarks, function (mark) {
    if (mark.offsetTop < window.scrollY + 4 * window.innerHeight / 5) {
      current = mark.dataset.placemark;
    }
  });

  history.replaceState(null, null, current);
};

var initAnimation = function initAnimation(e) {
  _.forEach(animations, function (animation) {
    return animation.classList.add('inactive');
  });
};

var checkScroll = function checkScroll() {
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

//# sourceMappingURL=main.build.js.map