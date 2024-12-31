th = Thread.new { raise 'Thread Error!!' }
sleep 0.1
p th.status
