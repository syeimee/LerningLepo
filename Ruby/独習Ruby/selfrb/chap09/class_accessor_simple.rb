class Person
  attr_accessor :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end
end

ps = Person.new('山田太郎', 35)
ps.name = '井上次郎'
puts ps.name
