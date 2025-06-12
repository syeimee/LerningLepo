require_relative 'book'

book = Book.new('978-4-7981-6364-2', '独習Ruby', '手を動かしておぼえる解説書')
Marshal.dump(book, File.open('./chap07/book.bin', 'w'))
