data = [
  { title: '独習Python', price: 3000 },
  { title: '独習Java 新版', price: 2980 },
  { title: '速習 Vue.js 3 ', price: 636 },
  { title: '速習 Spring Boot', price: 636 },
]
p data.find { |item| item[:price] < 2000 }
# p data.find_all { |item| item[:price] < 2000 }
# p data.reject { |item| item[:price] < 2000 }
