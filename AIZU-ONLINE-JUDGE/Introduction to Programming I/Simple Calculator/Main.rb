def calculate(a, b, op)
  result = 0
  case op
  when "+"
    result = a + b
  when "-"
    result = a - b
  when "*"
    result = a * b
  when "/"
    result = a / b
  else
    "Error: Invalid operator"
  end

  return result
end

def main
  results = []

  while true
    a, op, b = gets.chomp.split
    a = a.to_i
    b = b.to_i

    if op != "?"
      results << calculate(a, b, op)
    else
      break
    end
  end

  results.each do |result|
    puts result
  end

end

main