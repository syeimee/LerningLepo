export {};

class Employee {
  constructor(public name: string, public department: string) {}

  // 経理部門がアクター
  calculatePay() {
    this.getRegularHours();
    console.log(`${this.name}の給与を計算しました`);
  }

  // 人事部門がアクター
  reportHours() {
    this.getRegularHours();
    console.log(`${this.name}の労働時間をレポートしました`);
  }

  // データベース管理者がアクター
  save() {
    console.log(`${this.name}を保存しました`);
  }

  private getRegularHours() {
    // 仕様変更前
    console.log('経理部門・人事部門共通のロジック');

    // 仕様変更後
    // console.log('経理部門の仕様変更済み');
  }
}

function run() {
  const emp = new Employee('山田', '開発');

  console.log('');
  console.log('経理部門');
  emp.calculatePay();

  console.log('');
  console.log('人事部門');
  emp.reportHours();
}

run();
