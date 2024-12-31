require 'fileutils'

FileUtils.mkdir_p('./chap07/sub/gsub')
puts 'Hit any key...'; gets
FileUtils.rm_r('./chap07/sub')
