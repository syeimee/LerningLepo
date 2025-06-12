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
  def show
    puts "#{name}、#{age}歳は働いています。"
  end

  # undef_method :show
  remove_method :show
end

bps = BusinessPerson.new('山田太郎', 35)
bps.show
