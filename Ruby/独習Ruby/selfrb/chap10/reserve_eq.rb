class Person
  attr_reader :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end

  def ==(other)
    if other.instance_of?(Person)
      return self.name == other.name && self.age == other.age
      # return instance_variables.all? do |var|
      #   instance_variable_get(var) == other.instance_variable_get(var)
      # end
    end
    false
  end
end

ps1 = Person.new('山田次郎', 32)
ps2 = Person.new('鈴木三郎', 18)
ps3 = Person.new('山田次郎', 32)
puts ps1 == ps2
puts ps1 == ps3
puts ps1 == '山田次郎'
