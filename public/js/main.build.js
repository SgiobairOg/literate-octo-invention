'use strict';

var animations = document.querySelectorAll('.animated'),
    placemarks = document.querySelectorAll('[data-placemark]'),
    progressBar = document.querySelector('.progress__bar'),
    bg2Target = document.querySelector('.offerings'),
    wrapper = document.querySelector('.wrapper').classList,
    body = document.body,
    html = document.documentElement,
    pageHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight),
    scrollSpeed = 160,
    innerHeight = window.innerHeight;

var latestScrollY = 0,
    ticking = false;

var checkAnimation = function checkAnimation(scrollY) {

  _.forEach(animations, function (animation) {
    var animationTrigger = scrollY + innerHeight - animation.positionData.offsetHeight;

    var isShowing = animationTrigger > animation.positionData.offsetTop;

    if (isShowing) {
      animation.classList.remove('inactive');
    } else {
      animation.classList.add('inactive');
    }
  });
};

var checkProgress = function checkProgress(scrollY) {
  progressBar.style.width = scrollY / (pageHeight - innerHeight) * 100 + 'vw';
};

var checkBG = function checkBG(scrollY) {
  if (bg2Target != null) {
    if (scrollY > bg2Target.positionData.trigger) wrapper.add('bg2');
    if (scrollY <= bg2Target.positionData.trigger) wrapper.remove('bg2');
  }
};

var checkPlacemark = function checkPlacemark(scrollY) {
  var current = '';

  _.forEach(placemarks, function (mark) {
    if (mark.offsetTop < scrollY + 4 * innerHeight / 5) {
      current = mark.dataset.placemark;
    }
  });

  history.replaceState(null, null, current);
};

var checkScroll = function checkScroll() {
  latestScrollY = window.scrollY;
  getTicker();
};

var getTicker = function getTicker() {
  if (!ticking) requestAnimationFrame(update);
  ticking = true;
};

var update = function update() {
  ticking = false;

  var currScrollY = latestScrollY;

  if (animations.length > 0) {
    checkAnimation(currScrollY);
  }
  if (placemarks.length > 0) {
    checkPlacemark(currScrollY);
  }
  if (progressBar != null) {
    checkProgress(currScrollY);
  }
  checkBG(currScrollY);
};

var initAnimation = function initAnimation() {
  _.forEach(animations, function (animation) {
    animation.classList.add('inactive');
    animation.positionData = {
      offsetHeight: animation.offsetHeight,
      offsetTop: animation.offsetTop
    };
  });

  if (bg2Target != null) {
    bg2Target.positionData = {
      trigger: bg2Target.offsetTop + bg2Target.offsetHeight / 6
    };
  }
};

var preloadImages = function preloadImages(array) {
  if (!preloadImages.list) {
    preloadImages.list = [];
  }
  var list = preloadImages.list;
  _.forEach(array, function (i) {
    var img = new Image();
    img.onload = function () {
      var index = list.indexOf(undefined);
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

//# sourceMappingURL=main.build.js.map