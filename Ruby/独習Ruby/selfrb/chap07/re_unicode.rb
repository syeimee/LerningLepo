msg = 'ただいまWINGSプロジェクトメンバー募集中です！'
p msg.scan(/[\p{Hiragana}]+/)
p msg.scan(/[\p{Katakana}ー]+/)
p msg.scan(/[\p{Han}]+/)
