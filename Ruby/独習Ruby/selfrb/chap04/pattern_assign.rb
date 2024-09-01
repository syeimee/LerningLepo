case { title: '独習Java 新版', publisher: '翔泳社',
      authors: ['山田太郎', '鈴木次郎'] }
  in { title: _, publisher: '翔泳社', authors: ['山田太郎', *] => authors }
    puts authors

  # in { title: _, publisher: '翔泳社', authors: ['山田太郎', name] }
  #   puts name

  # in { title: _, publisher: '翔泳社', authors: ['山田太郎', *] } => book
  #   p book
end
