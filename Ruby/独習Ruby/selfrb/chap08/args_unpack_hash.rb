def create_book(isbn:, title:, **options)
  book = { isbn: isbn, title: title }
  book.merge(options)
end 

info = { isbn: '978-4-7981-6364-2', title: '独習Python', 
  price: 3000, publisher: '翔泳社' }
p create_book(**info)
