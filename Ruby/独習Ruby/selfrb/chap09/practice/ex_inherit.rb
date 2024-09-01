class Person
  attr_reader :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end

  def show
    "私の名前は#{name}、#{age}歳です！"
  end
end
  
class BusinessPerson < Person
  attr_reader :title

  def initialize(name, age, title)
    super(name, age)
    @title = title
  end

  def show
    "#{super}職位は#{title}です。"
  end
end

bps = BusinessPerson.new('山田太郎', 28, '主任')
puts bps.show
