require_relative 'book'

book = Marshal.load(File.open('./chap07/book.bin', 'r'))
puts book.title
