File.open('./chap07/sample.txt', 'r') do |file|
  file.seek(6)
  file.each_line do |line|
    puts line
  end
end
