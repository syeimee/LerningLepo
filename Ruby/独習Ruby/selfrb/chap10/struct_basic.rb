Person = Struct.new(:name, :age)

ps1 = Person.new('佐藤幸助', 18)
ps2 = Person.new('佐藤幸助', 18)
puts ps1
puts ps1.name
puts ps1 == ps2
# puts ps1[:name]
