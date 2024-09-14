class Object
  def self.property(name)
    eval <<-"CODE"
      def #{name}
        @#{name}
      end

      def #{name}=(value)
        @#{name} = value
      end
    CODE
  end
end

class Person
  property :name
end

ps = Person.new
ps.name = '山田太郎'
puts ps.name
