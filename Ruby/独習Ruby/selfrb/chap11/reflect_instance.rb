class Person
  attr_accessor :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end
end

ps = Person.new('山田太郎', 30)
p ps.instance_variables
p ps.instance_variable_defined? :@age
p ps.instance_variable_set :@name, '鈴木三郎'
p ps.instance_variable_get :@name
