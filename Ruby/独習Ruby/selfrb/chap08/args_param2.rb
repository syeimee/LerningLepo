def concatenate(prefix, suffix, *args)
  result = prefix
  result += args.join('・')
  result + suffix
end

puts concatenate('[', ']', '鈴木', 'エルメシア', '富士子')
