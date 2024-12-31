require 'net/http'

uri = URI.parse('https://codezine.jp/')
body = Net::HTTP.get(uri)
puts body
