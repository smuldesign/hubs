class attachCamera {
  constructor() {
    this.attachCamInterval = null;
  }
  attach() {
    // Variables
    let myCam;
    const camHash = "vide";
    const selfEl = AFRAME.scenes[0].querySelector("#avatar-rig");
    const headElrotation = new THREE.Quaternion();
    const headEl = {
      position: new THREE.Vector3()
    };
    // Get all the camera elements
    function getAllElementsFromHash(hash) {
      const g = AFRAME.scenes[0].querySelectorAll("[media-loader]");
      const matches = [];
      for (const e of g) {
        const m = e.components["media-loader"].attrValue.src.match(hash);
        if (m && m.length) matches.push(e);
      }
      return matches;
    }
    // Attach your camera to your avatar
    function attachObjToAvatar(obj, avatar) {
      NAF.utils.getNetworkedEntity(obj).then(networkedEl => {
        avatar.querySelectorAll("#avatar-head")[0].object3D.getWorldPosition(headEl.position);
        networkedEl.object3D.position.copy(headEl.position);
        networkedEl.object3D.position.y += 0;
        networkedEl.object3D.setRotationFromQuaternion(
          avatar.querySelectorAll("#avatar-head")[0].object3D.getWorldQuaternion(headElrotation)
        );
      });
    }
    // Runs on setInterval every ... frames
    function attachCam() {
      attachObjToAvatar(myCam, selfEl);
    }
    const camEl = getAllElementsFromHash(camHash);
    if (!camEl) return;
    // Finding YOUR camera to put on the avatar
    for (const cam of camEl) {
      NAF.utils.getNetworkedEntity(cam).then(networkedEl => {
        const mine = NAF.utils.isMine(networkedEl);
        if (mine) {
          myCam = cam;
          this.attachCamInterval = setInterval(attachCam, 35);
          cam.object3D.scale.setScalar(0.35);
        }
      });
    }
  }

  detach() {
    this.attachCamInterval = clearInterval();
  }
}

export default attachCamera;
