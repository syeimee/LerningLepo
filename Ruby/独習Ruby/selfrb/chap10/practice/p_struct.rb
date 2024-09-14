Article = Struct.new(:url, :title)

art = Article.new('https://codezine.jp/article/corner/835', 'Eclipse入門')
art.each_pair do |name, value|
  puts "#{name}: #{value}"
end
