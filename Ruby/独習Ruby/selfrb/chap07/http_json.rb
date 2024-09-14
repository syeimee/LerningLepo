require 'net/http'
require 'json'

uri = URI.parse('https://wings.msn.to/tmp/books.json')
res = Net::HTTP.get_response(uri)

if res.code.to_i == 200
  bs = JSON.parse(res.body)
  puts bs['books'][0]['title']
else
  puts "#{res.code}: #{res.message}"
end
