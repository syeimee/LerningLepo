list = ['Ruby', 'Python', 'PHP']

case list
  in ['Java', 'C#', another]
    puts "コンパイル方式：#{another}など"
  in ['Ruby', 'Python', another]
    puts "インタプリター方式：#{another}など"
  in ['Kotlin', another]
    puts "トランスコンパイル方式：#{another}など"
end
