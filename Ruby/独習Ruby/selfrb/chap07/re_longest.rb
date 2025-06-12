tags = '<p><strong>WINGS</strong>サイト<a href="index.html"><img src="wings.jpg" /></a></p>'
# results = tags.scan(/<.+>/)
results = tags.scan(/<.+?>/)
results.each do |result|
  puts result
end
