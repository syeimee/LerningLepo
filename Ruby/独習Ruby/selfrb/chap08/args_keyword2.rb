def get_triangle(opts ={})
  opts = {base: 5, height: 1}.merge(opts)
  opts[:base] * opts[:height] / 2.0
end

puts get_triangle(height: 10, base: 2)
# puts get_triangle({height: 10, base: 2})