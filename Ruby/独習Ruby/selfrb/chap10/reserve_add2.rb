class Coordinate
  attr_reader :x, :y

  def initialize(x, y)
      @x = x
      @y = y
  end

  def +(other)
    case other
      when Coordinate
        Coordinate.new(
          self.x + other.x,
          self.y + other.y
        )
      when Integer, Float
        Coordinate.new(
          self.x + other,
          self.y + other
        )
      else
        raise TypeError, 'type must be Coordinate or Integer, Float.'
    end
  end

  def to_s
      "(#{self.x}, #{self.y})"
  end
end

c1 = Coordinate.new(10, 20)
c2 = Coordinate.new(15, 25)
puts c1 + c2
puts c1 + 3
puts c1 + 10.5
