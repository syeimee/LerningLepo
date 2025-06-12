## 全体像


まずはGitとは何かをざっくり分かって貰った後で、VSCode上での操作を行って頂きます。<br>
Windowsでの説明を行いますが、Macの方は適宜読み替えて貰えれば大丈夫です。<br>
なんでWindowsかというと、これを教えた時の会社の開発端末がWindows7だったからです。<sup><a href="#fn-1" id="fnref-1">1</a></sup>



## 対象読者の想定レベル



- アプリケーションのインストールができる
- コマンドプロンプト(Windows)でコマンドを打ったことがある
- VSCodeを触ったことがない
- Gitをほぼ／全く触ったことがない
- GitとGitHubの違いがわからない
## 前準備


新人くんに雑に「インストールしといて～」と前もって言っておいたらちゃんとやってくれてました。この３つの作業を事前に実施しておいて下さい。この部分は……1時間の中には含まれていません……。

- Visual Studio Codeをインストールする。
- Visual Studio Codeを日本語化する。（簡単だよ）
- Gitをインストールする。
Visual Studio Code（以下VSCode）はMicrosoftが提供している無償のエディタです。超高機能なメモ帳みたいなものだと思ってください。VSCodeでGitの操作も行います。
## そもそもGitって何


GitHubという言葉を聞いたことがあったら、ひとまず忘れてください。<br>
GitはGitHubではありません。GitはGitです。

### Gitで何ができるのか


Gitはテキストファイルなどの<strong>バージョン管理</strong>を行うための<strong>ソフトウェア</strong>であるとよく言われます。バージョン管理は、ファイルの変更内容や変更履歴を保持しておいて、あとから古い状態に切り戻したりできるようにするためのものです。<br>
つまり、「あぁ……この文章、変える前の方が良かったなぁ……前の状態に戻したいなぁ……」となった時に、前の状態まで（変更がコミットされていれば）復元できるようにするためのものです。<br>
<a href="https://camo.qiitausercontent.com/ee297514de7c44cb4ea6b02d5a8a2869095a5645/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3236353930302f32613765666362392d333638332d363731342d396232612d3031393730396332653434322e706e67" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F2a7efcb9-3683-6714-9b2a-019709c2e442.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=280626dfb8b7e53e3d12a13de2a58f5f" alt="git1.PNG" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/265900/2a7efcb9-3683-6714-9b2a-019709c2e442.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F2a7efcb9-3683-6714-9b2a-019709c2e442.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=aa97d9d974d76bf8314404f942f59358 1x" loading="lazy"></a><br>
この画像はVSCode上で変更の差分を表示させている一例です。Gitを使えば、こんな風に変更内容を記録しておくことができます。左側のファイルが古いファイルで、右側のファイルが新しいファイルです。何やら行が削除されたり（赤の行）、追加されたり（緑の行）していることが分かります。





![git1.PNG](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F2a7efcb9-3683-6714-9b2a-019709c2e442.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=280626dfb8b7e53e3d12a13de2a58f5f)

ちなみにこれは<strong>GitLens</strong>というVSCodeの拡張機能を使用して表示させています。この拡張機能を入れておくと便利です。

### Gitの操作はどうしたら


この記事で紹介するように、VSCode上である程度Gitの操作はできますが、gitコマンドで直接操作をしたり、別のGitクライアントソフト（`Sourcetree`など）を使ったりしてVSCodeを一切使わないような選択肢もあります。

### Gitの実体


Gitはコンソールで動くアプリケーションです。<br>
自分がGitをインストールしたフォルダを見てみると、そこには確かにgitという名前のファイルが置いてあります。<br>
例えば私の場合だと、`C:\Program Files\Git\bin`のところに……。<br>
<a href="https://camo.qiitausercontent.com/2398ba43a1e87fe7666538f54fb3c833a2a5fe70/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3236353930302f36636333353762372d383734312d393138652d323634352d3738636664646566633436612e706e67" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F6cc357b7-8741-918e-2645-78cfddefc46a.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=e6051f94ad76f0e5cefe4abcb4a9175e" alt="installed.png" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/265900/6cc357b7-8741-918e-2645-78cfddefc46a.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F6cc357b7-8741-918e-2645-78cfddefc46a.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=ba0681365ce0155affaaee3de7ddc63f 1x" loading="lazy"></a><br>
この場所をコンソール上で開いて、試しにコマンドを打ってみましょう。<br>
上のバーに`cmd`と入力してエンターを押せば、コマンドプロンプトでこの場所を開くことができます。<br>
<a href="https://camo.qiitausercontent.com/7179c6adf42d4b314f07d91ca1a50ae21b76d09f/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3236353930302f64306331653639652d633236622d366233312d306262312d6131373763636338633264302e706e67" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fd0c1e69e-c26b-6b31-0bb1-a177ccc8c2d0.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=305c3b4888c93a196ca0f9c663d34447" alt="cmd.png" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/265900/d0c1e69e-c26b-6b31-0bb1-a177ccc8c2d0.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fd0c1e69e-c26b-6b31-0bb1-a177ccc8c2d0.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=f31376713a5d41d45d3e6e579ad78237 1x" loading="lazy"></a><br>
コマンドプロンプトが起動したら、下記コマンドを打ってください。





![installed.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F6cc357b7-8741-918e-2645-78cfddefc46a.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=e6051f94ad76f0e5cefe4abcb4a9175e)





![cmd.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fd0c1e69e-c26b-6b31-0bb1-a177ccc8c2d0.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=305c3b4888c93a196ca0f9c663d34447)


