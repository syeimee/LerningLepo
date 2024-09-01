def hoge
  foo
end

def foo
  bar
end

def bar
  raise RuntimeError, 'Bar Exception'
end

hoge
