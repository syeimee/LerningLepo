require 'net/http'

uri = URI.parse('https://wings.msn.to/')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true
res = http.get(uri.path)
puts res.code
