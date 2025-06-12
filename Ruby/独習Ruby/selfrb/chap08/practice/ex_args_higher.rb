def process_number(*nums)
  result = []
  nums.each do |value|
    result.push(yield value)
  end
  result
end

p process_number(5, 3, 6) { |value|
  value ** 2
}
