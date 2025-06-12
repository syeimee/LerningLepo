# Shaderをかいてみよう(Hello World編)

# Shaderとは？


Shaderとは、描画を行うプログラムの総称を表します．その内部ではGPUによる並列処理が行われているため、高速な描画を可能にしています．Shaderにはいくつか種類があり、オブジェクトの頂点の座標変換を行う<strong>Vertex Shader</strong>，頂点の個数や関係を変化させてメッシュを変換させる<strong>Geometry Shader</strong>，画面、もしくはオブジェクト表面のピクセル色情報を操作して，色付けや描画を行う<strong>Fragment Shader</strong>などがあります．



本記事では<strong>Fragment Shader</strong>に関して紹介していこうと思います．

# Fragment Shader


先述の通り，Fragment Shaderはピクセルの色情報を扱うShaderです．オブジェクト表面のUV座標や時間等を変数として与えることにより，様々な表現を描画できます．
# Shaderをかいてみよう


前置きが長くなりましたが，早速Shaderを描いていきましょう．
## 導入


今回は，Shaderを書く上でオーソドックスな，OpenGLが提供するGLSL言語を使って実際に描画を行っていきます．
開発環境は何でもいいですがGPUが積んであるPCだと並列処理が高速なのでおすすめです．
自分の環境は

- OS:macOS Mojave 10.14.6
- CPU: 2.3 GHz Intel Core i5
- RAM: 8 GB 2133 MHz LPDDR3
- Intel Iris Plus Graphics 640 1536 MB
です．GPUはIntel Graphicsですが，今回扱うくらいの処理であれば問題なく動きます．(冷却器がとてもうるさくなりますが…)
GLSLを書く環境は，<a href="http://glslsandbox.com/" rel="nofollow noopener" target="_blank">GLSL Sandbox</a>や<a href="https://www.shadertoy.com/" rel="nofollow noopener" target="_blank">ShaderToy</a>のように，ブラウザ上のコードエディタが存在します．


今回は，VS Code上でGLSLをリアルタイムレンダリングできる<strong>GLSL Canvas</strong>を使います．<br>
導入方法は，VS Codeの拡張機能から「glsl-canvas」と検索して，インストールすれば大丈夫です．<br>
実行はMacの場合は[command+shift+p]でコマンドパレットを開いて[&gt; show]と打つと出てくる「Show glslCanvas」を選んでもらうと，表示できます．



<a href="https://camo.qiitausercontent.com/3362f829a097c9d76af0a13f74bbfa914aef4079/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3435343937312f37333135366463622d626639342d376661662d393833652d6233373061313733383863642e706e67" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F454971%2F73156dcb-bf94-7faf-983e-b370a17388cd.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=e89cd077689a8d184d0e502780aad8d1" alt="glsl-canvas" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/454971/73156dcb-bf94-7faf-983e-b370a17388cd.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F454971%2F73156dcb-bf94-7faf-983e-b370a17388cd.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=5fb32d3ce01182fad7c705a3885ac5ed 1x" loading="lazy"></a>

![glsl-canvas](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F454971%2F73156dcb-bf94-7faf-983e-b370a17388cd.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=e89cd077689a8d184d0e502780aad8d1)
<a href="https://camo.qiitausercontent.com/6ff8a9c8ede1518b272fb42337a77874d52d4408/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3435343937312f36646634396665632d613965382d303835392d343939332d3266313362636664363237322e706e67" target="_blank" rel="nofollow noopener"><img width="1552" alt="glsl-canvas-command.png" src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F454971%2F6df49fec-a9e8-0859-4993-2f13bcfd6272.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=50fbb404323caa6f3d4afdd42bd3a700" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/454971/6df49fec-a9e8-0859-4993-2f13bcfd6272.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F454971%2F6df49fec-a9e8-0859-4993-2f13bcfd6272.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=3b5e4785152686326f95f9d6f0beec0f 1x" loading="lazy"></a><br>
<a href="https://camo.qiitausercontent.com/1ea6d7ab51f6c8a3f957cafcc815436a9242b993/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3435343937312f37383735616666332d313261382d633630612d373236332d3930616365323365303432332e706e67" target="_blank" rel="nofollow noopener"><img width="1552" alt="glsl-canvas-show.png" src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F454971%2F7875aff3-12a8-c60a-7263-90ace23e0423.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=719b83aa705573519c8abb218b4aa27a" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/454971/7875aff3-12a8-c60a-7263-90ace23e0423.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F454971%2F7875aff3-12a8-c60a-7263-90ace23e0423.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=855f9e1246d807d595b15ddec6aa6213 1x" loading="lazy"></a>

