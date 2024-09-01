msg = '𠮟られて'
encoded = msg.encode('Shift_JIS', undef: :replace, replace: '●')
# encoded = msg.encode('Shift_JIS')
puts encoded
puts encoded.encoding
