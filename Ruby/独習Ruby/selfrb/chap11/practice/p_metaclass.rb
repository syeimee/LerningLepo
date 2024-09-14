class Person
  attr_accessor :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end
end

class BusinessPerson < Person
  def work
    puts "#{name}、#{age}歳は働いています。"
  end
end

EliteBusinessPerson = Class.new(BusinessPerson) do |clazz|
  define_method :work do
    puts "#{name}、#{age}歳はバリバリ働いています。"
  end
end

ebps = EliteBusinessPerson.new('山田太郎', 35) 
ebps.work
