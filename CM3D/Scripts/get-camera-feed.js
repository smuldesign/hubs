export class GetCameraFeed {
  constructor() {
    this.video = null;
    this.isMobile = window.matchMedia("only screen and (max-width: 1080px)").matches;
  }
  start() {
    this.video = document.querySelector("#videoElement");
    if (this.isMobile) {
      return;
    }
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
    if (this.isMobile) {
      return;
    }
    document.getElementById("container").style.display = "none";
    const stream = this.video.srcObject;
    const tracks = stream.getTracks();
    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      track.stop();
    }
    this.video.srcObject = null;
  }
}
