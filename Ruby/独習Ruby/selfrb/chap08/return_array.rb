def get_max_min(*args)
  return args.max, args.min
  # [args.max, args.min]
end

max_v, min_v = get_max_min(10, 108, 2, -5, 3, 78)
puts "最大値：#{max_v}"
puts "最小値：#{min_v}"
