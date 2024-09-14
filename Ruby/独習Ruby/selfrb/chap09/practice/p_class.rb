class Pet
  attr_reader :kind, :name

  def initialize(kind, name)
    @kind = kind
    @name = name
  end

  def show
    puts "私のペットは#{kind}の#{name}ちゃんです！"
  end
end

pt = Pet.new('ハムスター', 'のどか')
pt.show
