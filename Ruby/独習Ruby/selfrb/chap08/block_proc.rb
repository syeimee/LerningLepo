data = ['リンゴ', 'ミカン', 'メロン', 'イチゴ']
func = Proc.new {|item| puts item }

def block_proc_multi(list, b1, b2)
  puts 'start...'
  list.each &b1
  puts '--------------'
  list.each &b2
  puts 'end...'
end

p1 = Proc.new {|e| puts "[#{e}]" }
p2 = Proc.new {|e| puts "■#{e}■" }
block_proc_multi(data, p1, p2)
