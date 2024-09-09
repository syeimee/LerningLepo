VALUE = 'Top'

class MyClass
  VALUE = 'MyClass'

  class MyParent
    VALUE = 'MyParent'
  end

  class MyChild < MyParent
    VALUE = 'MyChild'

    def self.show
      VALUE
    end
  end
end

puts MyClass::MyChild.show
