Dir.mkdir('./chap07/sub')
puts 'Hit any key...'; gets
File.rename('./chap07/sub','./chap07/copy')
puts 'Hit any key...'; gets
Dir.rmdir('./chap07/copy')
