class GetCameraFeed {
  constructor() {
    this.video = document.querySelector("#videoElement");
  }
  start() {
    if (!this.video) {
      return;
    }
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function(stream) {
          this.video.srcObject = stream;
        })
        .catch(function(error) {
          console.log("Something went wrong!");
          console.log(error);
        });
    }
  }
  stop() {
    const stream = this.video.srcObject;
    const tracks = stream.getTracks();

    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      track.stop();
    }

    this.video.srcObject = null;
  }
}
