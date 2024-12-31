def get_triangle(base, height)
  raise TypeError, '引数baseは数値で指定します。' unless base.is_a?(Numeric)
  raise TypeError, '引数heightは数値で指定します。' unless height.is_a?(Numeric)
  raise RangeError, '引数baseは正数で指定します。' unless base > 0
  raise RangeError, '引数heightは正数で指定します。' unless height > 0
  base * height / 2
end

# get_triangle(-1, 1)
get_triangle('1', 1)
