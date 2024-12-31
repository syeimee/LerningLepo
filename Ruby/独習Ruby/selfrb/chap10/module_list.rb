module MyModule
  def hoge
    puts 'MyModule'
  end
end

module MyModule2
  def hoge
    puts 'MyModule2'
  end
end

class MyParent
  def hoge
    puts 'MyParent'
  end
end

class MyChild < MyParent
  include MyModule
  include MyModule2
  # prepend MyModule
  # prepend MyModule2

  def hoge
    puts 'MyChild'
  end
end

c = MyChild.new

class << c
  def hoge
    puts 'MyChild_eigen'
  end
end

c.hoge

# p MyChild.ancestors
# p MyChild.superclass
# p MyChild.included_modules
