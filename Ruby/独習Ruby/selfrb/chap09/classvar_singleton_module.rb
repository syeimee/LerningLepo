require 'singleton'

class MySingleton
  include Singleton
end

m1 = MySingleton.instance
m2 = MySingleton.instance

p m1
p m2