そうすると、インストールしたGitのバージョン番号が出てくるはずです。<br>
このgit.exeというファイルが、Gitのアプリケーションとしての実体です。<br>
`git --version`とやったように、`git init`とか`git commit`とか、コマンドを入力するとファイル管理の操作ができるようになります。<br>
Gitが正しくインストールされていれば（つまり、環境変数PATHにgitファイルまでのパスが通っていれば）、このgitコマンドはどの場所でも使えるようになっているはずです。<br>
環境変数PATHについてはここでは教えないので、知らなかったら後で調べておいてください。







## バージョン管理システムのリポジトリの管理方法の違い


さて、バージョン管理システム自体は他にもいろいろあって、Gitの他には<strong>Subversion</strong>が有名ですが、SubversionとGitは、管理の方法がだいぶ違います。

### Subversionのリポジトリと管理


ちょっと遠回りであるかもしれませんが、先にSubversionをざっくり（本当にざっくり）説明した方が分かりやすいと思うので、Subversionから説明します。
SubversionはSubversionであり、<strong>Gitとは全く異なるバージョン管理システム</strong>です。<br>
SubversionもGitと同様に、テキストファイルのバージョン管理をするためのものですが、その性質上、バイナリのファイルを管理するのに用いられることがあります。つまり、エクセルだったり、Word文書だったり、実行ファイルだったり、画像だったり……そういった、テキストファイル以外のファイルを管理するのに使われることがあります。メモ帳で開いて読めるファイルがテキストファイル、読めないファイルがバイナリファイルだと思ってください。<br>
逆にGitでは、バイナリファイル（というより、１ファイルが大きいファイル）はあまり管理しません。理由は後述します。<br>
<a href="https://camo.qiitausercontent.com/5fd079367181235855dfb4745065f9828d9f55e7/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3236353930302f38386430336239362d323263632d383063382d363834342d3263303739383330306165632e6a706567" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F88d03b96-22cc-80c8-6844-2c0798300aec.jpeg?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=2d268721c2c3f2afb7d62bf9491b188e" alt="スライド1.JPG" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/265900/88d03b96-22cc-80c8-6844-2c0798300aec.jpeg" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F88d03b96-22cc-80c8-6844-2c0798300aec.jpeg?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=00f205a372d514454f7218b23ad2886c 1x" loading="lazy"></a><br>
画像を見てください。Subversionはこの構造だけ見て分かる通り、とても単純です。ローカル（ノートPCなど）で作成したファイルを、Subversionは<strong>commitと呼ばれる操作を通じて</strong>、サーバーに保存しています。保存する場所は、サーバーのリポジトリです。「リポジトリ？」なんだか難しげな言葉ですが、ファイル履歴の貯蔵庫だと思ってください。このリポジトリの中に過去のファイルも残っており、利用者は任意のタイミングで、いつでも古いバージョンのファイルを入手することができます。リポジトリの中に、昨日commitしたファイルとか、一昨日commitしたファイルとかが入っているわけです。バージョン管理するということは、ファイルを過去の状態に戻せるということです。なので、少なくとも過去のファイル自体はどこかに保存されてなくてはいけないので、こうしたリポジトリの存在は必然的でしょう。





![スライド1.JPG](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F88d03b96-22cc-80c8-6844-2c0798300aec.jpeg?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=2d268721c2c3f2afb7d62bf9491b188e)


#### 補足


<a href="http://e-words.jp/w/%E3%82%B3%E3%83%9F%E3%83%83%E3%83%88.html" rel="nofollow noopener" target="_blank">コミット(commit)</a>は日本語にするのが難しい英単語で、「確約する、(罪を)犯す」というような意味があります。データベースを扱うときにも、同様にコミットと呼ばれる操作が出てきます。

### Gitのリポジトリと管理


一方Gitは、Subversionよりも後発の、異なった特徴を持つバージョン管理システムです。<br>
画像を見てください。<br>
<a href="https://camo.qiitausercontent.com/ba673a7db6f7e91ec160c55f10042a6a4caffc6b/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3236353930302f30613965623661632d363265322d366164612d633731612d3861666331346232653466352e6a706567" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F0a9eb6ac-62e2-6ada-c71a-8afc14b2e4f5.jpeg?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=e9c2e13e68289d186e17d7fa0d210f39" alt="スライド2.JPG" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/265900/0a9eb6ac-62e2-6ada-c71a-8afc14b2e4f5.jpeg" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F0a9eb6ac-62e2-6ada-c71a-8afc14b2e4f5.jpeg?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=2998bb6ada8461119d42ad36ab24238c 1x" loading="lazy"></a><br>
見て分かる通り、GitはSubversionと違って、サーバーだけでなくローカルにもリポジトリ（<strong>ローカルリポジトリ</strong>）があります。そしてファイルへの変更は、サーバーのリポジトリにコミットするのではなく、ローカルのリポジトリにコミットします。そしてローカルのリポジトリとサーバーのリポジトリで、情報を転送させたり取得させたりします。大切なことなのでもう一度言いますが、サーバーのリポジトリに直接コミットは行いません。ローカルリポジトリにコミットを行い、そのローカルリポジトリからサーバーのリポジトリ（<strong>リモートリポジトリ</strong>と呼ばれます）にコミットの内容を別途送り込みます。



![スライド2.JPG](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F0a9eb6ac-62e2-6ada-c71a-8afc14b2e4f5.jpeg?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=e9c2e13e68289d186e17d7fa0d210f39)



<strong>「なんでそんな複雑なことするの……？ Subversionみたいにすれば良くない……？」</strong>

実はGitの生みの親は、Linuxカーネル生みの親でもある伝説のエンジニア、リーナス・トーバルズです。<br>
<a href="https://cpplover.blogspot.com/2015/04/git10linus-torvals.html" rel="nofollow noopener" target="_blank">Gitについてのインタビューの記事</a>があるので、気になったらこれを読めばなぜ分散型のバージョン管理システムが好まれているか、ほんの少しだけ、分かるかもしれません。


