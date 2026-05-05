import * as THREE from "three";

export const LOOK_AT = new THREE.Vector3(0, 1.90, 0);
const CAM_Y = 2.05;

function computeCameraParams(width, height) {
    let camZ;
    let fovDeg;

    if (width >= 1400) {
        camZ = 2.4;
        fovDeg = 38;
    } else if (width >= 1024) {
        camZ = 2.1;
        fovDeg = 38;
    } else if (width >= 640) {
        camZ = 1.9;
        fovDeg = 40;
    } else {
        camZ = 2.1;
        fovDeg = 44;
    }

    const aspect = width / height;
    if (aspect < 0.75) {
        camZ += 0.4;
        fovDeg += 4;
    }

    return { camZ, fovDeg };
}

export function createScene(mountEl) {
    const W = mountEl.clientWidth;
    const H = mountEl.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    const { camZ, fovDeg } = computeCameraParams(W, H);

    const camera = new THREE.PerspectiveCamera(fovDeg, W / H, 0.1, 1000);

    camera.position.set(0, CAM_Y, camZ);
    camera.lookAt(LOOK_AT);

    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    mountEl.innerHTML = "";
    mountEl.appendChild(renderer.domElement);

    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.touchAction = "none";

    // Studio Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 2.5));

    const key = new THREE.DirectionalLight(0xffffff, 3.5);
    key.position.set(1, 3, 5);
    scene.add(key);

    const front = new THREE.DirectionalLight(0xeef2ff, 2.0);
    front.position.set(0, 1.5, 5);
    scene.add(front);

    const fill = new THREE.DirectionalLight(0x22d3ee, 1.8);
    fill.position.set(-3, 1.5, 3);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0xffffff, 4.0);
    rim.position.set(0, 3, -5);
    scene.add(rim);

    return { scene, camera, renderer };
}

export function handleResize(mountEl, camera, renderer) {
    if (!mountEl) return;

    const W = mountEl.clientWidth;
    const H = mountEl.clientHeight;

    const { camZ, fovDeg } = computeCameraParams(W, H);

    camera.fov = fovDeg;
    camera.aspect = W / H;
    camera.position.set(0, CAM_Y, camZ);
    camera.lookAt(LOOK_AT);
    camera.updateProjectionMatrix();

    renderer.setSize(W, H);
}
