def my_benchmark
  start_t = Time.now.to_f
  yield
  # yield if block_given?
  end_t = Time.now.to_f
  puts "経過時間：#{end_t - start_t}秒"
end

my_benchmark do
  sleep(5)
end

# my_benchmark
