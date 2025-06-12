class MySingleton
  private_class_method :new

  def self.instance
    # @@instance ||= new
    @instance ||= new
  end
end

class MyApp < MySingleton; end
class MyApp2 < MySingleton; end

p MyApp.instance
p MyApp.instance
p MyApp2.instance
