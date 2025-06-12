data = ['赤', '白', '緑'].freeze
data2 = data.clone(freeze: false)
p data.frozen?
p data2.frozen?
