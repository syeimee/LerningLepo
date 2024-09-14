msg = 'サポートサイトはhttps://www.wings.msn.to/です。https://web-deli.com/もよろしく。'
ptn = %r{http(s)?://([\w-]+\.)+[\w-]+(/[\w./?%&=-]*)?}i
puts msg.gsub(ptn, '<a href="\0">\0</a>')
# puts msg.sub(ptn, '<a href="\0">\0</a>')
# p msg.gsub(ptn, "<a href='\0'>\0</a>")
