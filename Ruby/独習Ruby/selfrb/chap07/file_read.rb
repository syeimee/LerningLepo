File.open('./chap07/sample.txt', 'r') do |file|
  puts file.read
  # puts file.read(10)
end
