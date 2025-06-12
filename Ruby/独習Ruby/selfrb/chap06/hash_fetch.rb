h = {}
puts h.fetch(:orange, '×')
puts h.fetch(:orange) { |key| "No #{key}" }
