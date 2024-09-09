msg = ' ねこ いぬ たぬき '
msg2 = 'ねこ|いぬ|たぬき|'

p msg.split
p msg.split(' ')
p msg.split('')
p msg2.split('|', 2)
p msg2.split('|', 0)
p msg2.split('|', -1)
