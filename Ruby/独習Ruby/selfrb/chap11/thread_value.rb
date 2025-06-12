3.times.each do |i|
  Thread.new(i) { |i|
    num = sleep rand(1..5)
    "Thread #{i}: #{num}秒休止"
  }
end

(Thread.list - [Thread.current]).each do |th|
  puts th.value
end
puts 'すべての処理が完了しました。'
