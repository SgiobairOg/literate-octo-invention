'use strict';

var animations = document.querySelectorAll('.animated'),
    placemarks = document.querySelectorAll('[data-placemark]'),
    progressBar = document.querySelector('.progress__bar'),
    bg2Target = document.querySelector('.offerings'),
    bg3Target = document.querySelector('.projects'),
    bg4Target = document.querySelector('.experience'),
    wrapper = document.querySelector('.wrapper').classList,
    backdrop = document.querySelector('.page__backdrop').classList,
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
  switch (true) {
    case scrollY <= bg2Target.positionData.trigger:
      backdrop.add('page__backdrop--bg1');
      backdrop.remove('page__backdrop--bg2');
      break;
    case scrollY > bg2Target.positionData.trigger && scrollY <= bg3Target.positionData.trigger:
      backdrop.remove('page__backdrop--bg1');
      backdrop.add('page__backdrop--bg2');
      backdrop.remove('page__backdrop--bg3');
      break;
    case scrollY > bg3Target.positionData.trigger && scrollY <= bg4Target.positionData.trigger:
      backdrop.remove('page__backdrop--bg2');
      backdrop.add('page__backdrop--bg3');
      backdrop.remove('page__backdrop--bg4');
      break;
    case scrollY > bg4Target.positionData.trigger:
      backdrop.add('page__backdrop--bg4');
      backdrop.remove('page__backdrop--bg3');
      break;
    default:
      backdrop.add('page__backdrop--bg1');
      backdrop.remove('page__backdrop--bg2');
      backdrop.remove('page__backdrop--bg3');
      backdrop.remove('page__backdrop--bg4');
      break;
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

var initScrollResponders = function initScrollResponders() {
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

  if (bg3Target != null) {
    bg3Target.positionData = {
      trigger: bg3Target.offsetTop + bg3Target.offsetHeight / 6
    };
  }

  if (bg4Target != null) {
    bg4Target.positionData = {
      trigger: bg4Target.offsetTop + bg4Target.offsetHeight / 6
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

preloadImages(["https://res.cloudinary.com/sgiobairog/image/upload/q_auto:good/v1501190314/wilsons/moi.jpg", "https://res.cloudinary.com/sgiobairog/image/upload/q_auto:good/v1501190314/wilsons/candles.jpg", "https://res.cloudinary.com/sgiobairog/image/upload/q_auto:good/v1501190314/wilsons/fairweather.jpg", "https://res.cloudinary.com/sgiobairog/image/upload/q_auto:good/v1501190314/wilsons/desk.jpg"]);

window.addEventListener('load', initScrollResponders);
window.addEventListener('scroll', _.throttle(checkScroll, scrollSpeed));

//# sourceMappingURL=main.build.js.map