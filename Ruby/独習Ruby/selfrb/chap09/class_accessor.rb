class Person
  def initialize(name, age)
    @name = name
    @age = age
  end

  def name
    @name
  end

  def name=(value)
    @name = value
  end

  def age
    @age
  end

  def age=(value)
    @age = value
  end
end

ps = Person.new('山田太郎', 35)
ps.name = '井上次郎'
puts ps.name
