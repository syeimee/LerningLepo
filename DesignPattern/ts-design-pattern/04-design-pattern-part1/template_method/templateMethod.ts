export {}

abstract class TestTemplate {
    test(){
        this.setup();
        this.execute();
        this.teardown();

    }
    abstract setup();
    abstract execute();
    teardown(){
        console.log("teardown");
    }
}

class ItemServiseTest extends TestTemplate{
    setup(){
        console.log("setup ItemServiseTest");
    }
    execute(){
        console.log("execute ItemServiseTest");
    }
}

class UserServiceTest extends TestTemplate{
    setup(){
        console.log("setup UserServiceTest");
    }
    execute(){
        console.log("execute UserServiceTest");
    }
}

function run(){
    const itemServiseTest = new ItemServiseTest();
    const userServiceTest = new UserServiceTest();

    itemServiseTest.test();
    console.log("");
    userServiceTest.test();

}

run();