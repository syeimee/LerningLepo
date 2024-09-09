class MyStruct
  def initialize
    @attrs = {}	
  end

  def method_missing(name, *args)
    attr_name = name.to_s
    if attr_name.end_with?('=')
      @attrs[attr_name.chop] = args[0]
    else
      @attrs[attr_name]
    end
  end
end

ms = MyStruct.new
ms.name = '鈴木次郎'
puts ms.name
