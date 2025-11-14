export {};
interface IEmployee {
    name: string;
    getBonus(base: number): number;
}

class JuniorEmployee implements IEmployee {
    constructor(public name: string){};

    getBonus(base: number): number {
        return Math.floor(base * 1.1);
    }
}

class MiddleEmployee implements IEmployee {
    constructor(public name: string){};
    
    getBonus(base: number): number {
        return Math.floor(base * 1.5);
    }
}

class SeniorEmployee implements IEmployee {
    constructor(public name: string){};
    
    getBonus(base: number): number {
        return Math.floor(base * 2);
    }
}

class ExpertEmployee implements IEmployee {
    constructor(public name: string){};
    
    getBonus(base: number): number {
        return Math.floor(base * 2);
    }
}

function run() {
    const emp1 = new JuniorEmployee('Yamada');
    const emp2 = new MiddleEmployee('Suzuki');
    const emp3 = new SeniorEmployee('Tanaka');
    const emp4 = new ExpertEmployee('Tanaka');

    const base = 100;

    console.log(emp1.getBonus(base));
    console.log(emp2.getBonus(base));
    console.log(emp3.getBonus(base));
    console.log(emp4.getBonus(base));
}

run();