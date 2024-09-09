File.open('./chap07/input.png', 'rb') do |infile|
  File.open('./chap07/output.png', 'wb') do |outfile|
    while d = infile.read(1)
      outfile.write(d)
    end
  end
end
