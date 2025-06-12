class Person
  attr_accessor :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end

  def greet(name)
    puts "こんにちは、#{name}さん！私は#{self.name}です！"
  end
end

ps = Person.new('山田太郎', 35)
ps.greet('鈴木花子')
