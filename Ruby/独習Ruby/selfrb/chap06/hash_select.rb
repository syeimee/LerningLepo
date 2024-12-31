h = { orange:'みかん', cherry:'さくらんぼ', melon:'めろん' }
p h.select { |key, value| key.length > 4 && value.length > 4 }
