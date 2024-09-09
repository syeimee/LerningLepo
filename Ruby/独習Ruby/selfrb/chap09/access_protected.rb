class MyClass
  attr_accessor :value
  # private :value=
  protected :value=

  def initialize(value)
    @value = value
  end

  def swap(other)
    self.value, other.value = other.value, self.value
  end
end

c1 = MyClass.new(5)
c2 = MyClass.new(3)
c1.swap(c2)
p c1, c2
