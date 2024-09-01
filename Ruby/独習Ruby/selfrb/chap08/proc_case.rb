num = 15
case num
  when Proc.new {|n| n % 2 == 0}
    puts 'Even'
  when Proc.new {|n| n % 2 != 0}
    puts 'Odd'
end
