results = []
msg = '100,150;200|250,300;350'
msg.split(/,|\||;/) do |str|
  results << str.to_i
end
p results
