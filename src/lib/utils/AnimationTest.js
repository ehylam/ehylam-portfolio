import * as THREE from 'three';
import Stats from 'stats.js';

const fragmentShader = `
uniform float uTime;

void main()	{
  gl_FragColor = vec4((sin(uTime) * 0.5 + 0.5), 0.5, 0.5, 1.0);
}
`;

const vertexShader = `
void main()	{
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position ,1.0);
}
`;

export default class AnimationTest {
  constructor(canvas) {
    // Variables
    this.canvas = canvas;
    this.stats = false;
    this.elapsedTime = 0;
    this.clock = new THREE.Clock();
    this.uniforms = {
      uViewSize: new THREE.Uniform(new THREE.Vector2(window.innerWidth, window.innerWidth)),
      uTime: new THREE.Uniform(this.elapsedTime)
    }

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

    // Plane
    this.planeGeometry = new THREE.PlaneBufferGeometry(window.innerHeight / 2, window.innerHeight / 2, 10, 10);
    this.planeMaterial = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: this.uniforms,
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
    });
    this.plane = new THREE.Mesh(this.planeGeometry, this.planeMaterial);
    this.scene.add(this.plane);


    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio * 0.5, 2));
    this.renderer.setClearColor(0xffffff, 0);

    this.eventListeners();
    this.getPerformance();
    this.render();
  }

  getPerformance() {
    this.stats = new Stats();
    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( this.stats.dom );
  }


  eventListeners() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }


  render() {
    if(this.stats) {
      this.stats.begin();
    }
    this.elapsedTime = this.clock.getElapsedTime();
    this.uniforms.uTime.value = this.elapsedTime;
    this.renderer.render(this.scene, this.camera);
    this.plane.rotation.z = Math.PI  + this.elapsedTime * 0.2;

    if(this.stats) {
      this.stats.end();
    }

    window.requestAnimationFrame(this.render.bind(this));
  }
}