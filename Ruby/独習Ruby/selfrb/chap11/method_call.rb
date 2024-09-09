msg = 'https://wings.msn.to/'
start_method = msg.method(:start_with?)
p start_method.call('https://')
