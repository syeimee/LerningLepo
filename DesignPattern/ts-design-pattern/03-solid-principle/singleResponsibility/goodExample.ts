export { };

class EmpployeeData {
    constructor(
        public name: string,
        public department: string
    ) { }
}

class PayCaluclator {
    private getRegularHours(){
        console.log("給与計算用の労働時間計算ロジック");
    }

    calculatePay(employee: EmpployeeData) {
        this.getRegularHours();
        console.log(`${employee.name}の給与を計算しました`);
    }
}

class HourReporter {
    private getRegularHours(){
        console.log("労働時間レポート用の労働時間計算ロジック");
    }

    reportHours(employee: EmpployeeData) {
        this.getRegularHours();
        console.log(`${employee.name}の労働時間をレポートしました`);
    }
}

class EmployeeRespository {
    save(){}
}

function run(){
    const emp = new EmpployeeData('山田', '開発');
    const payCalculator = new PayCaluclator();
    const hourReporter = new HourReporter();

    console.log('');
    console.log('経理部門');
    payCalculator.calculatePay(emp);

    console.log('');
    console.log('人事部門');
    hourReporter.reportHours(emp);
}

run();