# value = 2
# puts value.nil?? '値なし':value

# NUMBER = 9

# dif_number = NUMBER - 2

# puts dif_number

# # puts 10 + '20'


# array = [2, 4, [6, 8, 10]]

# x, y, z = array

# p x,y,z


# m = "numOfM"
# n = "numOfN"

# m, n = n, m
# puts m,n

# puts (0.1r*3r).to_f



# SCORE = 40


# if SCORE >=90
#     puts "優"
# elsif SCORE >= 70
#     puts "良"
# elsif SCORE >= 50
#     puts "可"
# else 
#     puts "不可"

# end





# (1..9).each do |number|
#     (1..9).each do |num|
#         print "#{number * num} "
#     end
#     print "\n"

# end

# sum = 0

# 101.times do |i|  
#   next if i % 2 != 0
#   sum += i 
# end

# puts "合計値は#{sum}です。"

# sum = 0
# loop do


# end


# x = 100

# unless x === 0
#   puts "ゼロではありません"
# end

# numbers = [1,2,3,4,5]

# numbers.each do | number |
#   puts number
# end

# x = 1
# while x <= 100
#   puts x
#   x += 1
# end

# value = :ruby
# case value 
# when String then puts "文字列"
# when Symbol then puts "シンボル"
# else puts "その他"
# end

# numbers = [1,2,0,5,6,0,8]

# numbers.each do |number|
#   puts number if (number == 0)...(number == 0)
# end

# loop do
#   print "名前を教えてください"
#   name = gets.rstrip
# redo if name ==''
# puts "こんにちは、#{name}さん！"
# break
# end

# sum = 0
# (100...200).each do |num|
#   next if num % 2 == 0
#   sum += num
# end
# puts "合計値は、#{sum}です"

# begin
#   print '名前を教えてください'
#   name = gets.rstrip
#   raise RangeError,'入力がありません。' if name ==''
#   puts "こんにちは、#{name}さん"
# rescue RangeError => ex
#   puts "エラー発生:#{ex.message}"
# retry
# end


# msg = 'あいうえお'
# nmsg = msg.concat('かきくけこ')
# puts msg

# msg = 'プログラミング言語'
# puts msg[4,3]


# msg2 = '鈴木\t太郎\t男\t50歳\t広島県'

# split_msgs = msg2.split('\t')

# split_msgs.each do |msg|
#   puts msg
# end

# require 'date'
# puts Time.now
# puts Date.today


# require 'date'

# puts Time.now
# puts Time.mktime(2021,12,4,11)
# puts Time.new(2021,6,25,0,0,0,'+08:00')

# require 'active_support'
# require 'active_support/core_txt'

# dt = Time.mktime(2021,6,25,11,37,25,103)
# puts dt + 3.hours+20.minutes


# msg = 'となりのきゃくはよくかきくうきゃくだ'

# puts msg.rindex('きゃく')

# printf('%sの気温は %.2f℃です','千葉','17.256')

# msg = '彼女の名前は花子です。'

# puts msg[0..1] 
# msg[0..1] = '俺'
# puts msg



# require 'date'
# time1 = Time.mktime(2021,11,10)
# time2 = Time.mktime(2021,12,4)

# day = (time2 - time1)/60/60/24
# puts day.floor

# msg = "はじめまして\r\n\n"

# puts msg.chomp("")


data = ['A','B','C','D','E']
puts '--------------------------'
puts data

data.push('E')
puts '--------------------------'
puts data

puts '--------------------------'
puts data.pop(2)


puts '--------------------------'
puts data.shift(2)












