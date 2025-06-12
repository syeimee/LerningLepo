class Area
  def self.circle(radius)
    radius * radius * 3.14
  end

  def show(radius)
    puts "結果：#{self.class.circle(radius)}"
  end
end

puts Area.circle(2)
a = Area.new
# puts a.circle(2)
a.show(2)
