# https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=ITP1_4_B
require 'bigdecimal'
require 'bigdecimal/util'
PI = BigDecimal("3.141592653589")
def main
  # step1　整数rを読み込む
  r = BigDecimal(gets.chomp)
  # step2 円の面積sと円周lを計算
  s = r * r * PI
  l = 2 * r * PI
  # step3 sとlを小数点以下6桁まで表示
  puts format('%.6f', s) + " " + format('%.6f', l)
end

main