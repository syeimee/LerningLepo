Person = Struct.new(:name, :age, keyword_init: true)

ps = Person.new(name: '鈴木次郎')
puts ps
