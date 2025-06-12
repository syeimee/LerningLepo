class String
  alias :strip_org :strip

  def strip
    gsub(/\A(\s|　)+|(\s|　)+\Z/, '')
  end
end

str = "  　Ruby\n\t　　　"
puts "「#{str.strip}」"
puts "「#{str.strip_org}」"
