class Person
  attr_accessor :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end

  def show
    puts "私の名前は#{name}、#{age}歳です！"
  end
end

class BusinessPerson < Person
  def work
    puts "#{name}、#{age}歳は働いています。"
  end
end

class EliteBusinessPerson < BusinessPerson
  def work
    puts "#{name}、#{age}歳はバリバリ働いています。"
  end
end

ebps = EliteBusinessPerson.new('山田太郎', 35) 
ebps.work
ebps.show