![glsl-canvas-command.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F454971%2F6df49fec-a9e8-0859-4993-2f13bcfd6272.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=50fbb404323caa6f3d4afdd42bd3a700)


![glsl-canvas-show.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F454971%2F7875aff3-12a8-c60a-7263-90ace23e0423.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=719b83aa705573519c8abb218b4aa27a)
また，拡張機能で<strong>Shader Language Support</strong>を導入すると、シンタックスハイライトの恩恵を得られます．

<a href="https://camo.qiitausercontent.com/52e1d3be11bc5329faadd3ccd46db4e6c085a5ac/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3435343937312f38323763346630652d633165612d643332332d343036312d6230656663613136393738392e706e67" target="_blank" rel="nofollow noopener"><img width="1552" alt="shader-language-support.png" src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F454971%2F827c4f0e-c1ea-d323-4061-b0efca169789.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=4936788ad7074180cf36610b78001ddc" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/454971/827c4f0e-c1ea-d323-4061-b0efca169789.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F454971%2F827c4f0e-c1ea-d323-4061-b0efca169789.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=08e5f175e6668f78d61c8f00efa95bc7 1x" loading="lazy"></a>

![shader-language-support.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F454971%2F827c4f0e-c1ea-d323-4061-b0efca169789.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=4936788ad7074180cf36610b78001ddc)
これで、一通りの環境は揃いました．
## Hello World


言語の世界はとても上下関係が厳しく，新参者はまず挨拶をします．ということで挨拶をしましょう．

<a href="https://camo.qiitausercontent.com/c59834ed7b4a291263c731afc62ae40eeb40f672/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3435343937312f36316336653161632d633336332d303835322d653937322d6363643533663530623336392e706e67" target="_blank" rel="nofollow noopener"><img width="1552" alt="helloworld.png" src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F454971%2F61c6e1ac-c363-0852-e972-ccd53f50b369.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=f735314e999719f895f7b83d2cdbc35b" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/454971/61c6e1ac-c363-0852-e972-ccd53f50b369.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F454971%2F61c6e1ac-c363-0852-e972-ccd53f50b369.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=5d416bf8f030eca9e0ef8e7e7fa7da46 1x" loading="lazy"></a>

![helloworld.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F454971%2F61c6e1ac-c363-0852-e972-ccd53f50b369.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=f735314e999719f895f7b83d2cdbc35b)
はい，すみません，冗談です．流石に文字を反映するのは骨が折れるし，挨拶するだけで骨が折れてしまったら先へ進めません．
## Hello World(改)


挨拶は簡潔な方が好きです．ということで簡単な雛形を使って挨拶しましょう．

<a href="https://camo.qiitausercontent.com/a0d3fdbf573360933d427657818d217338725c17/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3435343937312f31623466323435352d303633312d396638362d653531642d6465626630626135366666372e706e67" target="_blank" rel="nofollow noopener"><img width="1552" alt="helloworld-2.png" src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F454971%2F1b4f2455-0631-9f86-e51d-debf0ba56ff7.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=6004713d0f284d2cea93b01bbde2aa79" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/454971/1b4f2455-0631-9f86-e51d-debf0ba56ff7.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F454971%2F1b4f2455-0631-9f86-e51d-debf0ba56ff7.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=45fced636e0ffb955678be2068f6ef3b 1x" loading="lazy"></a>

![helloworld-2.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F454971%2F1b4f2455-0631-9f86-e51d-debf0ba56ff7.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=6004713d0f284d2cea93b01bbde2aa79)
GLSLには明確なHello Worldを示すものはありませんので，自分なりのHello Worldを表してみました．
順に説明していきます．まずは最初の行

