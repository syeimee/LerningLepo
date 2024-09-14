File.open('./chap07/sample.txt', 'r') do |file|
  data = file.readlines(chomp: true)
  data.each do |line|
    puts line
  end
end
