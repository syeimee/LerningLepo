require 'net/http'

uri = URI.parse('https://codezine.jp/')
res = Net::HTTP.get_response(uri)
if res.code.to_i == 200
  puts res.body
else
  puts "#{res.code}: #{res.message}"
end
