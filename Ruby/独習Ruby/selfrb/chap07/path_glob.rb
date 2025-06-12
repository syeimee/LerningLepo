PATH = File.join(__dir__, 'doc/**/*')
Dir.glob(PATH) do |f|
  puts f
  puts File.file?(f) ? 'ファイル' : 'フォルダー'
  puts "#{File.size(f)} byte"
  puts File.mtime(f)
  puts '---------------------'
end
