# https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=ITP1_3_C&lang=ja#

def main
  lines = []

  while true
    # step1 1行ずつ読み込む
    line = gets.chomp

    # step2　0,0が入力されたら終了
    break if line == "0 0"
    
    # step3　読み込んだ値を配列に格納する
    lines << line
  end

  lines.each do |line|
    # step4　読み込んだ値を分割する
    a, b = line.split.map(&:to_i)
    if a > b
        a, b = b, a
    end
    # step5　入れ替えた値を出力する
    puts "#{a} #{b}"
    p 1
  end
end

main

