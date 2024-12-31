require 'net/http'

uri = URI.parse('https://wings.msn.to/tmp/post.php')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

res = http.post(uri.path,
  URI.encode_www_form({ name: '佐々木新之助' }),
  { 'content-type': 'application/x-www-form-urlencoded' })

# res = http.get("#{uri.path}?#{URI.encode_www_form({ name: '佐々木新之助' })}")

# res = Net::HTTP.post_form(uri, { name: '佐々木新之助' })
if res.code.to_i == 200
  puts res.body
else
  puts "#{res.code}: #{res.message}"
end
