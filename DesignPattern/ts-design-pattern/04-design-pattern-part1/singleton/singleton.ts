export {}

class Logger {
    private static instance: Logger;

    //　外部からインスタンス化を防止（シングルトン）
    private constructor(){};

    static getInstance(){
        if(!this.instance){
            this.instance = new Logger();
        }

        return this.instance;
    }

    output(content: string){
        const now = new Date();
        console.log(`${now.toLocaleString('ja-JP')}: ${content}`);
    }
}

class Test {};

function run(){
    const test1 = new Test();
    const test2 = new Test();
    console.log("TESTクラス", test1 === test2);//false 別のインスタンス

    const logger1 = Logger.getInstance();
    const logger2 = Logger.getInstance();
    console.log("Loggerクラス", logger1 === logger2);//true 同一のインスタンス

    logger1.output("logger1のログ");
    logger2.output("logger2のログ");
}

run();