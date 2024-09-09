title = ['部長', '課長', '係長', '主任']
data = [
  {name: '山田太郎', position: '主任'},
  {name: '鈴木次郎', position: '部長'},
  {name: '田中花子', position: '課長'},
  {name: '佐藤恵子', position: '係長'},
]
p data.sort { |m, n| title.index(m[:position]) <=> title.index(n[:position]) }
