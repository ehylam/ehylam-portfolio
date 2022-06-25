import * as THREE from 'three';
import Stats from 'stats.js';

const noise = `
float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

float noise(vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec3 uColourOne;
uniform vec3 uColourTwo;
uniform vec3 uAccent;
varying vec3 vPosition;

${noise}

mat2 rotate2D(float angle) {
  return mat2(
    cos(angle), -sin(angle),
    sin(angle), cos(angle)
  );
}


float lines(vec2 uv, float offset) {
  return smoothstep(
    0.0, 0.5 + offset * 0.5,
    0.5 * abs(sin(uv.x * 30.0) + offset * 2.0)
  );
}

void main()	{

  float n = noise(vPosition + (uTime * 0.7));

  vec2 baseUV = rotate2D(n) * vPosition.xy * 0.25;
  float basePattern = lines(baseUV, 0.5);
  float basePattern2 = lines(baseUV, 0.1);

  vec3 baseColour = mix(uColourTwo/255.0, uColourOne/255.0, basePattern);
  vec3 secondBaseColour = mix(baseColour, uAccent/255.0, basePattern2);

  gl_FragColor = vec4(secondBaseColour, 1.0);
}
`;

const vertexShader = `
varying vec3 vPosition;

void main()	{
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position ,1.0);
}
`;

export default class AnimationTest {
  constructor(canvas, colourOne, colourTwo, accent) {
    // Variables
    this.canvas = canvas;
    this.stats = false;
    this.elapsedTime = 0;
    this.clock = new THREE.Clock();
    this.uniforms = {
      uViewSize: new THREE.Uniform(new THREE.Vector2(window.innerWidth, window.innerWidth)),
      uTime: new THREE.Uniform(this.elapsedTime),
      uColourOne: new THREE.Uniform(new THREE.Vector3(...colourOne)),
      uColourTwo: new THREE.Uniform(new THREE.Vector3(...colourTwo)),
      uAccent: new THREE.Uniform(new THREE.Vector3(...accent))
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

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true
    });
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio * 0.5, 2));
    this.renderer.setClearColor(0xffffff, 0);

    this.addObjects();
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

  addObjects() {
    // sphere
    this.sphereGeometry = new THREE.SphereBufferGeometry(3.5, 32, 32);
    this.sphereMaterial = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: this.uniforms,
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
    });
    this.sphere = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial);
    this.sphere.scale.set(window.innerWidth, window.innerHeight, 1);
    this.scene.add(this.sphere);
  }


  render() {
    if(this.stats) {
      this.stats.begin();
    }
    this.elapsedTime = this.clock.getElapsedTime();
    this.uniforms.uTime.value = this.elapsedTime;
    this.renderer.render(this.scene, this.camera);
    // this.plane.rotation.z = Math.PI  + this.elapsedTime * 0.2;
    // this.plane.rotation.y = Math.PI  + this.elapsedTime * 0.2;

    if(this.stats) {
      this.stats.end();
    }

    window.requestAnimationFrame(this.render.bind(this));
  }
}