def param_update(data)
  data[0] = 55
  # data = [1, 3, 5]
  data
end

data = [2, 4, 6]
p param_update(data)
p data
