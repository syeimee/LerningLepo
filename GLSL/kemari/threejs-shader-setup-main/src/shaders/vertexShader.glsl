varying vec2 vUv;

void main(){
    vUv = uv; //uv座標をvarying uvとして取得

    vec4 modelViewPosition  = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;
}