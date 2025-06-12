class Hamster
  attr_reader :name

  def initialize(name)
    @name = name
  end

  def show(format)
    printf(format, @name)
  end
end

hm = Hamster.new('のどか')
hm.show('私の名前は%sです！')
