# GLSLについて学ぶ
### Shaderとは
<img src="./img/aboutShader.png">
GLSLはシェーダー言語であり、シェーダーをGPUに渡すことで表現を行うことができる

### シェーダーまでの流れ
#### # GLSL
 - VertexShader　頂点を定める
 - FragmentShader 着色を行う
### シェーダーを書くためのファイルを準備
---
- ディレクトリ構造
<img src="./img/dir.png">

---
- ファイルのimport

`index.js`

```js
import vertexShader from "./shader/vertexShaders";
import fragmentShader from "./shader/fragmentShaders";
```

---
- ファイルの読み込み

従来はマテリアルとジオメトリをメッシュとして組み合わせて表現をしていた。

```js
// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

// Material
const material = new THREE.MeshBasicMaterial();

// Mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
```

GLSLを記述する際には、以下のように変更
RawShaderMaterial（生のシェーダーマテリアル）

```js
// Material
const material = new THREE.RawShaderMaterial();
```
さらにプロパティを指定して、
```js
// Material
const material = new THREE.RawShaderMaterial({
    vertexShader: vertexShader, //vertexShaderプロパティ: vertexShader.glsl
    fragmentShader: fragmentShader //fragmentShaderプロパティ: fragmentShader.glsl
});
```
※ 公式Doc: https://threejs.org/docs/#api/en/materials/RawShaderMaterial


### 実際にGLSLを書いてみる

- おすすめの拡張機能
シンタックスとかできる
<img src="./img/kakucho.png">

---
- vertexShader.glsl

頂点情報の記述
```glsl
uniform mat4 projectionMatrix;　//カメラの投影領域を定義(near: 近く　far:遠く)
uniform mat4 viewMatrix;　// カメラの位置・方向
uniform mat4 modelMatrix; //立体の大きさ・位置

attribute vec3 position;　//x, y, z座標を定義

void main(){
    //それぞれの行列を掛け合わせることで座標変換（3Dをブラウザ描画用の2Dに変換）
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
```

- fragmentShader.glsl

着色情報の記述

```glsl
precision mediump float;//データをどのくらい精密に扱うかを定義

void main(){
    /*
    * ４次元ベクトルを定義
    * vec4(r,g,b,透明度)
    */

    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
```
ただ、これだけだと透明度を変えてもほぼ変化しないので、
`transparent: true`にする必要がある
```js
// Material
const material = new THREE.RawShaderMaterial({
    vertexShader: vertexShader, //vertexShaderプロパティ: vertexShader.glsl
    fragmentShader: fragmentShader, //fragmentShaderプロパティ: fragmentShader.glsl
    transparent: true //透明度を有効
});
```
平面の裏側にも着色を施す場合は、
`side: THREE.DoubleSide`を記述

```js
// Material
const material = new THREE.RawShaderMaterial({
    vertexShader: vertexShader, //vertexShaderプロパティ: vertexShader.glsl
    fragmentShader: fragmentShader, //fragmentShaderプロパティ: fragmentShader.glsl
    transparent: true, //透明度を有効
    side: THREE.DoubleSide //裏側まで着色
});
```
ポリゴンを有効にするには、
`wireframe: true`

```js
// Material
const material = new THREE.RawShaderMaterial({
    vertexShader: vertexShader, //vertexShaderプロパティ: vertexShader.glsl
    fragmentShader: fragmentShader, //fragmentShaderプロパティ: fragmentShader.glsl
    transparent: true, //透明度を有効
    side: THREE.DoubleSide, //裏側まで着色
    wireframe: true //ポリゴン
});
```

### GLSL言語の基本
- 型の指定
```glsl
float a = 1.0; //小数
int a = 1; //整数

vec2 myVec2 = vec2(1.0, 0.5); // 2つの浮動小数点数で初期化
vec3 myVec3 = vec3(1.0, 0.5, 0.3); // 3つの浮動小数点数で初期化
```

- 修飾子
1. attribute: 頂点情報などを入れる
2. uniform: グローバル変数を入れる（共通して使われる変数）
3. varing: VertexShaderからFragmentShaderに変数を渡すときに使う

例
```glsl
uniform mat4 projectionMatrix;　
uniform mat4 viewMatrix;　
uniform mat4 modelMatrix; 

attribute vec3 position;　
```