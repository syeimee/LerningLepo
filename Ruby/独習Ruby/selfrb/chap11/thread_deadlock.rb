m1 = Mutex.new
m2 = Mutex.new

th1 = Thread.new {
  m1.lock
  sleep 0.1
  m2.lock
}

th2 = Thread.new {
  m2.lock
  sleep 0.1
  m1.lock
}

th1.join
th2.join