### GitとSubversionの使い分け


「Subversion？　全部Gitでいいじゃん、なんで別のバージョン管理システムを使う必要があるの？」<br>
Gitは（Git LFSなどの拡張機能を使わない限りは）、大きなバイナリファイルの管理にあまり向いていないとされています。<br>
なぜかを考えてみましょう。


Gitはローカルにもリポジトリを持ちます。<br>
そのリポジトリの中に、新しいファイルから古いファイルまで全部入ってるようなイメージです。大きめのファイルが新しいのから古いのまで全部入っていたら、なんやかんやでリポジトリの大きさは数GB、あるいはもっと大きく膨れ上がったりします。Subversionならリポジトリはサーバーにあるのでローカル側には最新のファイルだけあればいいのですが、Gitはそうはいきません。

ローカルにリポジトリがなくて、サーバーにリポジトリがある状態で、「さぁローカルにサーバーのリポジトリをコピー（clone）して、プロジェクトに参加するぞ」というときに、リポジトリが肥大化していたら数GBのダウンロードが始まります。煩わしいですね。リポジトリのローカルへのcloneが頻繁に発生しうるGitですから、このネットワークトラフィックの増大は見過ごせません。<br>
なのでGitでは大きなバイナリファイルを管理しない方がいいとよく言われます。

Gitでもそういった大きなファイルを管理するために、Git LFSという拡張があったりしますが、そういったものを使わないで管理すると、後からGitの歴史から重たい不要なファイルの存在を消す必要が発生したりして、とてもとても面倒な思いをすることになります。
## ローカルリポジトリへのコミットの全体像


「オーケー。分かった。自分のファイルの変更内容を、ローカルリポジトリに『コミット』という操作を通じて書き込んで、そのローカルリポジトリにある変更内容を、後でサーバーのリモートリポジトリに転送してやればいいんだな」
その通りです。<br>
ただ、コミットすると言っても、<strong>ファイルに保存したらすぐコミットができるわけではありません。</strong><br>
コミットをするには、<strong>もう１工程踏む</strong>必要があります。<br>
画像を見てください。<br>
<a href="https://camo.qiitausercontent.com/e4e466e95eef426ec5f1e3798b3a9d4a3fc23b5b/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3236353930302f32313933353539652d356332322d393134632d666530392d6261636130626638643263662e6a706567" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F2193559e-5c22-914c-fe09-baca0bf8d2cf.jpeg?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=e293310cdbb9fb326d51bfb8b09516d3" alt="git3.jpg" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/265900/2193559e-5c22-914c-fe09-baca0bf8d2cf.jpeg" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F2193559e-5c22-914c-fe09-baca0bf8d2cf.jpeg?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=aa00329084e2ab72309022256e18fd58 1x" loading="lazy"></a><br>
最初に、ファイルに変更内容を保存します。<br>
そして、次にそれを「コミット予定エリア」に追加します。<br>
最後に、コメント（コミットメッセージ）を書いて、コミット予定エリアに追加しておいた内容をローカルリポジトリにコミットします。







![git3.jpg](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F2193559e-5c22-914c-fe09-baca0bf8d2cf.jpeg?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=e293310cdbb9fb326d51bfb8b09516d3)



※分かりやすくするために「コミット予定エリア」と言いましたが、正しくは「ステージングエリア」といい、ここに追加することを「ステージする」「ステージング」などと言います。覚えておきましょう。
なんでステージングで1段階置くのかって？ Linuxの開発フローがそうなってたからリーナス氏がGitをそう作ったんだと思うよ！
#### 補足


ステージングをするコマンドは`git add`です。

## GitとVSCodeのハンズオン


さぁ、Gitのリポジトリ全体像と、コミットの全体像が掴めたところで、実際にGitとVSCodeに触ってみましょう。<br>
全体像を理解していればあっという間です。<br>
この記事では、プロジェクトにローカルリポジトリを作成して、そこへコミットするまでの手順を記述します。


### プロジェクトを作成する


git-sandboxという名前のプロジェクトにします。<br>
プロジェクトと言っても、ただのフォルダ名なので心配する必要はありません。<br>
日本語パス名が含まれないところに適当にフォルダを作り、`git-sandbox`と名前を付けます。<br>
このプロジェクトの中身をGitで管理しましょう。<br>
<a href="https://camo.qiitausercontent.com/a2d84e8e9c08bc6677a6307a79d8e68b5988b7c9/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3236353930302f61386436336132662d616237352d316566652d313966362d3763353832616434646331362e6a706567" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fa8d63a2f-ab75-1efe-19f6-7c582ad4dc16.jpeg?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=e06d9470205f1c0e392c2af5489b4310" alt="git-sandbox.JPG" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/265900/a8d63a2f-ab75-1efe-19f6-7c582ad4dc16.jpeg" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fa8d63a2f-ab75-1efe-19f6-7c582ad4dc16.jpeg?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=ae9eeffdb1550b343152759fce10835a 1x" loading="lazy"></a>






![git-sandbox.JPG](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fa8d63a2f-ab75-1efe-19f6-7c582ad4dc16.jpeg?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=e06d9470205f1c0e392c2af5489b4310)
### 隠しフォルダを見えるようにしておく


gitのローカルリポジトリもまた、ただのフォルダやファイルです。ただ、隠しフォルダ/ファイルになっているため、前準備として、最初に見えるようにしておきましょう。
#### Windows 7 の場合


#### Windows 10 の場合


