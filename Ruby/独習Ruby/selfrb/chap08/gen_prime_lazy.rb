primes = Enumerator.new do |y|
  (2..).each do |num|
    y << num if prime?(num)
  end
end.lazy

def prime?(value)
  result = true
  (2...Math.sqrt(value).floor + 1).each do |i|
    if value % i == 0
      result = false
      break
    end 
  end
  result
end

primes.select {|e| e > 100 }.take(10).each do |p|
  puts p
end
