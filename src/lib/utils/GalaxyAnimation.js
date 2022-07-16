import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'stats.js';

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vColour;

  void main() {

    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 2.0);

    vec3 colour = mix(vec3(0.0), vColour, strength);
    gl_FragColor = vec4(colour, 1.0);
  }
`;

const vertexShader = `
  uniform float uTime;
  uniform float uSize;
  varying vec2 vUv;
  varying vec3 vColour;

  attribute float aScale;
  attribute vec3 aRandomness;

  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceToCenter = length(modelPosition.xz);
    float offsetAngle = (1.0 / distanceToCenter) * uTime * 0.2;

    angle += offsetAngle;

    modelPosition.x = cos(angle) * distanceToCenter;
    modelPosition.z = sin(angle) * distanceToCenter;

    modelPosition.xyz += aRandomness;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    vUv = uv;

    gl_Position = projectedPosition;

    gl_PointSize = uSize * aScale;
    gl_PointSize *= (1.0 / - viewPosition.z);


    vColour = color;
  }

`;

export default class GalaxyAnimation {
  constructor(canvas) {
    // Variables
    this.canvas = canvas;
    this.stats = false;
    this.elapsedTime = 0;
    this.clock = new THREE.Clock();
    this.parameters = {
      count: 100000,
      size: 0.005,
      radius: 2,
      branches: 2,
      spin: 3,
      randomness: 0.5,
      randomnessPower: 3,
      insideColour: '#E24A42',
      outsideColour: '#283146'
    };
    this.pointGeometry = null;
    this.pointMaterial = null;
    this.scene = null;


    // Scene
    this.scene = new THREE.Scene();


    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      // alpha: true
    });

    // Camera
    this.cameraPos = 600;
    this.fieldOfView = 70;
    this.nearPlane = 0.1;
    this.farPlane = 1000;

    this.camera = new THREE.PerspectiveCamera( this.fieldOfView, window.innerWidth / window.innerHeight, this.nearPlane, this.farPlane );
    this.camera.position.z = -20;
    this.camera.fov = 2 * Math.atan((window.innerHeight / 2) / this.cameraPos ) * (180 / Math.PI);
    this.scene.add(this.camera);

    if(this.pointGeometry !== null) {
      this.pointGeometry.dispose();
      this.pointMaterial.dispose();
      this.scene.remove(this.points);
    }



    // point
    this.pointGeometry = new THREE.BufferGeometry();

    this.positions = new Float32Array(this.parameters.count * 3);
    this.colours = new Float32Array(this.parameters.count * 3);
    this.scales = new Float32Array(this.parameters.count * 1);
    this.randomness = new Float32Array(this.parameters.count * 3);

    this.colourInside = new THREE.Color(this.parameters.insideColour);
    this.colourOutside = new THREE.Color(this.parameters.outsideColour);


    for (let i = 0; i < this.parameters.count; i++) {
      const i3 = i * 3;

      const radius = Math.random() * this.parameters.radius;
      const spinAngle = radius * this.parameters.spin;
      const branchAngle = (i % this.parameters.branches) / this.parameters.branches * Math.PI * 2;

      this.positions[i3] = Math.cos(branchAngle + spinAngle) * radius;
      this.positions[i3 + 1] = 0;
      this.positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius;

      const randomX = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius;
      const randomY = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius;
      const randomZ = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius;

      this.randomness[i3] = randomX;
      this.randomness[i3 + 1] = randomY;
      this.randomness[i3 + 2] = randomZ;

      const mixColour = this.colourInside.clone();

      // depending on the value of radius / this.parameters.radius if greater that 0.5 the
      // set the colour to be close to the outside colour else the inside colour

      mixColour.lerp(this.colourOutside, radius / this.parameters.radius);

      this.colours[i3] = mixColour.r;
      this.colours[i3 + 1] = mixColour.g;
      this.colours[i3 + 2] = mixColour.b;

      this.scales[i] = Math.random();
    }

    this.pointGeometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.pointGeometry.setAttribute('color', new THREE.BufferAttribute(this.colours, 3));
    this.pointGeometry.setAttribute('aScale', new THREE.BufferAttribute(this.scales, 1));
    this.pointGeometry.setAttribute('aRandomness', new THREE.BufferAttribute(this.randomness, 3));

    this.pointMaterial = new THREE.ShaderMaterial({
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 8 * this.renderer.getPixelRatio() }
      }
    });

    this.points = new THREE.Points(this.pointGeometry, this.pointMaterial);


    this.scene.add(this.points);


    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // this.renderer.setClearColor(0xffffff, 0);

    this.controls = new OrbitControls(this.camera, this.canvas)
    this.controls.enableDamping = true


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
    this.pointMaterial.uniforms.uTime.value = this.elapsedTime;

    this.renderer.render(this.scene, this.camera);


    if(this.stats) {
      this.stats.end();
    }

    window.requestAnimationFrame(this.render.bind(this));
  }
}