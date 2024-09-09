msg = 'WINGSプロジェクト'

puts msg.include?('プロ')
puts !msg.include?('プロ')
puts msg.start_with?('WINGS')
puts msg.end_with?('クツ', 'クト')
puts msg[2..6].include?('プロ')
