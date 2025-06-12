varying vec2 vUv;

float random(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

float noise(vec2 uv) {
    vec2 p = floor(uv);
    vec2 f = fract(uv);
    float a = random(p);
    float b = random(p + vec2(1.0, 0.0));
    float c = random(p + vec2(0.0, 1.0));
    float d = random(p + vec2(1.0, 1.0));
    
    vec2 u = f * f * (3.0 - 2.0 * f);
    
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
    float pattern = noise(vUv * 10.0); // ノイズを生成
    vec3 baseColor = vec3(0.8, 0.6, 0.4); // 毛の基本色
    vec3 highlightColor = vec3(1.0, 1.0, 1.0); // ハイライト色
    
    // 毛の質感を生成
    vec3 color = mix(baseColor, highlightColor, pattern);
    gl_FragColor = vec4(color, 1.0);
}
