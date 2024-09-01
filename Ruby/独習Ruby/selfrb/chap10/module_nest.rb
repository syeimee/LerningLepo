module MyApp
end

class MyApp::Person
  attr_accessor :name, :age

  def initialize(name, age)
    @name = name
    @age = age
  end
end

p MyApp::Person.new('山田太郎', 35)

# 入れ子の場合
# module MyApp::Config
#   class Person
#     attr_accessor :name, :age

#     def initialize(name, age)
#       @name = name
#       @age = age
#     end
#   end
# end

# p MyApp::Config::Person.new('山田太郎', 35)
