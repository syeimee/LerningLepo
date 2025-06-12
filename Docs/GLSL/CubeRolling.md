
# Three.jsで立方体を転がすサンプルを作ろう

- WebGL

- three.js

- 三角関数

three.jsはjavascriptで簡単に3D表現を行うためのライブラリです。<br>
今回はこれを使って、立方体を転がすアニメーションを作っていきます。

※説明の都合上<strong>GIFアニメを多用する</strong>ためご注意ください。

# 作成したもの


<a href="https://camo.qiitausercontent.com/a5f74d65fd0d01c52cc07eef8a6be4fdd25cec51/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f3130353332312f30346433346631612d313363642d313361632d323438652d3065616232336165323531622e676966" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2F04d34f1a-13cd-13ac-248e-0eab23ae251b.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=5681d38ac8134445eb2636f4ba6b7db0" alt="cube13-2.gif" data-canonical-src="https://qiita-image-store.s3.amazonaws.com/0/105321/04d34f1a-13cd-13ac-248e-0eab23ae251b.gif" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2F04d34f1a-13cd-13ac-248e-0eab23ae251b.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=bf425a7694498a971cc97e5e812049cc 1x" loading="lazy"></a>

![cube13-2.gif](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2F04d34f1a-13cd-13ac-248e-0eab23ae251b.gif?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=5681d38ac8134445eb2636f4ba6b7db0)
<qiita-embed-ogp src="https://codepen.io/masaoblue/pen/ZXGZwG?editors=1111"></qiita-embed-ogp>
# はじめに


## 使用するライブラリ



- three.js(r86)

- OrbitControls.js(three.jsのプラグイン)


CDNには上がってなかったのでGistから直接参照


- CDNには上がってなかったのでGistから直接参照

- es6-tween(v3.6.0)

# 1. 初期設定


以下の記事を参考にThree.jsの初期設定を行います。<br>
<a href="http://qiita.com/kurokuma/items/0def9a7092e9ce011653" id="reference-c1e959277a6d0361ad0e">【Qiita】three.jsで3Dを作りたい！</a>


以降は、今回追加する設定です。
## グリッド配置


cubeのサイズに合わせてグリッド(床部分)を表示します。

## 面ごとに色を変える


回転が分かるよう、立方体の対面ごとに違う色をつけます。

## 軸線を表示


回転や移動方向を明確にするため、cubeとgridに軸線を表示します。

## TWEEN.autoPlay(true)


es6-tweenのアニメーションを有効にするため`TWEEN.autoPlay(true)`を実行します。


## ここまでの成果物


<a href="https://camo.qiitausercontent.com/2b3ed5194abfe1954c5b6a0f5f10a4fc0a2dc7d0/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f3130353332312f34323062656439652d363038362d666632372d333061632d6432336434306432313065382e706e67" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2F420bed9e-6086-ff27-30ac-d23d40d210e8.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=1c1858481377254f3b2475a6f619ce2a" alt="2017-9-17_16-57-22_00.png" data-canonical-src="https://qiita-image-store.s3.amazonaws.com/0/105321/420bed9e-6086-ff27-30ac-d23d40d210e8.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2F420bed9e-6086-ff27-30ac-d23d40d210e8.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=170fcece3e7abcaf95da584d322d2f1f 1x" loading="lazy"></a>

![2017-9-17_16-57-22_00.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2F420bed9e-6086-ff27-30ac-d23d40d210e8.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=1c1858481377254f3b2475a6f619ce2a)
<qiita-embed-ogp src="https://codepen.io/masaoblue/pen/EwVvxz?editors=1111"></qiita-embed-ogp>
# 2. tweenを使った単純な移動と回転


まずは、tweenを使用して単純な横移動と回転を行ってみます。
## 横(x軸)方向の移動



## Quaternionによる回転


