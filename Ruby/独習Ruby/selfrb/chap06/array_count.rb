data = ['ひまわり', 'ばら', 'カサブランカ', 'チューリップ', '萩']
puts data.count('ばら')
puts data.count { |e| e.length > 2 }
