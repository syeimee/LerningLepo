class Roulette < Random
  def initialize(bound)
    super()
    @bound = bound
  end

  def rand
    super(1..@bound)
  end

  undef_method :bytes, :seed
end

rd = Roulette.new(10)
puts rd.bytes(5)
