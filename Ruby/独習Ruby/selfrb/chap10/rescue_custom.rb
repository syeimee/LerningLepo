class MyAppError < StandardError
end

class MyInputError < MyAppError
  attr_reader :code

def initialize(code)
  super("Invalid Input: #{code}")
  @code = code
  end
end

begin
  raise MyInputError.new(501)
rescue MyAppError => e
  puts e.message
end
