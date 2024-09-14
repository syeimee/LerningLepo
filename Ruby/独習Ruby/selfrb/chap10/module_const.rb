module Area
  PI = 3.14159265359

  module_function
  def circle(radius)
    radius * radius * PI
  end
end

puts Area::PI
puts Area.circle(5)
