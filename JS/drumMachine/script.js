const display = document.getElementById('display');
const pads = document.querySelectorAll('.drum-pad');

pads.forEach(pad => {
  pad.addEventListener('click', () => {
    const audio = pad.querySelector('.clip');
    audio.currentTime = 0;
    audio.play();
    display.textContent = pad.id; 
  });
});

document.addEventListener('keydown', (e) => {
  const key = e.key.toUpperCase();
  const pad = document.getElementById(key);
  if (pad) {
    const audio = pad.querySelector('.clip');
    audio.currentTime = 0;
    audio.play();
    display.textContent = pad.id;
  }
});