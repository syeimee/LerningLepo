case { status: :done, code: '138', value: '...実行結果...' }
  in { status: :done, **rest }
    puts rest
end
