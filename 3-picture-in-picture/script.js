const videoElement = document.getElementById('video');
const button = document.getElementById('button');

//prompt to select media stream, pass to video element, then play

async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {}
}

button.addEventListener('click', async () => {
  button.disabled = true;
  //Start picture in picter
  await videoElement.requestPictureInPicture();
  //reset the button
  button.disabled = false;
});

// On Load
selectMediaStream();
