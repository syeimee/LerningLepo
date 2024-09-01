class MyClass
  def public_method; end

  def self.class_method; end

  protected
  def protected_method; end

  private
  def private_method; end
end

cz = MyClass.new
def cz.singleton_method; end

p cz.methods
p cz.methods(false)
p cz.public_methods(false)
p cz.protected_methods(false)
p cz.private_methods(false)
p MyClass.singleton_methods
p cz.singleton_methods
