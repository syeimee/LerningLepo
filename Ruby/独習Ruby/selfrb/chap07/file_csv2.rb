require 'csv'

CSV.open('./chap07/data2.tsv', col_sep: "\t", headers: false) do |csv|
  csv.each do |row|
    row.each do |value|
      puts value
    end
    puts '--------'
  end
end
