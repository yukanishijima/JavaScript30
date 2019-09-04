// get our elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressFilled = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const ranges = player.querySelectorAll('.player__slider');    //select ALL!!
const skipButtons = player.querySelectorAll('[data-skip]');   //select ALL!!


// build out functions

function togglePlay() {
  if (video.paused) {
    video.play();   //built in function
  } else {
    video.pause();   //built in function
  }
};

function updateButton() {
  if (this.paused) {
    toggle.textContent = '>';
  } else {
    toggle.textContent = '||';
    console.log(this.currentTime);
  }
  // const icon = this.paused ? ">" : "||";  //ternary operator!
};

function skip() {
  console.log(this.dataset.skip);
  video.currentTime += parseInt(this.dataset.skip);
};

function handleRangeUpdate() {
  video[this.name] = this.value;
};

function handlProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;   //style name has to be in camel-case!
};

function scrub(event) {
  console.log(event);
  // console.dir(progress);
  const progressTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = progressTime;
};


// hook up the event listners
video.addEventListener("click", togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handlProgress);  //starts when video starts!

toggle.addEventListener("click", togglePlay);

skipButtons.forEach(button => button.addEventListener("click", skip));

ranges.forEach(button => button.addEventListener("change", handleRangeUpdate));
ranges.forEach(button => button.addEventListener("mousemove", handleRangeUpdate));  //changes as the mouse moves

let mouseDown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mouseDown && scrub(e));
progress.addEventListener("mousedown", () => mouseDown = true);
progress.addEventListener("mouseup", () => mouseDown = false);
// progress.addEventListener("mousemove", scrub);   //mousemove makes it change whenever the mouse is moved which is weird..

