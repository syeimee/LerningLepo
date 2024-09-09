result = { status: :done, value: '完了' }
# result = { status: :done, value: '完了', memo: '...' }

puts case result
  in { status: :done, value: value }
  # in { status: :done, value: value, **nil }
  # in { status: :done, value: }
    value
  in { status: :waiting }
    '...実行中...'
end
