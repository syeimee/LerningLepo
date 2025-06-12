th = Thread.new { raise 'Thread Error!!' }

begin
  th.join
rescue => e
  puts "異常終了：#{e.message}"
end
