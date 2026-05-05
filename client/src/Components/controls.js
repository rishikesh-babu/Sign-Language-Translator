
export function setupControls(camera, domElement, avatarSceneRef) {

  let isDragging   = false;
  let lastX        = 0;
  let rotationY    = 0;
  let velocity     = 0;
  const SENSITIVITY = 0.005;
  const DAMPING     = 0.88;

  function applyRotation() {
    const avatar = avatarSceneRef();
    if (avatar) avatar.rotation.y = rotationY;
  }

  function onMouseDown(e) {
    isDragging = true;
    lastX      = e.clientX;
    velocity   = 0;
  }

  function onMouseMove(e) {
    if (!isDragging) return;
    const dx  = e.clientX - lastX;
    lastX     = e.clientX;
    rotationY -= dx * SENSITIVITY;
    velocity   = -dx * SENSITIVITY;
    applyRotation();
  }

  function onMouseUp() { isDragging = false; }

  let lastTouchX = 0;

  function onTouchStart(e) {
    if (e.touches.length !== 1) return;
    isDragging  = true;
    lastTouchX  = e.touches[0].clientX;
    velocity    = 0;
  }

  function onTouchMove(e) {
    if (!isDragging || e.touches.length !== 1) return;
    const dx    = e.touches[0].clientX - lastTouchX;
    lastTouchX  = e.touches[0].clientX;
    rotationY  -= dx * SENSITIVITY;
    velocity    = -dx * SENSITIVITY;
    applyRotation();
    e.preventDefault();
  }

  function onTouchEnd() { isDragging = false; }

  function onContextMenu(e) { e.preventDefault(); }

  domElement.addEventListener("mousedown",   onMouseDown);
  domElement.addEventListener("mousemove",   onMouseMove);
  domElement.addEventListener("mouseup",     onMouseUp);
  domElement.addEventListener("mouseleave",  onMouseUp);
  domElement.addEventListener("touchstart",  onTouchStart, { passive: false });
  domElement.addEventListener("touchmove",   onTouchMove,  { passive: false });
  domElement.addEventListener("touchend",    onTouchEnd);
  domElement.addEventListener("contextmenu", onContextMenu);

  function update() {
    if (!isDragging && Math.abs(velocity) > 0.0001) {
      rotationY += velocity;
      velocity  *= DAMPING;
      applyRotation();
    }
  }

 
  function dispose() {
    domElement.removeEventListener("mousedown",   onMouseDown);
    domElement.removeEventListener("mousemove",   onMouseMove);
    domElement.removeEventListener("mouseup",     onMouseUp);
    domElement.removeEventListener("mouseleave",  onMouseUp);
    domElement.removeEventListener("touchstart",  onTouchStart);
    domElement.removeEventListener("touchmove",   onTouchMove);
    domElement.removeEventListener("touchend",    onTouchEnd);
    domElement.removeEventListener("contextmenu", onContextMenu);
  }

  return { update, dispose };
}