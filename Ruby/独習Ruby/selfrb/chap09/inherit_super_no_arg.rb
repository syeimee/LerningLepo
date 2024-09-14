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

class Foreigner < Person
  attr_accessor :country

  def initialize(name, age)
    super
    # super(name, age)
    @country = 'America'
  end

  def show
    puts "私の名前は#{name}、#{age}歳、出身は#{country}です！"
  end
end

fr = Foreigner.new('ジョージ＝スミス', 28)
fr.show
