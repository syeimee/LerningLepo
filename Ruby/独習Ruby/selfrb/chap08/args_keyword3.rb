def show(msg, opts = {}, o_opts = {})
  p msg
  p opts
  p o_opts
end

# show('こんにちは', name: '権兵衛', age: 30, job: '営業')
show('こんにちは', { name: '権兵衛', age: 30 }, job: '営業')

