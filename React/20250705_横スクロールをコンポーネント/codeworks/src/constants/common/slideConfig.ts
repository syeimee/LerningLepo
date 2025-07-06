export const SLIDE_CONFIG = {
  wheelSensitivity: 0.01,//ホイールを動かす速さ
  touchSensitivity: 0.01,//スワイプで動かす速さ
  momentumMultipleier: 2,//スワイプ後の感性の速さ
  smoothing: 0.1,//スライドの動きの滑らかさ
  slideLerp: 0.075,//スライド位置の補完速度
  distortionDecay: 0.95,//歪みの減衰率
  maxDistortion: 2.5,//最大の歪みの強さ
  distortionSensitivity: 0.15,//速さに応じた歪みの増加感度
  distortionSmoothing: 0.075,//歪みの補完
  slideWidth: 3.0,
  slideHeight: 1.5,
  slideGap: 0.1,
  slideCount: 5,
  imageCount: 5, // 通常は `count` と揃える
  get totalWidth():number {
    return this.slideCount * (this.slideWidth + this.slideGap);
  },
  get unit():number {
    return this.slideWidth + this.slideGap;
  }
}