three.jsでは回転の制御に「Rotation」と「Quaternion」が使用できます。<br>
Rotationの場合、三軸(x, y, z)全てについて回転を加えた時に予期せぬ動きとなるため、<br>
今回はQuaternionを使用します。<br>
【参考】<a href="http://qiita.com/Guvalif/items/ab0c847390adbb8e4a06" id="reference-cfa86dcc064d21d68617">【THREE.jsの基礎】Quaternionでローカル座標の回転を取り扱う</a>





### 補足



three.jsでオブジェクトを回転させる場合、<br>
<strong>回転軸を奥に向けて時計回りが「プラスの回転」</strong>となります。


<a href="https://camo.qiitausercontent.com/4a7434f46656a2f6d3839a063c9689c06f4684ab/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f3130353332312f36366635333061662d656238332d316536342d656164612d3464333131623862633766652e706e67" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2F66f530af-eb83-1e64-eada-4d311b8bc7fe.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=0dc6476962fd8363f820df2e09d64256" alt="2017-9-16_15-41-45_00.png" data-canonical-src="https://qiita-image-store.s3.amazonaws.com/0/105321/66f530af-eb83-1e64-eada-4d311b8bc7fe.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2F66f530af-eb83-1e64-eada-4d311b8bc7fe.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=9b0cc65748857972b976bca3f340bc47 1x" loading="lazy"></a>

![2017-9-16_15-41-45_00.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2F66f530af-eb83-1e64-eada-4d311b8bc7fe.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=0dc6476962fd8363f820df2e09d64256)
このため、例えば次の2つの実行結果は同じです。

## ここまでの成果物


<a href="https://camo.qiitausercontent.com/f7568d8d0562f45ab7f896e50f261425118dfa3d/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f3130353332312f38663635363130332d366632632d636366372d316430622d3139323464333066313332302e676966" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2F8f656103-6f2c-ccf7-1d0b-1924d30f1320.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=5a092d6a72dea07f57745137ff53df8d" alt="cube7.gif" data-canonical-src="https://qiita-image-store.s3.amazonaws.com/0/105321/8f656103-6f2c-ccf7-1d0b-1924d30f1320.gif" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2F8f656103-6f2c-ccf7-1d0b-1924d30f1320.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=b5460a82d1ad9be1f4c59ca8a77fb2a9 1x" loading="lazy"></a>

![cube7.gif](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2F8f656103-6f2c-ccf7-1d0b-1924d30f1320.gif?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=5a092d6a72dea07f57745137ff53df8d)
<qiita-embed-ogp src="https://codepen.io/masaoblue/pen/GMprLN"></qiita-embed-ogp>
# 3. もっと自然な動きにしたい


一応動いているように見えますが、床から下にはみ出しているなど少し不自然です。<br>
これを修正するため、まずは理想の動作を考えます。

## 理想の動作


面の上で立方体を綺麗に転がした場合、<br>
ある頂点を基準に回転するような動きになるはずです。

<a href="https://camo.qiitausercontent.com/e1b28e7dce09616ca197b742b0b9d0b3c460a48e/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f3130353332312f38383963303065362d336265632d366636322d346131612d6361656238626137376562642e706e67" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2F889c00e6-3bec-6f62-4a1a-caeb8ba77ebd.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=87989b89a16550b045b53747e3d7534e" alt="2017-9-16_16-7-47_00.png" data-canonical-src="https://qiita-image-store.s3.amazonaws.com/0/105321/889c00e6-3bec-6f62-4a1a-caeb8ba77ebd.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2F889c00e6-3bec-6f62-4a1a-caeb8ba77ebd.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=762da8d102ead8d32807fd82a30fb78a 1x" loading="lazy"></a>

![2017-9-16_16-7-47_00.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2F889c00e6-3bec-6f62-4a1a-caeb8ba77ebd.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=87989b89a16550b045b53747e3d7534e)
これを見ると、cubeの中心位置は円弧を描くように移動することが分かります。
しかし、現状はオブジェクトの高さを変更していないため、<br>
そこに理想との乖離がある状態だと想定できます。

