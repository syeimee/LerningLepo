require_relative 'block_args_call'

data = ['リンゴ', 'ミカン', 'メロン', 'イチゴ']
p = Proc.new {|item| puts item }
# p = proc {|item| puts item }
block_proc(data, &p)
