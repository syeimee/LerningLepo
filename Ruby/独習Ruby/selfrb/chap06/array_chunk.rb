data = ['白菜', 'ねぎ', '150', '水菜', '人参', '120'] 

data.chunk { |e|
  e.match?(/^[0-9]+$/)
}.each { |result, data|
  p [result, data]
}
