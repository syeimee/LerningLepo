def concatenate(*args)
  result = args[2..]
  args[0] + result.join('・') + args[1]
end

puts concatenate('[', ']', '鈴木', 'エルメシア', '富士子')
