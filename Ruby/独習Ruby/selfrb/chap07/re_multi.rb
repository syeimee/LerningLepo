msg = "初めまして。\nよろしくお願いします。"
# if result = /\A.+/.match(msg)
if result = /\A.+/m.match(msg)
  puts result
end
