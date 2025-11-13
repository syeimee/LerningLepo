export {};

// 従業員の職位
type Grade = 'junior' | 'middle' | 'senior';

class Employee {
  constructor(public name: string, public grade: Grade) {}
}

class BonusCalculator {
  constructor(public base: number) {}

  getBonus(employee: Employee): number {
    if (employee.grade === 'junior') {
      return Math.floor(this.base * 1.1);
    } else if (employee.grade === 'middle') {
      return Math.floor(this.base * 1.5);
    } else if (employee.grade === 'senior') {
      return Math.floor(this.base * 2);
    } else {
      return Math.floor(this.base * 3);
    }
  }
}

function run() {
  const emp1 = new Employee('Yamada', 'junior');
  const emp2 = new Employee('Suzuki', 'middle');
  const emp3 = new Employee('Tanaka', 'senior');

  const bonusCalculator = new BonusCalculator(100);

  console.log(bonusCalculator.getBonus(emp1));
  console.log(bonusCalculator.getBonus(emp2));
  console.log(bonusCalculator.getBonus(emp3));
}

run();
