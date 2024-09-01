rank = '甲'

case rank
  when '甲'
    puts '大変良いです。'
  when '乙'
    puts '良いです。'
  when '丙', '丁'
    puts 'がんばりましょう。'
  else
    puts '？？？'
end