ここでは，浮動小数点演算の精度を定義しています．GLSLでは，ほとんどの演算を浮動小数点計算によって行います．最終的に出力するカラー値も，0~255の`unsigned char`型などではありません0.0~1.0で与えられる`float`型の値になります．精度をあげたいときは`mediump`を`highp`にすればよいですがその分速度は落ちます．逆に速度を挙げたいならば`lowp`にすればいいです．基本的には`mediump`を使います．<br>
`#ifdef GL_ES ... #endif`ですが，GLSLのバージョンが異なる場合があるそうです．OpenGL ES 2.0以降のGLSLのバージョンだとこの記述がある方がいいらしいのですが，正直外したときの挙動は変わっていない気がします．(多方面に怒られそうですが，調べきれませんでしたごめんなさい)









ここでは，主に外部(CPU)から取得できる変数です．`u_resolution`は画像サイズ，`u_mouse`はマウス座標，`u_time`は時間を表します．ここの変数名は，上述したShaderToyなどでは異ります(iResolution等)．これらは毎フレームごとに更新され，例えば`u_time`を使えば時間によって色が変わる、なんてことができます．





<a href="https://camo.qiitausercontent.com/df3821c526d6d8f0fbae091e86ebcf105271f59f/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3435343937312f37356561666663312d376332302d393164392d633135612d3764663630313365306433362e706e67" target="_blank" rel="nofollow noopener"><img width="1508" alt="u_time.png" src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F454971%2F75eaffc1-7c20-91d9-c15a-7df6013e0d36.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=3f37054d4bc248b6be03af4703ad9a25" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/454971/75eaffc1-7c20-91d9-c15a-7df6013e0d36.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F454971%2F75eaffc1-7c20-91d9-c15a-7df6013e0d36.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=e779e88043c09e9e7463528caeab37b5 1x" loading="lazy"></a>

![u_time.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F454971%2F75eaffc1-7c20-91d9-c15a-7df6013e0d36.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=3f37054d4bc248b6be03af4703ad9a25)

やっとmain関数に入って来ました．<br>
GLSLもといShader言語では毎フレームごとにスクリーン上の全ピクセルで同じ関数が走ります．その中で，自分がどのピクセルなのか(ピクセル座標)を表した組み込み変数が`vec4 gl_FragCoord`です．ここではピクセル座標を$-1.\leq x, y \leq 1.$に正規化しています．


GLSLは型に厳しい言語です．そのため，`float`変数や`vec?`変数に対して演算を行うときは型を合わせる必要があります．ここでは，`vec4`型である`gl_FragCoord`から第1，2成分の`xy`を取り出して`vec2`型にし，スカラーである`2.`を掛けているところです．







float定数を記述する際は，整数部もしくは小数部が0である場合はそれを省略することができます．`0.2`は`.2`と省略可能です．



最後です．ここがFragment Shaderで最も必要なところで，最終的なピクセルの色を決定します．与えられる値は$0. &lt; r,g,b,\alpha &lt; 1.$で,`vec4`型のそれぞれの成分ごとに割り当てた値を組み込み変数`vec4 gl_FragColor`に格納することで色を反映します．今回は$r$(red)にピクセル座標のx成分を$g$(green)にy成分を与えています．


# まとめ


前半のおふざけが過ぎてしまって長くなってしまいました．今回は導入と，サンプルコードを使ったGLSLの紹介を行いました．VS Codeを使ってGLSLを描いていましたが，ShaderToyやGLSL Sandbox等で描いてそのまま投稿，なんてのもいいかもしれませんし，この記事で少しでも興味を持っていただけたら，そちらのサイトへ飛んで素晴らしい作品を眺めつつ，暖を取る(Shaderは処理が重いのでよくPCが熱くなります)のも寒くなる冬にはいいかもしれませんね．<br>
続きはまた後日に描いていこうと思います．

# 参考


<a href="https://www.shadertoy.com/" rel="nofollow noopener" target="_blank">ShaderToy</a><br>
<a href="http://glslsandbox.com/" rel="nofollow noopener" target="_blank">GLSL Sandbox</a><br>
<a href="https://thebookofshaders.com/?lan=jp" rel="nofollow noopener" target="_blank">The Book of Shaders</a> Shader関係の教科書的なもの<br>
<a href="https://qiita.com/doxas/items/5a7b6dedff4bc2ce1586" id="reference-86e1051ab262863d413a">GLSL で暖を取るための準備をしよう！ GLSL お役立ちマニュアル</a> GLSLについてよりわかりやすく説明してくださっています

