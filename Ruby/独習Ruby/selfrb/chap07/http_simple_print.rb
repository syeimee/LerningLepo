require 'net/http'

uri = URI.parse('https://codezine.jp/')
Net::HTTP.get_print(uri)
