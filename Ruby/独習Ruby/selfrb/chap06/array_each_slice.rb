data = ['山田', '鈴木', '日尾', '佐藤', '井上', '本多', '掛谷']
data.each_slice(3) do |ary|
  p ary
end
