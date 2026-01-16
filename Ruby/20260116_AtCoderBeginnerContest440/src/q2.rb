n = gets.chomp.to_i
inputs = gets.split(' ')

hash = {}
i = 1

# 馬に番号をつけてハッシュに入れる
inputs.each do | num |
  hash[i] = num.to_i
  i += 1
end

hash = hash.sort{|a, b| a[1] <=> b[1] }

1.upto(3) do | j |
  print hash[j - 1][0]
  print ' ' if j != 3
end
