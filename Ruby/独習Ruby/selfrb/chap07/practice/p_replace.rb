data = 'お問い合わせはsupport@example.comまで'
ptn = /[a-z\d+\-.]+@[a-z\d\-.]+\.[a-z]+/i
puts data.gsub(ptn, '<a href="mailto:\0">\0</a>')
