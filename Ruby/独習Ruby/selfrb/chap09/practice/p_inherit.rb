class MyClass
  attr_accessor :kind, :name

  def initialize(kind, name)
    @kind = kind
    @name = name
  end

  def show
    "ペットの#{kind}の名前は、#{name}です。"
  end
end

class MySubClass < MyClass
  def show
    "[#{super}]"
  end
end

ms = MySubClass.new('ハムスター', 'のどか')
puts ms.show