`表示`→`オプション`→`表示`タブ→`隠しファイル、隠しフォルダー、および隠しドライブを表示する`にチェック<br>
<a href="https://camo.qiitausercontent.com/d75a455242f2fb7884daf93baa60be698a9fe69a/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3236353930302f35316530616239642d373338302d353636342d326234382d3163313538386161333062352e706e67" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F51e0ab9d-7380-5664-2b48-1c1588aa30b5.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=8f5c3d9c76bb65ea5ccde1e987198264" alt="win10 visible.png" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/265900/51e0ab9d-7380-5664-2b48-1c1588aa30b5.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F51e0ab9d-7380-5664-2b48-1c1588aa30b5.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=23fe00ddfc4cfd650e2877130eb3a38d 1x" loading="lazy"></a>






![win10 visible.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F51e0ab9d-7380-5664-2b48-1c1588aa30b5.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=8f5c3d9c76bb65ea5ccde1e987198264)
#### macOS Mojave の場合


少なくともMojave(10.14.6)では、このショートカットですぐに表示／非表示を切り替えられます。
`command` + `shift` + `.`



### プロジェクトのローカルリポジトリを作成する


Gitらしい作業の第一歩です。ローカルリポジトリを作ります。<br>
`git --version`をした時と同じように、ただし<strong>場所は作った`git-sandbox`プロジェクトの中で</strong>、コマンドプロンプトを開いてコマンドを打ちます。





<a href="https://camo.qiitausercontent.com/4d8f6888538e0b4f9dc26f295f2daaf215c84753/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3236353930302f35643039393061312d306336302d623863342d663131382d3461636436346462643233612e706e67" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F5d0990a1-0c60-b8c4-f118-4acd64dbd23a.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=0e87b93b32485e57855425869f17838c" alt="スクリーンショット 2019-05-08 16.18.14.png" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/265900/5d0990a1-0c60-b8c4-f118-4acd64dbd23a.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F5d0990a1-0c60-b8c4-f118-4acd64dbd23a.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=584cd94f92ee06de3923a8d310cc0c56 1x" loading="lazy"></a><br>
ポンっ。はいできました。この隠しフォルダの`.git`が、git-sandboxプロジェクトのローカルリポジトリです。<br>
<a href="https://camo.qiitausercontent.com/367ad8bf3672fd11a167f417f2d119623a545066/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3236353930302f61323862383436632d356261352d663162342d343366352d3463373931646138313039352e706e67" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fa28b846c-5ba5-f1b4-43f5-4c791da81095.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=e9ff7bd609752cf4b1aba9ca0e889e8f" alt="gitinit.png" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/265900/a28b846c-5ba5-f1b4-43f5-4c791da81095.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fa28b846c-5ba5-f1b4-43f5-4c791da81095.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=0926ee1d656a5e2927dff236e118bf45 1x" loading="lazy"></a>

![スクリーンショット 2019-05-08 16.18.14.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F5d0990a1-0c60-b8c4-f118-4acd64dbd23a.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=0e87b93b32485e57855425869f17838c)




![gitinit.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fa28b846c-5ba5-f1b4-43f5-4c791da81095.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=e9ff7bd609752cf4b1aba9ca0e889e8f)
### VSCodeでgit-sandboxプロジェクトを開く


VSCodeを起動します。<br>
<a href="https://camo.qiitausercontent.com/38118af3b54454f16b2dc91ed849471d5ef33a63/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3236353930302f31653766386262632d626636302d373738392d613631312d6666633761343564313832362e706e67" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F1e7f8bbc-bf60-7789-a611-ffc7a45d1826.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=139b54dbf7a88357693d1e0ce64df71b" alt="スクリーンショット 2019-05-08 16.48.35.png" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/265900/1e7f8bbc-bf60-7789-a611-ffc7a45d1826.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F1e7f8bbc-bf60-7789-a611-ffc7a45d1826.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=cd6a1ecad4e3328d724d8275447c4ffc 1x" loading="lazy"></a><br>
サブメニューに分かりやすく「フォルダーを開く」と書かれているので、自分が作った`git-sandbox`プロジェクトを開きます。<br>
開くと、あまり変わっていませんが、こんな画面になります。<br>
<a href="https://camo.qiitausercontent.com/bf2b1d21bda03cc068712acdde4fd499610d6fb0/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3236353930302f30373062653931382d306639642d343863642d333162652d6162356234636336323464332e706e67" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F070be918-0f9d-48cd-31be-ab5b4cc624d3.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=38c32cdfccab036baab8142059117599" alt="スクリーンショット 2019-05-08 16.48.52.png" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/265900/070be918-0f9d-48cd-31be-ab5b4cc624d3.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F070be918-0f9d-48cd-31be-ab5b4cc624d3.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=269a32fb17f2abdae85776b76c8cfa4b 1x" loading="lazy"></a>


![スクリーンショット 2019-05-08 16.48.35.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F1e7f8bbc-bf60-7789-a611-ffc7a45d1826.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=139b54dbf7a88357693d1e0ce64df71b)





![スクリーンショット 2019-05-08 16.48.52.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F070be918-0f9d-48cd-31be-ab5b4cc624d3.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=38c32cdfccab036baab8142059117599)
### 管理対象のファイルを作成し、保存する


