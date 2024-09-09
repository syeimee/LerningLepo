data = ['ひまわり', 'ばら', 'カサブランカ', 'チューリップ', 'ばら']
p data.index('ばら')
p data.index('None')
p data.index{ |e| e.length > 5 }	
p data.rindex('ばら')
  