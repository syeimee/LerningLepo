rank = '甲'

case rank
  when /甲|乙/
    puts '合格！'
  when /丙|丁/
    puts '不合格...'
  else
    puts '？？？'
end
