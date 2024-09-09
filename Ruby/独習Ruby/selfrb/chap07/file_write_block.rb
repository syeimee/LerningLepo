File.open('./chap07/access.log', 'a') do |file|
  file.flock File::LOCK_EX
  file.puts("#{Time.now}\n")
  puts '現在時刻をファイルに保存しました。'
end
