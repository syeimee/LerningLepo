class MyClass
  def do_add(x, y)
    x.to_i + y.to_i
  end
    
  def do_minus(x, y)
    x.to_i - y.to_i
  end
end

cls = MyClass.new 
name = "do_#{ARGV.shift}"
if cls.respond_to?(name)
  # p cls.send(name, *ARGV)
  p cls.__send__(name, *ARGV)
  # p cls.public_send(name, *ARGV)
else
  puts '指定のコマンドはありません！'
end
