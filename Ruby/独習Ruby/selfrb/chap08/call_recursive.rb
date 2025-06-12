def factorial(num)
  return num * factorial(num - 1) unless num == 0
  1
end  

puts factorial(5)
