Person = Struct.new(:name, :age) do
  def show()
    puts "私の名前は#{name}、#{age}歳です！"
  end
end

ps = Person.new('佐藤幸助', 18)
ps.show
