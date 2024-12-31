require_relative 'refine_def'

class Hoge
  using MyString

  def show
    'rUbY'.titlecase
  end
end

class Hoge
  def show2
    'rUbY'.titlecase
  end
end


puts Hoge.new.show
puts 'rUbY'.titlecase
# puts Hoge.new.show2
