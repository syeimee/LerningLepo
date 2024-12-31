module MyApp
  module Greetable
    def greet
      "こんにちは、#{@name}さん！"
    end
  end
end

class MyClass
  include MyApp::Greetable
  attr_reader :name

  def initialize(name)
    @name = name
  end
end

cls = MyClass.new('鈴木三郎')
puts cls.greet
