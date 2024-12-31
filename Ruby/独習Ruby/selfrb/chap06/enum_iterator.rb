enum = ['orange', 'みかん', 'apple', 'りんご', 'grape', 'ぶどう'].to_enum
loop do
  puts "#{enum.next}: #{enum.next}"
end
