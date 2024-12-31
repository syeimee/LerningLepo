require 'net/http'

uri = URI.parse('https://codezine.jp/')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true
res = http.get(uri.path)
if res.code.to_i == 200
  puts res.body
else
  puts "#{res.code}: #{res.message}"
end
