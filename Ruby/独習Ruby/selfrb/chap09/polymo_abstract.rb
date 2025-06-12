class Figure
  def initialize(width, height)
    @width = width
    @height = height
  end

  def get_area
    raise NotImplementedError, "Not Implemented: #{__method__}"
  end
end

class Triangle < Figure
  def get_area
    @width * @height / 2
  end
end

class Rectangle < Figure
  def get_area
    @width * @height
  end
end

figs = [
  Triangle.new(10, 15),
  Rectangle.new(10, 15),
  Triangle.new(15, 10),
]

figs.each do |fig|
  puts fig.get_area if fig.is_a?(Figure)
end
