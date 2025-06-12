module Loggable
  def show_attr
    instance_variables.each do |name|
      puts "#{name}：#{instance_variable_get(name)}"
    end
  end
end

class Person
  define_method :log, Loggable.instance_method(:show_attr)
  attr_reader :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end
end

clazz = Person.new('鈴木次郎', 18)
clazz.log
