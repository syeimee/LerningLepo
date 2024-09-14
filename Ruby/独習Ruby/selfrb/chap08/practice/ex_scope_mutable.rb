def increment(num)
  num += 10
  num
end

def param_update(data)
  data[0] = 100
  data
end


num = 100
data = [10, 20, 30]	
  
p increment(num)
p num
p param_update(data)
p data
