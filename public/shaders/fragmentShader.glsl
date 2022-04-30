  uniform sampler2D uImage;
  uniform vec2 uAspectRatio;
  uniform float uTime;
  varying vec2 vUv;

	void main(){
    vec2 uv = vUv;
    float c = SmoothNoise2(uv);
    vec4 tex = texture2D(uImage, uv);
    gl_FragColor = tex;
	}