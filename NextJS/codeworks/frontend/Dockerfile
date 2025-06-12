# 使用するNode.jsのバージョンを指定
FROM node:18

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

# Node.jsの依存関係をインストール
RUN npm install

# アプリケーションのソースコードをコピー
COPY . /app

# ビルドを実行
RUN npm run build

# Next.jsのサーバーを起動
CMD ["npm", "start"]

# コンテナがリッスンするポートを指定
EXPOSE 3000