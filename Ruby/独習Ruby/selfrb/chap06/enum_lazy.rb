enum = (1..).lazy.select { |i| i % 5 == 0 }.take(10)
p enum.force

# enum = (1..).lazy.select { |i| i % 5 == 0 }
# p enum.first(10)
