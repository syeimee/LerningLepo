def get_triangle(base, height)
  base * height / 2.0
end

return unless $0 == __FILE__
puts get_triangle(10, 2)
