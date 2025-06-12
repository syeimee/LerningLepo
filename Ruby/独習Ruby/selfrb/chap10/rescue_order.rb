begin
  '𠮟る'.encode(Encoding::Windows_31J)
rescue StandardError
  puts 'StandardError'
rescue EncodingError
  puts 'EncodingError'
rescue Encoding::UndefinedConversionError
  puts 'Encoding::UndefinedConversionError'
end
