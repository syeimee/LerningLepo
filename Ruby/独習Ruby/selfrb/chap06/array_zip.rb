data1 = ['ぱんだ', 'うさぎ', 'こあら', 'とら'] 
data2 = ['panda', 'rabbit', 'koala'] 

p data1.zip(data2)
data1.zip(data2) do |ary|
  puts "#{ary[0]} = #{ary[1]}"
end
