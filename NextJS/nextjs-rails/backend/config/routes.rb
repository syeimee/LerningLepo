Rails.application.routes.draw do
  namespace :api do # APIのエンドポイントが/apiで始まるようにする
  
    #url:api/convertに対して、markdown_controllerのconvertメソッドを実行する
    post 'convert', to: 'markdown#convert'
  end
end