<a href="https://camo.qiitausercontent.com/524c03129e6c2000b9777e766e1683482ad0fa0a/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f3130353332312f65653838656464312d356463662d373563312d303266642d3365333034666633323036312e706e67" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2Fee88edd1-5dcf-75c1-02fd-3e304ff32061.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=def9c4834c70d1c708853578758ab67b" alt="2017-9-16_16-6-51_00.png" data-canonical-src="https://qiita-image-store.s3.amazonaws.com/0/105321/ee88edd1-5dcf-75c1-02fd-3e304ff32061.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2Fee88edd1-5dcf-75c1-02fd-3e304ff32061.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=2dd81543a47f7b3f77b2215969c351b3 1x" loading="lazy"></a>

![2017-9-16_16-6-51_00.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2Fee88edd1-5dcf-75c1-02fd-3e304ff32061.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=def9c4834c70d1c708853578758ab67b)
では、この問題を解決していきましょう。
## 高さの算出


三角関数を使い、オブジェクトが移動する時の高さを求めていきます。<br>
そんなの覚えてない！という方はこちらを見て一緒に思い出しましょう。(全く覚えてなかった)<br>
【参考】<a href="http://kou.benesse.co.jp/nigate/math/a14m0313.html" rel="nofollow noopener" target="_blank">進研ゼミ高校講座 sin，cos，tanの値の覚え方</a>



まず、角度θにおける高さをyとした時、sinθの定義から以下の式を算出できます。
<a href="https://camo.qiitausercontent.com/d8ed7e7d1b03c5ab8d98da475b47a2373cfafb35/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f3130353332312f62366365613263622d316636612d666364302d666266662d6563316434303430333935632e706e67" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2Fb6cea2cb-1f6a-fcd0-fbff-ec1d4040395c.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=3a532d695ce24e721f8b0580219b1a8e" alt="2017-9-16_16-12-52_00.png" data-canonical-src="https://qiita-image-store.s3.amazonaws.com/0/105321/b6cea2cb-1f6a-fcd0-fbff-ec1d4040395c.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2Fb6cea2cb-1f6a-fcd0-fbff-ec1d4040395c.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=d97f43eb21197ef919b3488cbd6f2b48 1x" loading="lazy"></a>

![2017-9-16_16-12-52_00.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2Fb6cea2cb-1f6a-fcd0-fbff-ec1d4040395c.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=3a532d695ce24e721f8b0580219b1a8e)
## 移動距離の算出


高さと同様、実は横方向の移動距離もズレてしまっています。<br>
これは<strong>角度θが1°増加した時、横方向の移動距離が一定ではない</strong>ことが原因です。


θの変化に合わせて適切に移動させるため、移動距離をxと置き<br>
cosθの定義を使って以下を算出しましょう。

<a href="https://camo.qiitausercontent.com/cc0ac305f2f617c01ab6a89455238ea90a0ca3f5/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f3130353332312f63303433636635612d663535372d303863662d366166382d3734613762333436646366652e706e67" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2Fc043cf5a-f557-08cf-6af8-74a7b346dcfe.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=37de6f720c3736bc68e25356bdc4481b" alt="2017-9-17_17-13-29_00.png" data-canonical-src="https://qiita-image-store.s3.amazonaws.com/0/105321/c043cf5a-f557-08cf-6af8-74a7b346dcfe.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2Fc043cf5a-f557-08cf-6af8-74a7b346dcfe.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=5b164a9c54f3e36f1eabaf9e97dcf3ff 1x" loading="lazy"></a>

![2017-9-17_17-13-29_00.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2Fc043cf5a-f557-08cf-6af8-74a7b346dcfe.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=37de6f720c3736bc68e25356bdc4481b)
## 移動動作を実装する


上記で求めた式を元に、移動の動きを実装してみたものがこちらです。

## ここまでの成果物


