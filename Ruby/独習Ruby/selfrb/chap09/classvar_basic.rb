class Area
  @@pi = 3.14159265359

  def self.circle(radius)
    radius * radius * @@pi
  end

  def self.pi
    @@pi
  end
end

puts Area.pi
puts Area.circle(5)
