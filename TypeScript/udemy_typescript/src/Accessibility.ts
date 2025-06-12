class Accessibility {
    name: String = "";
    private age: number = 0;

    constructor(name: String, age: number) {
        this.name = name;
        this.age = age;
    }

    isAdult(): boolean {
        return this.age >= 18;
    }

    getAge(): number {
        return this.age;
    }
}

const olivia = new Accessibility("Olivia", 20);
console.log(olivia.name);  // "Olivia"
console.log(olivia.getAge());  // 20
// console.log(olivia.age);//これはエラー
