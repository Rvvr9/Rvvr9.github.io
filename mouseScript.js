let mouseCursor = document.querySelector(".cursor");

// Select all <a>, .playBtn images, and .waveform divs
let hoverables = document.querySelectorAll("a, .playBtn, .waveform");

window.addEventListener('mousemove', e => {
  mouseCursor.style.top = e.pageY + 'px';
  mouseCursor.style.left = e.pageX + 'px';
});

hoverables.forEach(el => {
  el.addEventListener('mouseover', () => {
    mouseCursor.classList.add('link-grow');
  });
  el.addEventListener('mouseleave', () => {
    mouseCursor.classList.remove('link-grow');
  });
});

