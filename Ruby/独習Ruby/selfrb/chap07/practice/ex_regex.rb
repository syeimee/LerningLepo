File.open('./chap07/practice/sample.txt', 'r') do |file|
  file.each(chomp: true) do |line|
    line.scan(/\d{2,4}-\d{2,4}-\d{4}/).each do |result|
      puts result
    end
  end
end