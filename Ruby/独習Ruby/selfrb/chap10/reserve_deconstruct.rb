class Person
  attr_reader :name, :age
  def initialize(name, age)
    @name = name
    @age = age
  end

  def deconstruct
    [name, age]
  end

  def deconstruct_keys(keys)
    { name: name, age: age }
  end
end

case Person.new('山田太郎', 18)
# case ['山田太郎', 18]
  in [name, 18]
  # in { name:, age: 18 }
    puts name
end
