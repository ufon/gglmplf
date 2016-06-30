var ripplyScott = (function() {
  var circle = document.getElementById('js-ripple');

  function rippleAnimation(event, timing, ripples) {
    var tl           = new TimelineMax();
        ripple       = document.getElementById(ripples),
        x            = event.offsetX,
        y            = event.offsetY,
        w            = event.target.offsetWidth,
        h            = event.target.offsetHeight,
        offsetX      = Math.abs( (w / 2) - x ),
        offsetY      = Math.abs( (h / 2) - y ),
        deltaX       = (w / 2) + offsetX,
        deltaY       = (h / 2) + offsetY,
        scale_ratio  = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

    console.log('x is:' + x);
    console.log('y is:' + y);
    console.log('offsetX is:' + offsetX);
    console.log('offsetY is:' + offsetY);
    console.log('deltaX is:' + deltaX);
    console.log('deltaY is:' + deltaY);
    console.log('width is:' + w);
    console.log('height is:' + h);
    console.log('scale ratio is:' + scale_ratio);

    tl.fromTo(ripple, timing, {
      x: x,
      y: y,
      transformOrigin: '50% 50%',
      scale: 0,
      opacity: 1,
      ease: Linear.easeIn
    },{
      scale: scale_ratio,
      opacity: 0
    });

    return tl;
  }

  return {
    init: function(target, timing, ripples) {
      var button = document.getElementById(target);

      button.addEventListener('click', function(event) {
        rippleAnimation.call(this, event, timing, ripples);
      });
    }
  };
})();

ripplyScott.init('js-ripple-btn1', 0.75, 'js-ripple1');
ripplyScott.init('js-ripple-btn2', 0.75, 'js-ripple2');
ripplyScott.init('js-ripple-btn3', 0.75, 'js-ripple3');
ripplyScott.init('js-ripple-btn4', 0.75, 'js-ripple4');