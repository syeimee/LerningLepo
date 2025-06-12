module Area
  module_function

  def triangle(base, height)
    base * height / 2.0
  end

  def circle(radius)
    radius * radius * 3.14
  end
  # module_function :triangle, :circle
end

puts Area.triangle(10, 2)
puts Area.circle(5)
