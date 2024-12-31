class Person
  attr_accessor :name, :age

  def initialize(name, age)
    self.name = name
    self.age = age
  end

  def initialize_clone(obj)
    self.name = obj.name.clone
  end
end

p1 = Person.new('山田', 25)
p2 = p1.clone
p2.name.reverse!
# p2.name = '田中'
p p1
p p2