<a href="https://camo.qiitausercontent.com/2fd782293a26f300d413cd44e6d90a754a6683d0/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f3130353332312f32363033353838352d323664622d373637352d313566622d6661336235393333356639322e676966" target="_blank" rel="nofollow noopener"><img src="https://qiita-image-store.s3.amazonaws.com/0/105321/26035885-26db-7675-15fb-fa3b59335f92.gif" alt="cube10.gif" data-canonical-src="https://qiita-image-store.s3.amazonaws.com/0/105321/26035885-26db-7675-15fb-fa3b59335f92.gif" loading="lazy"></a><br>
(色が変に残っているのはgifアニメの都合です)

![cube10.gif](https://qiita-image-store.s3.amazonaws.com/0/105321/26035885-26db-7675-15fb-fa3b59335f92.gif)

<qiita-embed-ogp src="https://codepen.io/masaoblue/pen/PJPKWJ"></qiita-embed-ogp>
# 4. 連続動作させるための調整


これまでに、1方向に回転し続けることができるようになりました。<br>
以降はもっと色んな方向の回転に挑戦してみます。

## x軸で回転した後、z軸で回転させたい


例えば一度右に移動し、次は手前に転がしたいという場合、単純に考えると

- x方向に移動する時はz軸で回転
- z方向に移動する時はx軸で回転
と書いておけば良さそうです。<br>
まずはこれを実装してみましょう。


しかし、これだけでは以下のような結果になります。
<a href="https://camo.qiitausercontent.com/80c385044d679bc9b6c912d6694b686dc215c413/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f3130353332312f39373166636632392d633665322d376562362d373832382d3734383636393864663162352e676966" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2F971fcf29-c6e2-7eb6-7828-7486698df1b5.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=f3a35a80a0b237dac28f29d0f54709fe" alt="cube2.gif" data-canonical-src="https://qiita-image-store.s3.amazonaws.com/0/105321/971fcf29-c6e2-7eb6-7828-7486698df1b5.gif" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2F971fcf29-c6e2-7eb6-7828-7486698df1b5.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=bd1b64f43fdbcbeb1704b9d95250d916 1x" loading="lazy"></a>

![cube2.gif](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2F971fcf29-c6e2-7eb6-7828-7486698df1b5.gif?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=f3a35a80a0b237dac28f29d0f54709fe)
このことから、cubeオブジェクトに回転を加えると、「空間全体の軸(world軸)」ではなく<br>
<strong>「cubeオブジェクトのx軸(local軸)」を使った回転が行われる</strong>という事が分かりました。


## ローカル回転軸の計算


今回は、解決方法として「cubeオブジェクトの中心から空間全体のx方向に1移動したworld座標」を<br>
「cubeオブジェクトのlocal座標に変換する」という方法を使います。<br>
(もっと素直な方法があれば教えてください。)



上記では`worldToLocal`を使っていますが、何度も回転させていくと<br>
`[1, 0, 0]` や `[0, 0, -1]` のような綺麗な値ではなく<br>
`[1, 0.49999999, 0]` という値になってしまいます。<br>
(使い方が悪いのか、単純に不具合なのかは不明です)







そのため、<strong>絶対値が1になっている方向が正しい</strong>として計算を進めると、<br>
一応上手く状態になりました。


## 回転方向を計算する


回転軸を正常に取るとこのような動きになりました。
<a href="https://camo.qiitausercontent.com/6dd9d7f3f65f28481ba8df03a6b2a4a1369ec7f7/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f3130353332312f39373930366135662d633561312d623561332d356464662d3833393732353337626534612e676966" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2F97906a5f-c5a1-b5a3-5ddf-83972537be4a.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=b169411fc89cb1e6696356957fa87391" alt="cube6-2.gif" data-canonical-src="https://qiita-image-store.s3.amazonaws.com/0/105321/97906a5f-c5a1-b5a3-5ddf-83972537be4a.gif" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2F97906a5f-c5a1-b5a3-5ddf-83972537be4a.gif?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=6159c0575dd1150ad4e56e96cc945308 1x" loading="lazy"></a>

![cube6-2.gif](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2F97906a5f-c5a1-b5a3-5ddf-83972537be4a.gif?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=b169411fc89cb1e6696356957fa87391)
逆回転してしまっている部分もありますが、ここまで来ればあと少し。<br>
状況を整理すると、以下の動きになっているようです。


- x方向に移動する際、プラス移動(→)の時は正常で、マイナス移動(←)するときに逆回転になっている

- z方向に移動する際、プラス移動(↓)する時が逆回転で、マイナス移動(↑)する時は正常に動いている

移動方向によって逆回転するタイミングが異なっていますが、<br>
これは回転軸の関係性による事象です。

<a href="https://camo.qiitausercontent.com/8b563cae8281999d362c032ff427b06edf81d224/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f3130353332312f65306431633162332d623337382d616630642d313534352d3163333837636232313630652e706e67" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2Fe0d1c1b3-b378-af0d-1545-1c387cb2160e.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=2fafe09c7de1eb1e8e676e74cca016a3" alt="2017-9-17_7-58-4_00.png" data-canonical-src="https://qiita-image-store.s3.amazonaws.com/0/105321/e0d1c1b3-b378-af0d-1545-1c387cb2160e.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2Fe0d1c1b3-b378-af0d-1545-1c387cb2160e.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=c1810fda20bc79f0fe446e41e0ba2a51 1x" loading="lazy"></a>

![2017-9-17_7-58-4_00.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.amazonaws.com%2F0%2F105321%2Fe0d1c1b3-b378-af0d-1545-1c387cb2160e.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=2fafe09c7de1eb1e8e676e74cca016a3)
これに対処するため、以下の処理を加えます。

## ここまでの成果物


<a href="https://camo.qiitausercontent.com/8e4bccf3fbf7446d10ee9dcd3f39dd516b4b7f69/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e616d617a6f6e6177732e636f6d2f302f3130353332312f64646435383736332d306264642d333138332d643636352d3934383432653332663233362e676966" target="_blank" rel="nofollow noopener"><img src="https://qiita-image-store.s3.amazonaws.com/0/105321/ddd58763-0bdd-3183-d665-94842e32f236.gif" alt="cube11.gif" data-canonical-src="https://qiita-image-store.s3.amazonaws.com/0/105321/ddd58763-0bdd-3183-d665-94842e32f236.gif" loading="lazy"></a><br>
(色が変に残っているのはgifアニメの都合です)

![cube11.gif](https://qiita-image-store.s3.amazonaws.com/0/105321/ddd58763-0bdd-3183-d665-94842e32f236.gif)

<qiita-embed-ogp src="https://codepen.io/masaoblue/pen/eGpgLL"></qiita-embed-ogp>
やっとまともに動くようになりましたね！
# 5. おまけ


この後cubeを複数個配置したり、端まで転がった時に<br>
Gridからはみ出さないよう設定したりしたものが<a href="https://codepen.io/masaoblue/pen/ZXGZwG?editors=1111" rel="nofollow noopener" target="_blank">冒頭のURL</a>の実装です。 


アニメーションをループさせるのにsetIntervalを使用した所、<br>
<strong>Chromeで別タブを開いて戻ってきた時に動作がおかしくなる不具合</strong>が発生しています。


恐らく<a href="https://github.com/tweenjs/tween.js/blob/master/examples/08_repeat.html" rel="nofollow noopener" target="_blank">tween.repeat</a>を使うべきなのかなぁと思いますが、<br>
今は修正する元気がないのでこのままにしておきます。


# さいごに


3D空間をいじるのは非常に楽しいです。<br>
でも一度詰まると対応方法が分からず<br>
数日返ってこれなくなることがあるので注意が必要です。


## 余談


この記事を書くにあたり、<a href="https://www.microsoft.com/ja-jp/store/d/office-365-solo/CFQ7TTC0K5BC/0004?icid=JP_Office_LinkNav_1_O365_NA_NA_17052017" rel="nofollow noopener" target="_blank">Microsoft Office365 Solo</a>を契約してPowerPoint2016で製図してみました。<br>
図形の合成で半円を作れたり、標準図形の「円弧」が汎用的だったりと最高に便利だったので、<br>
皆さんもぜひ使ってみてください。


