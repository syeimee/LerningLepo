class Book
  attr_accessor :isbn, :title, :memo

  def initialize(isbn, title, memo)
    @isbn = isbn
    @title = title
    @memo = memo
  end

  def marshal_dump
    [@isbn, @title]
  end

  def marshal_load(obj)
    @isbn = obj[0]
    @title = obj[1]
  end
end
