Person = Struct.new(:name, :age, keyword_init: true) do
  def initialize(name: '権兵衛', age: 10)
    super
  end
end

ps = Person.new(name: '鈴木次郎')
puts ps
