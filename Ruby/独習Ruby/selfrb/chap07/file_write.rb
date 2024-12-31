file = File.open('./chap07/access.log', 'a')
file.flock File::LOCK_EX
file.puts(Time.now)
file.close	
puts '現在時刻をファイルに保存しました。'
