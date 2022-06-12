const noise = `
float N21(vec2 p) {
  return fract(sin(p.x * 110. + p.y * 5834.) * 43758.);
}

float SmoothNoise(vec2 uv) {
  vec2 lv = fract(uv);
  vec2 id = floor(uv);

  lv = lv * lv * (3. - 2. * lv);

  float bl = N21(id);
  float br = N21(id + vec2(1. ,0.));
  float b = mix(bl, br, lv.x);

  float tl = N21(id + vec2(0. ,1.));
  float tr = N21(id + vec2(1. ,1.));
  float t = mix(tl, tr, lv.x);

  return mix(b, t, lv.y);
}

float SmoothNoise2(vec2 uv) {
  float c = SmoothNoise(uv * 4.);
  c += SmoothNoise(uv * 8.) * .5;
  // c += SmoothNoise(uv * 16.) * .25;
  // c += SmoothNoise(uv * 32.) * .125;

  return c /= 1.5;
}

`;

export default noise;