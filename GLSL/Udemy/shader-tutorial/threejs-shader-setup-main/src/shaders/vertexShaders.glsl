uniform vec2 uFrequency;
uniform float uTime;

varying float vElevation;
varying vec2 vUv;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    /*
     Tsinθのθの値が大きくなることで、振動数が増える
     Tの値が大きくなることで振幅が大きくなる
    */
    // modelPosition.z += sin(modelPosition.x * uFrequency.x + uTime) * 0.1;
    // modelPosition.z += sin(modelPosition.y * uFrequency.y + uTime) * 0.1;

    float elevation = sin(modelPosition.x * uFrequency.x + uTime) * 0.1;
    elevation += sin(modelPosition.y * uFrequency.y + uTime) * 0.1;
    modelPosition.z += elevation;
     
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;

    vUv = uv;
    vElevation = elevation;
}