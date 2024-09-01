require_relative 'func'

# def show_triangle(format, base, height)
#   result = get_triangle(base, height)
#   printf(format, result)
# end

def show_triangle(format, ...)
  result = get_triangle(...)
  printf(format, result)
end
show_triangle('三角形の面積は%.2fです。', 10, 20)
