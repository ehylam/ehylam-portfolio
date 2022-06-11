import * as THREE from 'three';

export default class AnimationTest {
  constructor(canvas) {
    // Variables
    this.canvas = canvas;
    console.log(this.canvas);

    // Scene
    this.scene = new THREE.Scene();


    // Camera
    this.cameraPos = 600;
    this.fieldOfView = 70;
    this.nearPlane = 100;
    this.farPlane = 2000;

    // Reference - https://i7x7p5b7.stackpathcdn.com/codrops/wp-content/uploads/2019/10/g.png
    this.camera = new THREE.PerspectiveCamera( this.fieldOfView, window.innerWidth / window.innerHeight, this.nearPlane, this.farPlane );
    this.camera.position.z = this.cameraPos;
    this.camera.fov = 2 * Math.atan((window.innerHeight / 2) / this.cameraPos ) * (180 / Math.PI);
    this.scene.add(this.camera);


    // Renderer
  }



  render() {

  }
}