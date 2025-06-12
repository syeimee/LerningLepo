# ruby 3.2 イメージをベースに使用する
FROM ruby:3.2

# 必要な依存パッケージをインストールする
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

# npmがインストールされていることを確認
RUN apt-get install -y npm

# 作業ディレクトリを/appに設定する
WORKDIR /app

# Rails の依存関係をインストールするために Gemfile をコピーする
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN bundle install

# アプリケーションのソースコード全体をコピーする
COPY . /app

# サーバーを起動する前に、PIDファイルが残っていたら削除し、Railsサーバーを起動する
CMD rm -f /app/tmp/pids/server.pid && rails s -b 0.0.0.0 -p 3001