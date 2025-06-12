class Object
  def self.property(name)
    define_method name do
      instance_variable_get "@#{name}"
    end

    define_method "#{name}=" do |value|
      instance_variable_set "@#{name}", value
    end
  end
end

class Person
  property :name
end

ps = Person.new
ps.name = '山田太郎'
puts ps.name
