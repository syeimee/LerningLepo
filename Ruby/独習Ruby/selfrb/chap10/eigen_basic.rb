class Person
  attr_accessor :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end
end

ps = Person.new('山田太郎', 18)
ps2 = Person.new('鈴木次郎', 25)

def ps.show_name
  puts "名前は#{name}です。"
end

ps.show_name
ps2.show_name