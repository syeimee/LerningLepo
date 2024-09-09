module MyString
  refine String do
    def titlecase
      self[0].upcase + self[1..].downcase
    end
  end
end
