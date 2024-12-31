VALUE = 'Top'

class MyParent
  VALUE = 'MyParent'
end

module MyModule
  VALUE = 'MyModule'

  class MyChild < MyParent
    VALUE = 'MyChild'

    def self.show
      VALUE
      # MyParent::VALUE
      # MyModule::VALUE
      # ::VALUE
    end
  end
end

puts MyModule::MyChild.show
