PATH = "#{__dir__}/doc"
Dir.foreach(PATH) do |file|
  next if file == '.' || file == '..'
  f = File.join(PATH, file)
  stat = File.stat(f)
  puts f
  puts stat.file? ? 'ファイル' : 'フォルダー'
  puts "#{stat.size} byte"
  puts stat.mtime
  puts "--------------------------------"
end
