tm = Time.new(2021, 6, 25, 11, 37, 25, '+08:00')
tm2 = tm + (5 * 60 * 60 * 24 * 7)
puts tm2.strftime('%Y年 %m月 %d日 %I時 %M分 %S秒')
