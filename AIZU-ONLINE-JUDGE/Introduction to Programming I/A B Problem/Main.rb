# https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=ITP1_4_A&lang=ja

require 'bigdecimal'
require 'bigdecimal/util'
def main

 # step1　整数a,bを読み込む
 a, b = gets.chomp.split.map(&:to_i)

 # step2 a ÷ b ： d (整数)を計算
  d_result = a / b
  p d_result

 # step3 a ÷ b の余り ： r (整数)
  r_result = a % b
  p r_result

 # step4 a ÷ b ： f (浮動小数点数)
  f_result = (a.to_d / b.to_d).round(8)

  #   %.8f の意味:
  # % はフォーマット指定子の開始。
  # .8 は小数点以下の桁数を指定。
  # f は通常の小数表記を指定。
  puts format('%.8f', f_result)
end

main