画面左のサブメニューのGIT-SANDBOXの辺りにマウスカーソルを当てると、ファイルやフォルダを作成するためのアイコンが出てきます。カーソルを乗せると「新しいファイル」というツールチップが出てくるものがあるので、ここで新しいファイルを作成しましょう。
さて、今回は例として`qiita-no-kiji.md`というファイルを作成します。別にこのファイルは何でも構いません。<br>
Gitで管理される対象のファイルです。mdはMarkdown形式というテキストファイルの拡張子としてよく用いられています。ちなみに、このGitを説明しているqiitaの記事もmarkdownで書かれています。<br>
<a href="https://camo.qiitausercontent.com/a09872c3cd06def2584a2120d4632b7c5b09d3dd/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3236353930302f63326438656261332d303561392d623930312d386664662d3730636137383439636634372e706e67" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fc2d8eba3-05a9-b901-8fdf-70ca7849cf47.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=4c2bb7aa34c39c79c80ebb88f23f7feb" alt="スクリーンショット 2019-05-08 16.59.17.png" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/265900/c2d8eba3-05a9-b901-8fdf-70ca7849cf47.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fc2d8eba3-05a9-b901-8fdf-70ca7849cf47.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=b4aa3d624fb38fa97807b29203b31df5 1x" loading="lazy"></a><br>
はい`qiita-no-kiji.md`の中身も適当に書いて、`Ctrl + S`で保存しました。<br>
さて、コミットをするために、変更したファイルをステージングしましょう。




![スクリーンショット 2019-05-08 16.59.17.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fc2d8eba3-05a9-b901-8fdf-70ca7849cf47.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=4c2bb7aa34c39c79c80ebb88f23f7feb)




### ステージングする


さて、VSCodeでGitを操作するときに使うのが、今、青い①のバッジが出ているメニューです。<br>
この①の1は、変更が検知されたファイルの数です。なので2つのファイルを新規に作った人は②になっているはずです。

さぁ、小学校とかに不審者が現れた時取り押さえるのに使うサスマタみたいなこのバッジ付きアイコンを押してください。<br>
そうすると、下のような画面になるはずです。<br>
<a href="https://camo.qiitausercontent.com/21b75e7354b79e84f54d9f75bfa3e734a3334853/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3236353930302f64353736313261392d663634332d386638342d653161362d3333396135316235323764352e706e67" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fd57612a9-f643-8f84-e1a6-339a51b527d5.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=ed8f42533393d605167420d760bb9448" alt="スクリーンショット 2019-05-08 17.04.36.png" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/265900/d57612a9-f643-8f84-e1a6-339a51b527d5.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fd57612a9-f643-8f84-e1a6-339a51b527d5.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=cab6a76c904ebd6604508eedf2fbfb83 1x" loading="lazy"></a><br>
コミットする前に必要な作業として、コミット予定エリアにステージングするというのがありましたよね。早速ステージングしましょう。とは言ってもとっても簡単です。<br>
<a href="https://camo.qiitausercontent.com/8b8c469b4626917237c7bc5fdfd1ac9a52fa278d/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3236353930302f64646163616461662d663536342d366133362d316366362d6264623739643731383832382e706e67" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fddacadaf-f564-6a36-1cf6-bdb79d718828.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=859b08114940d2bc73d9448c49d463ab" alt="スクリーンショット 2019-05-08 17.20.11.png" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/265900/ddacadaf-f564-6a36-1cf6-bdb79d718828.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fddacadaf-f564-6a36-1cf6-bdb79d718828.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=bcd9ca1ed263de0a50aaf33ccb027b3e 1x" loading="lazy"></a><br>
変更したファイルの右にある、プラスボタンを押すだけです。ポチ。<br>
<a href="https://camo.qiitausercontent.com/538376a0eae3176da79e4c1a5fff3630504fe072/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3236353930302f32643933626136322d306165332d316430612d653863302d3162313634346135363066662e706e67" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F2d93ba62-0ae3-1d0a-e8c0-1b1644a560ff.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=34ee12529bf3ad3762b1a1c0bcb12b38" alt="スクリーンショット 2019-05-08 17.21.17.png" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/265900/2d93ba62-0ae3-1d0a-e8c0-1b1644a560ff.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F2d93ba62-0ae3-1d0a-e8c0-1b1644a560ff.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=4b08aa0f2ba6327f946755ea8ce22c68 1x" loading="lazy"></a><br>
「変更」にあったものが、「ステージング済みの変更」に入りました。これでステージングは完了です。



![スクリーンショット 2019-05-08 17.04.36.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fd57612a9-f643-8f84-e1a6-339a51b527d5.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=ed8f42533393d605167420d760bb9448)



![スクリーンショット 2019-05-08 17.20.11.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fddacadaf-f564-6a36-1cf6-bdb79d718828.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=859b08114940d2bc73d9448c49d463ab)



![スクリーンショット 2019-05-08 17.21.17.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F2d93ba62-0ae3-1d0a-e8c0-1b1644a560ff.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=34ee12529bf3ad3762b1a1c0bcb12b38)

#### 補足


VSCodeの機能で、変更内容を全て自動でステージングすることも可能です。
### コメントを書いてコミットする


お待ちかねのコミットです。画面はそのままで、上のMessageと書かれたテキストボックスにコミット内容についてコメントを書きます。とりあえず「first commit」とコメントを書いておきます。別になんでも構いません。ただし何かしらのコメントは必ず入力する必要があります。<br>
<a href="https://camo.qiitausercontent.com/f847ae546041fc478c0e72b13ce14fa34f67fda6/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3236353930302f61316439386135362d333532372d306265352d653935372d3730633434643563356631372e706e67" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fa1d98a56-3527-0be5-e957-70c44d5c5f17.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=e61cc7bbf301286d2da48672ae06622d" alt="スクリーンショット 2019-05-08 17.23.36.png" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/265900/a1d98a56-3527-0be5-e957-70c44d5c5f17.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fa1d98a56-3527-0be5-e957-70c44d5c5f17.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=072c70f4b67a2cd311b93de499c42967 1x" loading="lazy"></a><br>
後はコミットするだけです。すぐ上にあるチェックマークがコミットのボタンなので、これを押してコミットをします。<br>
変更内容と青いバッジが消えたら、無事にコミット完了です。お疲れ様でした！


