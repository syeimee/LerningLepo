class MyClass  
  @@value1 = 10
  @@value2 = 50
  PI = 3.14159265359
end

p MyClass.class_variables
p MyClass.class_variable_defined?(:@@value1)
p MyClass.class_variable_set(:@@value3, 200)
p MyClass.class_variable_get(:@@value3)
p MyClass.constants
p MyClass.const_set('TAX', 1.1)
p MyClass.const_get('TAX')
