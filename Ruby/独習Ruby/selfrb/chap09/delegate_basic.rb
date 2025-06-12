class Roulette
  def initialize(bound)
    @bound = bound
    @random = Random.new
  end

  def rand
    @random.rand(1..@bound)
  end
end

rd = Roulette.new(10)
puts rd.rand
