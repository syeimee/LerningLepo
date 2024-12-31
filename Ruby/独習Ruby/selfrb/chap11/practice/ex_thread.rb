$count = 0

def increment
  count = $count
  sleep 0.1 if rand(10) > 8
  $count = count + 1
end

threads = []
m = Mutex.new
100.times.each do |i|
  threads << Thread.start {
    m.synchronize {
      increment
    }
  }
end

threads.each { |th| th.join }
puts $count
