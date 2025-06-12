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

class Student < Person
  attr_accessor :grade

  def initialize(name, age, grade)
    super(name, age)
    @grade = grade
  end

  def show
    puts "私の名前は#{name}、#{age}歳、#{grade}年です！"
  end
end

st = Student.new('山田太郎', 18, 3)
st.show
