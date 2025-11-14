export {};
interface Flyable {
    fly();
}

interface Moveable {
    start();
    stop();
}

interface Vehivle {
    name: string;
    color: string;
}

class Airplane implements Flyable, Moveable, Vehivle {
    name: string;
    color: string;

    start(){
        console.log('start!');
    }

    stop(){
        console.log('stop!');
    }

    fly(){
        console.log('fly!');
    }
}

class Car implements Moveable, Vehivle {
    name: string;
    color: string;

    start(){
        console.log('start!');
    }

    stop(){
        console.log('stop!');
    }
}

function run(){
    const v1 = new Airplane();
    const v2 = new Car();

    v1.fly();
    v2.start()
}

run();