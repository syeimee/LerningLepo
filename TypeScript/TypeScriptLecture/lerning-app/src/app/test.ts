import { emitWarning } from "process";
import { rootCertificates } from "tls";

export const test = () => {

    /**
     *  ①データ型について
     * 
     * */
    const dataType = () => {

        const name: string = "Mike"; //string型
        const age: number = 20; //number型
        const isAdult: boolean = true; //boolean型
        const hobbies: string[] = ["sports", "cooking"]; //Array型
        const address: object = {
            city: "Tokyo",
            country: "Japan"
        }//object型
        const today: Date = new Date(); //Date型
        const none: null = null; //null型
        const notDefined: undefined = undefined; //undefined型
        const randaom: any = "hello"; //any型
        const gender: "male" | "female" = "male"; //union型
        const value: string | number | null = "Hello World"; //union型(複数の型を指定できる)
    }

    /**
     * 問題
     *  引数に文字列の配列を受け取り、その中身の順番を逆にして返す関数を作成する
     * 
     * 引数　arr : string[]
     * 戻り値　string[]型
     * オプション引数　?をつけることで、引数を省略可能にすることができる
     */
    const recerseArray = (arr: string[], unReverse?: boolean): string[] => {
        const reversedArr: string[] = [];

        let index: number = arr.length - 1;
        while (index >= 0) {
            reversedArr.push(arr[index]);
            index--;
        }

        if(unReverse) {
            return arr;
        }
        // for(let i = 0; i < arr.length; i++){
        //     reversedArr[i] = arr[arr.length - 1 - i];
        // }
        return reversedArr;
    }

    console.log(recerseArray(["apple", "banana", "orange"])); // ["orange", "banana", "apple"]
    console.log(recerseArray(["apple", "banana", "orange"], true)); // ["apple", "banana", "orange"]

    /**
     *  ②オブジェクトの型定義
     * 
     * */
    const obejectType = () =>{
        const user1 ={
            userId: 1,
            name: "Mike",
            age: 20,
            email: "test@gmail.com",
            isActive: true,  
        }
        const user2 ={
            userId: "1",
            name: "Mike",
            age: 20,
            email: "test@gmail.com",
            isActive: true,  
        }

        //オブジェクトの型定義では、インターフェースを使用することができる
        interface UserProps{
            userId: number;
            name: string;
            age: number;
            email: string;
            isActive: boolean;
        }

        const createUser = (accountInfo: UserProps) => {
            console.log(accountInfo);
        }

        createUser(user1);//{userId: 1, name: 'Mike', age: 20, email: 'test@gmail.com', isActive: true}

        //createUser(user2);//error: Type 'string' is not assignable to type 'number'.ts(2322)
        //user2はuserIdがstring型なので、UserPropsの型定義に合わないためエラーになる

        //Userを拡張して、AdminUserを作成する
        interface AdminUserProps extends UserProps{
            role: string; //"admin" | "user"
        }

        const adminUser = {
            userId: 1,
            name: "Admin",
            age: 20,
            email: "test@gmail.com",
            isActive: true, 
            role : "admin"
        }

        const createAdminUser = (accountInfo: AdminUserProps) => {
            console.log(accountInfo);
        }

        createAdminUser(adminUser);// {userId: 1, name: 'Mike', age: 20, email: 'test@gmail.com', isActive: true, role: 'admin'}
    }
    obejectType();

    /**
     * ③クラスの定義
     */
    class User{

        //クラスの型定義
        userId: number;
        name: string;
        age: number;
        email: string;
        isActive: boolean;

        constructor(userId: number, name: string, age: number, email: string, isActive: boolean){
            this.userId = userId;
            this.name = name;
            this.age = age;
            this.email = email;
            this.isActive = isActive;
        }

        getUserInfo(){
            return {
                userId: this.userId,
                name: this.name,
                age: this.age,
                email: this.email,
                isActive: this.isActive
            }
        }

        public getUserName(): string{
            return `name ${this.name}`;
        }

        private getEmail(): string{
            return `email ${this.email}`;
        }

        protected getUserId(): number{
            return this.userId;
        }
        //protectedは継承したクラスからアクセスできる
        //privateはそのクラス内からしかアクセスできない
        //publicはどこからでもアクセスできる
        //publicは省略可能

        //voidは戻り値がない、staticはどこからでもアクセスできる
        static sayHelloWorld():void{
            console.log(`${this.name}さん Hello World`);
        }
    }

    class AdminUser extends User{
        role: string;
        constructor(userId: number, name: string, age: number, email: string, isActive: boolean, role: string){
            super(userId, name, age, email, isActive);
            this.role = role;
        }

        getInfo(){
            return this.getUserId();
        }
    }

    const user = new User(100,"Tom",2,"test@gmail.com",true);//Instansiateして
    User.sayHelloWorld();//static メソッドを呼ぶ
    console.log(user.getUserInfo());//クラスメソッドを呼ぶ
    console.log(user.getUserName());//public クラスメソッドを呼ぶ
    //console.log(user.getEmail());//private クラスメソッドは呼べない
    //console.log(user.getUserId());//protected クラスメソッドは呼べない
    const adminUser = new AdminUser(100,"Tom",2,"test@gmail.com",true,"admin");
    console.log(adminUser.getInfo());//protected サブクラスからは呼べる

    /**
     * ④ジェネリクス
     * 
     * */
    const generic = <T> (arg: T ) : T => {
        return arg;
    }
    console.log(generic<string>("Hello World"));//Hello World

    /**
     * ⑤null型合体演算子
     */
    const nullishCoalescing = () => {
        const userName: string | null = null;
        const defaultName: string = "Mike";
        //userNameがnullまたはundefinedの場合はdefaultNameを返す
        const name = userName ?? defaultName;
        console.log(name);//Mike
    
    }
    nullishCoalescing();

    /**
     * ⑥オプショナルチェーン
     */
    const optionalChaining = () => {
        const user = {
            name: "Mike",
            age: 20,
            address: {
                city: "Tokyo",
                country: "Japan"
            }
        }
        const user2 = null
        //userがnullまたはundefinedの場合はundefinedを返す
        const city = user?.address?.city;
        console.log(city);//Tokyo
        //userがnullまたはundefinedの場合はundefinedを返す
        const country = user2?.address;
        console.log(country);//undefined
    }

    optionalChaining();

}
