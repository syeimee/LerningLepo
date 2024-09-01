class Coordinate
  include Comparable

  attr_reader :x, :y

  def initialize(x, y)
    @x = x
    @y = y
  end

  def <=>(other)
    if other.instance_of?(Coordinate)
      self.x ** 2 + self.y ** 2 <=> other.x ** 2 + other.y ** 2
    end
  end

  def to_s
    "(#{self.x}, #{self.y})"
  end
end

c1 = Coordinate.new(10, 20)
c2 = Coordinate.new(15, 25)
c3 = Coordinate.new(20, 10)
puts c1 > c2
puts c1 == c3
