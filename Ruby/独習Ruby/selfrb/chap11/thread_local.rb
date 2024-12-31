3.times.each do |i|
  Thread.new(i) { |i|
    Thread.current[:msg] = "Thread #{i}"
    Thread.stop
  }
end

sleep 0.5

Thread.list.each do |th|
  p th
  p th[:msg]
end
