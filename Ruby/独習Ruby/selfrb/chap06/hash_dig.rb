h = { hoge: { foo: { bar: 100 } } }
p h.dig(:hoge, :foo, :bar)
p h.dig(:hoge, :piyo, :bar)
