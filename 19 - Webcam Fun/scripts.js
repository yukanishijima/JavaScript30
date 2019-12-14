const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  // set up to get video content from web cam!
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream);  // return obj of media stream
      video.srcObject = localMediaStream;  // assign obj to video.srcObject
      video.play();  // play the video
    })
    .catch(err => {
      console.error("Oh no!", err);
    })
}

// paint the video to canvas!
function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  console.log(width, height);

  // make width and height of canvas is the same as video!
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    // add video (can be image too) to canvas every 16 milli seconds!
    ctx.drawImage(video, 0, 0, width, height);  // 0,0, means left top corner
  }, 10);
}

function takePhoto() {
  // play the sound
  snap.currentTime = 0;
  snap.play();

  // take the data out of the canvas
  const data = canvas.toDataURL("image/jpeg");
  console.log(data); // text-based representation of image!
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "handsome");
  // link.textContent = "Download Image";
  link, innerHTML = `<img src="${data} " alt="Hansome!"/>`
  strip.insertBefore(link, strip.firstChild); // insert link before first child of strip!
}

getVideo();

// once video.play() runs then run paintToCanvas!
video.addEventListener("canplay", paintToCanvas);
