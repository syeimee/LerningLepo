class Area
  PI = 3.14159265359

  def self.circle(radius)
    radius * radius * PI
  end

  # private_class_method :circle
end

puts Area::PI
puts Area.circle(5)
