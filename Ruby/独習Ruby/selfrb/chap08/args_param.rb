def total_products(*values)
  result = 1
  values.each do |value|
    result *= value
  end
  result
end

puts total_products(12, 15, -1)
puts total_products(5, 7, 8, 2, 1, 15)
