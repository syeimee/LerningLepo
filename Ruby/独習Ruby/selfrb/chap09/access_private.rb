class MyParent
  private
  def hoge
    puts 'Hoge'
  end
end

class MyChild < MyParent
  def show
    hoge
  end
end

c = MyChild.new
c.show