![スクリーンショット 2019-05-08 17.23.36.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fa1d98a56-3527-0be5-e957-70c44d5c5f17.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=e61cc7bbf301286d2da48672ae06622d)


実は今回初めてGitをインストールして触り始めた人は、おそらくコミットできません。次の項目を見てください。
<a href="https://camo.qiitausercontent.com/af2ca7e19085fb49f0f082b5f29ca149943e8f35/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3236353930302f39663036663030642d343635312d383564312d343437362d6634306232323561316330642e706e67" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F9f06f00d-4651-85d1-4476-f40b225a1c0d.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=412d16bc2d288ffdd72ba616188ce54e" alt="スクリーンショット 2019-05-08 17.31.48.png" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/265900/9f06f00d-4651-85d1-4476-f40b225a1c0d.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F9f06f00d-4651-85d1-4476-f40b225a1c0d.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=fdf73626e37bcee082e154c93cf0d3ec 1x" loading="lazy"></a>

![スクリーンショット 2019-05-08 17.31.48.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F9f06f00d-4651-85d1-4476-f40b225a1c0d.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=412d16bc2d288ffdd72ba616188ce54e)
#### えっコミットできないんだけど（2019/05/11追記）


ごめんなさい。大事なことを忘れていました。<br>
Gitでは、「誰がコミットしたのか」という情報をコミットの中に持たせる必要があります。<br>
なので、自分の名前とメールアドレスをGitに設定しておきましょう。<br>
そうしたら、コミットをする時に、コミット内容と一緒に、コミットをした人の名前とメールアドレスがローカルリポジトリに書き込まれます。<br>
その情報がないと下記のようなエラーダイアログが出て、コミットができません。<br>
<a href="https://camo.qiitausercontent.com/68ebbf84988ce5ea8f0bedf898f90bb5217e6942/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3236353930302f36653836643635632d303661332d656139632d373035352d6138353632356162623430352e706e67" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F6e86d65c-06a3-ea9c-7055-a85625abb405.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=b76c921fc19b06a18af81f0eca15ae34" alt="スクリーンショット 2019-05-11 16.32.18.png" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/265900/6e86d65c-06a3-ea9c-7055-a85625abb405.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F6e86d65c-06a3-ea9c-7055-a85625abb405.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=fb93abd3eaa2ccfd3bbbaf73f05f3901 1x" loading="lazy"></a><br>
事前に何かのサービスにアカウント登録してなきゃいけないとか、ユーザー名とメールアドレスで何かの認証をしているとか、そういうものではないので安心して下さい。<br>
`my_name`と`my_name@example.com`にあたる部分に、自分の名前とメールアドレスを入れて、下記のような2つのコマンドを打って下さい。






![スクリーンショット 2019-05-11 16.32.18.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F6e86d65c-06a3-ea9c-7055-a85625abb405.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=b76c921fc19b06a18af81f0eca15ae34)





この`--global`というオプションは、そのパソコンで使われているGit全体の設定を行うというものです。<br>
この`git-sandbox`のリポジトリだけで有効な設定をしたい場合には、`--global`を`--local`に変えてください。<br>
`--global`にしておけば、あとから別のローカルリポジトリの操作をする時にも、設定したnameとemailが使われるので、いちいちリポジトリ毎に`git config`をしなくてもコミットができるようになります。








ユーザー名はともかく、なんでメールアドレスも……？　と思うかもしれませんが、<br>
<a href="https://teratail.com/questions/123116" rel="nofollow noopener" target="_blank">メールアドレスがLinuxの開発フローの中で必要だった</a>ためこうなっているのでしょう。<br>
指摘して下さった<a href="/damic" class="user-mention js-hovercard" title="damic" data-hovercard-target-type="user" data-hovercard-target-name="damic">@damic</a> さん、ありがとうございます。




### おまけ：コマンドプロンプト（ターミナル）をVSCode上で開く


今回は使いませんでしたが、VSCode上でコマンドプロンプトを開けます。<br>
ウィンドウの下の方からにゅっと画面を引き出すことができます。<br>
にゅっ。<br>
<a href="https://camo.qiitausercontent.com/2da27104cffcef20ffc5897fd7be348437ae5e55/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3236353930302f36356535393532362d386237382d316665352d333264382d3734363962383733613964352e706e67" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F65e59526-8b78-1fe5-32d8-7469b873a9d5.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=9d4a0388e226bc6f36aed6270dc86a46" alt="スクリーンショット 2019-05-09 11.49.19.png" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/265900/65e59526-8b78-1fe5-32d8-7469b873a9d5.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F65e59526-8b78-1fe5-32d8-7469b873a9d5.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=efb870045c676ceabd8848156e497143 1x" loading="lazy"></a><br>
ここの「ターミナル」のタブでgitコマンドを思う存分叩けます。




![スクリーンショット 2019-05-09 11.49.19.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F65e59526-8b78-1fe5-32d8-7469b873a9d5.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=9d4a0388e226bc6f36aed6270dc86a46)

## ハンズオンしなかったけど大事なことたち


ここから先は、ハンズオンをしませんでしたが、とても大事なことなので時間の許す限り紹介していきます。
### ブランチ


