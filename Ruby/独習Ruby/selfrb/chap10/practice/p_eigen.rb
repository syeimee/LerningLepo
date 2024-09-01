class Area
  class << self
    def triangle(base, height)
      base * height / 2
    end
  end
end

puts Area.triangle(10, 5)
