h = { orange: 'ミカン', apple: 'リンゴ' }
h2 = { orange: '蜜柑', melon: 'メロン' }

p h.merge(h2)
p h.merge(h2) { |key, oldval, newval| "#{oldval},#{newval}" }
