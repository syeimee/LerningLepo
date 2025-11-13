export {};

// クラス図 演習1
class Employee {
    private id: number;
    private name: string;
    private slary: number;

    work(){
        console.log('働きます');
    }

    protected getSlary(): number {
        return this.slary;
    }

    protected setSalaty(salary: number){
        this.slary = salary;
    }
}