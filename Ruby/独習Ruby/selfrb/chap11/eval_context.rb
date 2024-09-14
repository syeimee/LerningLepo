class MyClass
  def bind_info
    msg = 'ローカル変数'
    binding
  end
end

# eval 'puts bind_info'
# eval 'puts msg'

b = MyClass.new.bind_info
eval 'puts bind_info', b
eval 'puts msg', b

# MyClass.new.instance_eval 'puts bind_info'

# MyClass.new.instance_eval do |obj|
#   puts bind_info
# end

# Binding経由でコンテキスト配下のローカル変数にアクセス
puts b.local_variables
puts b.local_variable_defined?(:msg)
b.local_variable_set(:msg, 'Local Variable')
puts b.local_variable_get(:msg)
puts b.receiver