Gitを学ぶ上で避けて通れないのが、ブランチです。<br>
けれどもコミットまでやってみたのであれば、ブランチへの理解も一瞬です。<br>
コミットを時系列に並べてみると、画像のように一本の線になりますよね。<br>
<a href="https://camo.qiitausercontent.com/2d29c2bde52e063276b35ec60f18d15ae8af02c3/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3236353930302f63626338646438332d613463642d646133352d643236302d3335383736633234396137392e706e67" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fcbc8dd83-a4cd-da35-d260-35876c249a79.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=a326649d46b3b935ae5bead8a44c09c2" alt="スライド1.PNG" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/265900/cbc8dd83-a4cd-da35-d260-35876c249a79.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fcbc8dd83-a4cd-da35-d260-35876c249a79.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=b8b3d25b7aa738f107c03078ee8cdfe9 1x" loading="lazy"></a><br>
この<strong>コミットの連なりがブランチ</strong>です。<br>
でもブランチ（branch:"枝"のこと）なのに例が一本しかないのも不適当なので、もう一個画像を用意しました。<br>
<a href="https://camo.qiitausercontent.com/75df8f789d1513751de48f06b2ee6ed9d1fc6b04/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3236353930302f62353036363461382d333531302d396562632d396233652d6261303938626235313132642e706e67" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fb50664a8-3510-9ebc-9b3e-ba098bb5112d.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=5e371357e6e03bdc411cbb7d041a960b" alt="スライド2.PNG" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/265900/b50664a8-3510-9ebc-9b3e-ba098bb5112d.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fb50664a8-3510-9ebc-9b3e-ba098bb5112d.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=caf564cd53010b0c5106bf839c26ac32 1x" loading="lazy"></a><br>
コミットCから分岐してコミットBとコミットB'ができています。こうして見ると、よりブランチっぽいですよね。<br>
最初は「<strong>ブランチの上にコミットがあるのではなく</strong>、コミットの連なりそのものがブランチになっている」と考えてください。そう考えると少なくとも最初は分かりやすいような気がします。<br>
リポジトリを作成した時点で最初から存在しているブランチがあり、その特別なブランチを<strong>masterブランチ</strong>と言います。<br>
VSCodeの画像の左下に、masterと書いてあったでしょう？ これはmasterブランチで作業しているということです。<br>
それから、あるブランチを作ってmasterから分岐した後、再びmasterにその変更を合併させることも可能です。その合併作業のことを<strong>マージ</strong>と言います。




![スライド1.PNG](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fcbc8dd83-a4cd-da35-d260-35876c249a79.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=a326649d46b3b935ae5bead8a44c09c2)





![スライド2.PNG](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fb50664a8-3510-9ebc-9b3e-ba098bb5112d.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=5e371357e6e03bdc411cbb7d041a960b)








そしてブランチを作ることを、「<strong>ブランチを切る</strong>」と言うことがあります。……枝を切る？？？ 生やすじゃないの？？？ と思うかもしれませんが、「伝票を切る」がその由来だと言われています。ホラ、伝票の紙ってミシン目から切り離して書き起こすから……。

あと、「masterブランチ」で最初作業していたとして、別の「Aブランチ」に入って作業することを、「Aブランチに<strong>チェックアウト</strong>する」と言います。コマンドが`git checkout`だからです。紛らわしいですがチェックインじゃないんです。チェックアウトなんです。もともとRCSという古いバージョン管理システムで`check out：（図書館から）本を借りる`という意味で使われていたらしいのですが、Gitはそれを継承しているとのことです。<sup><a href="#fn-2" id="fnref-2">2</a></sup>




現在のデフォルトのブランチ名は、masterブランチからmainブランチに変更されています。<a href="https://www.publickey1.jp/blog/20/githubmainmastermain.html" rel="nofollow noopener" target="_blank">変更の背景</a>にはポリコレ的な考え方がありました。

ブランチやツリーについて解説した記事を書きました。<br>
<a href="https://qiita.com/jesus_isao/items/2a0495c973a4c911c2cc" id="reference-368bc058db7e4a53fd67">図解！ Gitのブランチ・ツリーをちゃんと読む</a>


### タグ


タグはめっちゃ簡単です。あるコミットに名前を付けるだけです。<br>
「ここでバージョン1.7.0をリリースしたよ！」などの記録として使われます。<br>
<a href="https://camo.qiitausercontent.com/0233760739e21cff3336092cd18f342df2aeed16/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3236353930302f63363062323865382d393161362d366234322d653162322d3637373763326236636335632e706e67" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fc60b28e8-91a6-6b42-e1b2-6777c2b6cc5c.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=523917127ae5721386c2396861cf99e0" alt="スライド3.png" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/265900/c60b28e8-91a6-6b42-e1b2-6777c2b6cc5c.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fc60b28e8-91a6-6b42-e1b2-6777c2b6cc5c.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=6d3e59a22d4e0c92c326dbc3973921d7 1x" loading="lazy"></a><br>
厳密に言うとタグにも種類があって、コミットに名前を付けるだけじゃないタグもあります。興味があったら調べておいてください。



![スライド3.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2Fc60b28e8-91a6-6b42-e1b2-6777c2b6cc5c.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=523917127ae5721386c2396861cf99e0)

### サーバーのリポジトリにコミットを送る（コミットをリモートリポジトリにpushする）


さて、VSCodeのハンズオンでやったのは、ローカルリポジトリのコミットまでです。<br>
そして残念ながらこの記事ではハンズオンはそこまでです。<br>
リモートリポジトリの部分までやってしまうと、1時間を多分オーバーするし、<br>
記事があまりに縦長になってしまうというのが主な理由です。<br>
けれどもサーバーにリポジトリをアップロードする部分の全体像だけ掴んでおきましょう。




