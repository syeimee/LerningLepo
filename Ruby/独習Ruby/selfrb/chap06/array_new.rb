list = Array.new
p list	
list2 = Array.new(5)
p list2
list3 = Array.new(5, 'None')
p list3
list4 = Array.new(5) do |i|
  "None#{i}"
end
p list4

list3[0].concat('!!!')
p list3
