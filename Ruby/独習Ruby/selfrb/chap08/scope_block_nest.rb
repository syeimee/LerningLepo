data = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]
header = "値-> "

data.each do |e|
  e.each do |eu|
    puts "#{header}#{eu}"
  end
end
