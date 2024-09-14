h = { orange:'みかん', grape:nil, melon:'めろん', apple:nil }
h.delete_if { |key, value| value.nil? }
p h
