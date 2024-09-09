require 'csv'

CSV.open('./chap07/data.tsv', col_sep: "\t", headers: true) do |csv|
  csv.each do |row|
    row.each do |header, value|
      puts "#{header}：#{value}"
    end
    puts '--------'
  end
end
