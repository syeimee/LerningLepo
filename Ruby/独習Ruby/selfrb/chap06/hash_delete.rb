h = { orange:'みかん', grape:'ぶどう', melon:'めろん' }
p h.delete(:orange)
p h.delete(:apple)
p h.delete(:apple) { |key| "No #{key}" }
