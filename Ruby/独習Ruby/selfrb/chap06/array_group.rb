data = ['さとう', 'しお', 'す', 'しょうゆ', 'みそ', 'ソース', 'こしょう'] 
p data.group_by { |e| e.length }
