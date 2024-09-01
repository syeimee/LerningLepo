threads = []

for name in %w(hoge foo bar)
  threads << Thread.new(name) { |name|
    5.times do |i|
      puts "Thread #{name}: #{i}"
      sleep rand
    end
  }
end

# for name in %w(hoge foo bar)
#   threads << Thread.new {
#     5.times do |i|
#       puts "Thread #{name}: #{i}"
#       sleep rand
#     end
#   }
# end

threads.each do |th|
# (Thread.list - [Thread.current]).each do |th|
  th.join
end
puts 'すべての処理が完了しました。'
