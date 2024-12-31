table = { '${to}' => '山田', '${from}' => '権兵衛' }
template = '${to}さん：こんにちは、${from}です。'
puts template.gsub(/\$\{.*?\}/, table)
