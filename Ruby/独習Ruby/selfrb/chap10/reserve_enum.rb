class Prime
  include Enumerable

  def initialize(max)
    @max = max
  end

  def each
    (2..@max).each do |num|
      yield num if prime?(num)
    end
  end

  private
  def prime?(value)
    result = true
    (2...Math.sqrt(value).floor + 1).each do |i|
      if value % i == 0
        result = false
        break
      end 
    end
    result
  end
end

pm = Prime.new(100)
pm.select {|i| i > 10}.take(5).each do |p|
  puts p
end
