def my_benchmark
  start_t = Time.now.to_f
  result = yield
  puts "結果：#{result}"
  end_t = Time.now.to_f
  puts "経過時間：#{end_t - start_t}秒"
end

my_benchmark do
  sleep(5)
end

# result = my_benchmark do
#   break sleep(1)
# end

# puts "my_benchmarkの戻り値：#{result}"
