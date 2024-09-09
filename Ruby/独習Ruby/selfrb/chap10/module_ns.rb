module MyApp
  class Person
    attr_accessor :name, :age

    def initialize(name, age)
      @name = name
      @age = age
    end
  end
end

p MyApp::Person.new('山田太郎', 35)
