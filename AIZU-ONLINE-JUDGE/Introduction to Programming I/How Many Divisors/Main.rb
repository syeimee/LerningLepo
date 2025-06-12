# https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=ITP1_3_D&lang=ja

def main
  #step1 3つの整数a,b,cを読み込む
  a, b, c = gets.chomp.split.map(&:to_i)

  #step2 cの約数かどうかをチェックして、約数であればカウントする
  count = 0
  (a..b).each do |i|
    if c % i == 0
      count += 1
    end
  end

  #step3 約数の個数を出力する
  puts count
end

main