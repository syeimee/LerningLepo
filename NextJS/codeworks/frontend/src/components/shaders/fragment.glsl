uniform vec3 uColor;
// uniform sampler2D uTexture;

varying float vElevation;
varying vec2 vUv;

void main() {
    // vec3型のuColorをvec4に変換
    vec4 color = vec4(uColor, 1.0);
    
    // テクスチャの代わりにuColorを使用
    // vec4 textureColor = texture2D(uTexture, vUv);
    
    // 色にvElevationに基づいた変調を適用
    color.rgb *= vElevation * 2.5 + 0.7;
    
    gl_FragColor = color;
}