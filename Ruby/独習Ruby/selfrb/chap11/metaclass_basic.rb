class Person
  attr_accessor :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end
end

BusinessPerson = Class.new(Person) do |clazz|
  define_method :work do
    puts "#{name}、#{age}歳は働いています。"
  end  
end

bps = BusinessPerson.new('山田太郎', 35)
bps.work
