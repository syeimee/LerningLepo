title = 'あいうえお'

title[2..3] = '★★'
puts title
title[0, 2] = ''
puts title
title[2, 0] = '◎'
puts title
title['★'] = '☆'
puts title
