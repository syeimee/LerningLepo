# 学習テーマ
作業日時: 2025-10-24


## 目的・背景 
開発専用環境をVPSに構築をしたい。
いきなり構築は難しいのバーチャルボックスを使って、以下の要件を満たす環境を構築してみる。
- 仮想コンテナDockerを用いて1つのサーバー内に以下の複合コンテナを作成する。
- ロードバランサ（認証サーバー　許可された開発関係者しかログインできない）
- 複数のアプリケーションサーバー（これもユーザーごとに閲覧権限をつけたい）
- データベースサーバー


## 実装内容・学んだ技術  
#### Phase1: 基本環境構築
VirtualBox上にUbuntu Serverをインストールし、Docker環境を構築する

##### 1.VirtualBoxでの仮想マシン作成
- 1.1 Ubuntu Server ISOのダウンロード
```bash
URL: https://ubuntu.com/download/server
ISO: ubuntu-24.04.2-live-server-amd64
```

- 1.2 仮想マシンの作成手順

- VirtualBoxを起動し、「新規」をクリック
- 仮想マシンの基本設定

```bash
名前: dev-vps-test
タイプ: Linux
バージョン: Ubuntu (64-bit)
メモリ: 4096MB（4GB）
ハードディスク: 「仮想ハードディスクを作成する」を選択
```

- ハードディスクの設定

```bash
ファイルサイズ: 20GB以上
ハードディスクのファイルタイプ: VDI
物理ハードディスクにあるストレージ: 可変サイズ
```

- ネットワーク設定（作成後に設定）

```bash
設定 → ネットワーク → アダプター1
割り当て: ブリッジアダプター
または NAT + ポートフォワーディング設定
```

```bash
名前        プロトコル  ホストポート  ゲストポート  ホストIP
SSH         TCP         2222          22
HTTP        TCP         8080          80
HTTPS       TCP         8443          443       127.0.0.1
```
- openssh-serverのインストール
```bash
sudo apt install openssh-server
```

- openssh-serverのサービス起動
```bash
sudo systemctl start ssh
```

※　ここでteratermもつながるはず

##### 2.初期設定

- システムアップデート
```bash
# パッケージリストの更新
sudo apt update

# システムのアップグレード
sudo apt upgrade -y

# 不要なパッケージの削除
sudo apt autoremove -y
```

- ツールのインストール

```bash
# 便利なツールをインストール
sudo apt install -y \
  vim \
  curl \
  wget \
  git \
  net-tools \
  htop \
  tree
```

- タイムゾーンの設定

```bash
# タイムゾーンを日本時間に設定
sudo timedatectl set-timezone Asia/Tokyo

# 確認
timedatectl
```
- dockerのインストール

```bash
# 必要なパッケージをインストール
sudo apt install -y \
  ca-certificates \
  curl \
  gnupg \
  lsb-release

# Docker公式GPGキーを追加
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# リポジトリを追加
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

- dockerのインストール

```bash
# パッケージリストを更新
sudo apt update

# Dockerエンジンとプラグインをインストール
sudo apt install -y \
  docker-ce \
  docker-ce-cli \
  containerd.io \
  docker-buildx-plugin \
  docker-compose-plugin
```

- dockerの動作検証

```bash
# Dockerバージョン確認
sudo docker --version

# Docker Composeバージョン確認
sudo docker compose version

# テストコンテナを実行
sudo docker run hello-world
```

- 一般ユーザーでdockerを使用可能にする

```bash
# dockerグループにユーザーを追加
sudo usermod -aG docker $USER

# 反映のため再ログイン（exitして再度SSH接続）
exit
```

再ログイン後、sudoなしでDockerコマンドが使えることを確認

```bash
docker ps
docker run hello-world
```






## 課題・問題点  




## 気づき・改善案  




