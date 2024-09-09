def get_triangle(base, height)
  base * height / 2.0
end

undef get_triangle
# undef :get_triangle
puts get_triangle(10, 4)
