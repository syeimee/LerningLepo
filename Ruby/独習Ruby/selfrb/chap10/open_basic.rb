class String
  def titlecase
    self[0].upcase + self[1..].downcase
  end
end

puts 'wInGs'.titlecase
