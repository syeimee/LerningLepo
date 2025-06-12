msg = 'https://wings.msn.to/'
start_method = String.instance_method(:start_with?)
p start_method.bind(msg).call('https://')

# bind_method = msg.method(:start_with?)
# unbind_method = bind_method.unbind
# p unbind_method.bind(msg).call('https://')
