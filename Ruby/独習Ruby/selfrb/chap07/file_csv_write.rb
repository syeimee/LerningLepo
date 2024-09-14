require 'csv'

CSV.open('./chap07/member.tsv', 'w', col_sep: "\t", force_quotes: true) do |csv|
  csv << %w(101 山田太郎 090-1111-2222)
  csv << %w(102 鈴木次郎 080-3333-4444)
  csv << %w(103 佐藤花子 070-5555-6666)
end