- Gitのリモートリポジトリを置ける（Gitサーバーをホストしてくれる）クラウドサービスを見つける／もしくは自分でGitサーバーを建てる
- そのサービスにアカウント登録などをする
- サービス内でリポジトリを置ける場所を作る
- ローカルリポジトリにリモートリポジトリを置く場所／置いてある場所を教えてあげる設定をする
- サービスにアップロード（push）する。そしてリモートリポジトリができる
そして、そのGitのリモートリポジトリを置くことができるサービスとして有名なのが、<br>
`GitHub`や`GitLab`や`Bitbucket`などです。GitHubは聞いたことあるでしょう？　え？　ない？　ほら、日経で<a href="https://www.itmedia.co.jp/news/articles/1806/05/news069.html" rel="nofollow noopener" target="_blank">設計図共有サイト</a>って紹介されてた……。





まぁそれはいいとして、上記で紹介した1~5のフロー以外にも、リモートリポジトリを作る方法はあります。<br>
上のVSCodeのハンズオンの続きをするなら、1~5のように、ローカルリポジトリを作ったのでそれをリモートリポジトリをホストしてくれるサービスにアップロード……となります。<br>
けれどもサービス側でリモートリポジトリを先に作ってしまってから、それをローカルにコピー（clone）してプロジェクトの編集作業を始める、ということもできます。


GitHubでアカウントを作ってリモートリポジトリを作るような内容の記事は、多分探せば複数出てくると思うので、是非調べてやってみて下さい。
### VSCode上でコミット内容をリモートリポジトリにアップロード／もしくはリモートリポジトリからダウンロードする時に押すボタン


さて、もしあなたがハンズオンのその先に進んで、どこかのサーバー上にリモートリポジトリが出来上がって、ローカルリポジトリ側にも「リモートリポジトリはここだよ」と教える設定ができた場合のことを考えて、VSCode上でサーバーにコミットをアップロード／ダウンロードするにはどこを押したら良いかだけ教えておきます。<br>
<a href="https://camo.qiitausercontent.com/2e643b3458c3baa5eddbe3ffdb3e391a6958ab9f/68747470733a2f2f71696974612d696d6167652d73746f72652e73332e61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f302f3236353930302f37376464396463632d633138652d383634372d663230632d6532616232306666366132302e706e67" target="_blank" rel="nofollow noopener"><img src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F77dd9dcc-c18e-8647-f20c-e2ab20ff6a20.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;s=b069798408902b4440eb731816320868" alt="スクリーンショット 2019-05-08 21.49.14.png" data-canonical-src="https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/265900/77dd9dcc-c18e-8647-f20c-e2ab20ff6a20.png" srcset="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F77dd9dcc-c18e-8647-f20c-e2ab20ff6a20.png?ixlib=rb-4.0.0&amp;auto=format&amp;gif-q=60&amp;q=75&amp;w=1400&amp;fit=max&amp;s=90e5f5de40d726b7abadf23224b7fdfb 1x" loading="lazy"></a><br>
この画像の左下の赤枠のところです。今この画像の状態は、ダウンロード(pull)すべきコミットが3個あって、アップロード(push)すべきコミットが0個ある、というような状態です。このスチール缶のリサイクルマークみたいなボタンを押してやれば、コミットのpullとpushを行ってくれます。


![スクリーンショット 2019-05-08 21.49.14.png](https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F265900%2F77dd9dcc-c18e-8647-f20c-e2ab20ff6a20.png?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=b069798408902b4440eb731816320868)

### プロジェクト内にGitの管理対象から外したいファイルがある


例えば、ビルド後のファイルがコミットされちゃうのは避けたいですよね。<br>
`.gitignore`という名前のファイルを書くと良いです。書き方は調べてください。


### 便利な拡張プラグイン


「Gitで何ができるのか」の項目でも`GitLens`を使って過去のコミットとの差分の表示をしていました。VSCode上でGitをより使いやすくするための拡張機能は色々あるので、興味があったら調べて使ってみてください。VSCodeを日本語化する時に使ったメニューの「拡張機能」のところで検索してインストールしてみてください。

### おわりに


最初にも書きましたが、この記事はあくまで、Git学習の足がかりとするためのものです。<br>
Gitを今後使っていくのであれば、この記事の内容だけでは色々と不足するため、自分で調べて行く必要があります。<br>
最初は慣れなくて大変に思うかもしれませんが、とても便利で大事なツールなので、ぜひぜひマスターしてください。


おかしなことを言っていた場合は編集リクエスト／マサカリください。<br>
どうぞよろしくお願いします。

ブランチについて解説した、続き（？）の記事を書きました。<br>
もしよければ見ていってください。<br>
<a href="https://qiita.com/jesus_isao/items/2a0495c973a4c911c2cc">図解！ Gitのブランチ・ツリーをちゃんと読む</a>



### 参考


<a href="https://gigazine.net/news/20190203-how-to-teach-git/" rel="nofollow noopener" target="_blank">バージョン管理システム「Git」の使い方はどのように教えるのが良いのか？</a><br>
<a href="https://ja.stackoverflow.com/questions/6176/checkout-%E3%81%AE%E6%84%8F%E5%91%B3%E3%81%99%E3%82%8B%E3%81%A8%E3%81%93%E3%82%8D" rel="nofollow noopener" target="_blank">“checkout” の意味するところ</a><br>
<a href="http://e-words.jp/w/%E3%82%B3%E3%83%9F%E3%83%83%E3%83%88.html" rel="nofollow noopener" target="_blank">e-words - コミット【 commit 】</a><br>
<a href="https://laboradian.com/set-git-user-and-email/" rel="nofollow noopener" target="_blank">Git でユーザー名とメールアドレスを設定する方法（全体用とプロジェクト用）</a><br>
<a href="https://teratail.com/questions/123116" rel="nofollow noopener" target="_blank">git configの user.emailの存在意義とは？</a>



