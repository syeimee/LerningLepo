class Parent
  @@value = 'クラス変数'
  @value = 'クラスインスタンス変数'

  def show
    p @@value
    p @value
  end

  def self.show
    p @@value
    p @value
  end
end

class Child < Parent
  def self.show
    p @@value
    p @value
  end
end

Parent.new.show
Parent.show
Child.show
