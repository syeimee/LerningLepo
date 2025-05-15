# https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=ITP1_4_D
def main
  n = gets.to_i
  a = []


  a += gets.chomp.split.map(&:to_i)

  min = a.min
  max = a.max

  sum = 0

  a.each do |i|
    sum += i
  end

  puts "#{min} #{max} #{sum}"
end

main