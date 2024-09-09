class MySingleton
  private_class_method :new

  @@instance = new

  def self.instance
    @@instance
  end
end

m1 = MySingleton.instance
m2 = MySingleton.instance

p m1
p m2
