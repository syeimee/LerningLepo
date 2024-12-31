h = { orange: 'ミカン', apple: 'リンゴ', melon: 'メロン', olive: 'オリーブ' }

p h.transform_keys { |key| key[0] }
p h.transform_values { |value| value * 2 }
