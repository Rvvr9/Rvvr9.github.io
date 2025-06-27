// WAVESURFER: Create two waveform players
const wavesurfer1 = WaveSurfer.create({
  container: '#waveform1',
  waveColor: 'violet',
  progressColor: '#fff',
  height: 100,
  responsive: true,
});
wavesurfer1.load('audio/ambient.wav');

const wavesurfer2 = WaveSurfer.create({
  container: '#waveform2',
  waveColor: '#ff3366',
  progressColor: '#fff',
  height: 100,
  responsive: true,
});
wavesurfer2.load('audio/epic.wav');

// PARTICLES: Animated overlay
function createParticles(canvas) {
  const ctx = canvas.getContext('2d');
  let width = canvas.width = canvas.offsetWidth;
  let height = canvas.height = canvas.offsetHeight;

  let particles = Array.from({ length: 70 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    radius: Math.random() * 1.5 + 1,
    color: `rgba(255, ${Math.floor(Math.random() * 100 + 100)}, 255, 0.8)`
  }));

  function animate() {
    ctx.clearRect(0, 0, width, height);
    ctx.globalCompositeOperation = 'lighter';

    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > width) p.dx *= -1;
      if (p.y < 0 || p.y > height) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  });

  animate();
}

// Apply to all particle canvases
document.querySelectorAll('.particles').forEach(createParticles);
