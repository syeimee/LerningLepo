def total_products(*values)
  raise ArgumentError, '引数は1個以上指定してください。' if values.empty?
  # ...中略...
end

puts total_products
