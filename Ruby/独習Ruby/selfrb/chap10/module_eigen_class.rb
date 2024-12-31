module Introable
  def introduce
    puts "私の名前は#{name}です。"
  end
end

class Person
  extend Introable
  attr_accessor :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end
end

Person.introduce
