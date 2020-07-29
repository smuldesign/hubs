export class GetCameraFeed {
  constructor() {
    this.video = null;
  }
  start() {
    this.video = document.querySelector("#videoElement");
    console.log(this.video);

    if (!this.video) {
      return;
    }
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia ||
      navigator.oGerUserMedia;
    if (navigator.mediaDevices) {
      navigator.getUserMedia({ video: true }, this.handleVideo, this.videoError);
    }
  }

  handleVideo(stream) {
    document.querySelector("#videoElement").src = window.URL.createObjectURL(stream);
    document.getElementById("container").style.display = "block";
  }

  videoError(e) {
    alert("Error " + e);
  }
  stop() {
    document.getElementById("container").style.display = "none";
    const stream = this.video.srcObject;
    console.log(stream);
    const tracks = stream.getTracks();

    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      track.stop();
    }

    this.video.srcObject = null;
  }
}
