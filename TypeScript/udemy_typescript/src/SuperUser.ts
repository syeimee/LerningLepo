class SuperUser{
    private name: String = '';
    private age: number = 20;

    constructor(name: String, age: number){
        this.name = name;
        this.age = age;
    }

    public isAdult(): boolean{
        return this.age >= 18;
    }

    public getAge(){
        return this.age;
    }

    public getName(){
        return this.name;
    }
}