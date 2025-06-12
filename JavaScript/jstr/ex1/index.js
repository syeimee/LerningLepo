/*解答----------
file:///Users/yuu/Downloads/Appendix_dokuJS.pdf
-------------*/




// console.log("This is Tom's house.");
// console.log('This is Tom\'s house.');


//pr3.4

// result1 = 5 +6 -1;
// result2 = result1 * 2;
// result3 = result2 %3;
// result4 =result3 **3;
// console.log(result1);
// console.log(result2);
// console.log(result3);
// console.log(result4);


//pr3.6

// let obj = {
//     grape: "ブドウ",
//     subObj: {val: 20, val2: 1000},
//     greeting: function(){
//         console.log("こんにちは");
//     }
// };

// obj.prop = true;
// console.log(obj["prop"]);
// console.log(obj["subObj"]["val2"]);
// obj.greeting();

//pr3.7
// console.log(Boolean(0));
// console.log(Boolean(""));
// console.log(Boolean(null));
// console.log(Boolean(undefined));

//pr3.8
// console.log(1 * true);
// console.log(false + true);
// console.log(Boolean(0));
// console.log(Boolean(1));
// console.log(Boolean(-1));

//章末チェック
// const TAX_RATE = 1.1;
// let productPrice = 1000;

// let payment = TAX_RATE * productPrice;

// console.log("商品の金額は"+productPrice+"円ですので、税込価格は"+payment+"円です。");

// let cal1 = 12 * 2 % 5;
// console.log(cal1);

// const counter = {num: 1};

// console.log(counter.num);
// console.log(counter["num"]);

// console.log(typeof null);
// console.log(100 + true);
// console.log(1 + Number("hello"));
// console.log(1+ Boolean("hello"));

//pr4.2
// console.log(2*3 **2);
// console.log(10/(2+3)-2);
// console.log(10 /2 +(3-2));
// let a = 1;
// console.log( a ++ );
// let c = 10,b = 1;
// console.log(-c * ++b);//インクリメントが先


//pr4.3
// let calc1 = 10 < 2 * 6 -2;
// let calc1 = 3 > 8 % 3;
// let calc1 = (9 > 3)*3;

// console.log(calc1);

//pr4.5
// let person = {name: "Bob",age: "32",male: true};
// delete person.name;
// console.log(person);
// console.log(typeof person);
// console.log(+person.age);
// console.log(!person.male);

//章末チェック
// console.log((10+ 5)*4);

// let a;
// console.log(a);
// console.log(a = 10);
// console.log(a);

// let b = 0;

// console.log(b += 3);
// console.log(b *=4);
// console.log(b /=2);
// console.log(b %=5);
// console.log("b",b);


// console.log((0 || undefined) && "こんにちは");
// console.log(!(0 || undefined) && "こんにちは");

// console.log(null? "りんご":"バナナ");
// console.log(null?? "パイナップル");
// console.log({apple: "りんご"}?.fruit ?? "バナナ");

// const person = { 
//     name: "Bob",
//     age: 22,
//     gender: "male"
// }


// if(person.gender == "male"&& person.age >= 25){
//     console.log(person.name+"は25歳以上の男性です。");
// }else{
//     console.log(person.name + "は25歳以上の男性ではありません");
// }


// let val ;

// if(!val){
//     console.log("hello");
// };

// if(val == null || val == undefined){
//     console.log("Hello");
// };

// let animal ="うさぎ";

// switch(animal){
//     case "うさぎ": console.log("うさぎ");
//     break;
//     case "うま":console.log("うま");
//     break;
//     default: console.log("何かわかりません");
//     break;
// }



//pr 5.4

// try{
//     let b = 10 +addEventListener;
//     console.log(b);
// }finally{
//     console.log("後続の処理")
// }





// try{
//     let greeting = 2;

//     if(typeof greeting !=="string"){
//         throw "greetingは文字型だよん";
//     }


//     console.log(greeting);
// }catch(error){
//     console.error(error);
// }



//pr5.6
// let i =1;

// while(i <= 4){
//     console.log(2*i-2);
//     i++;
// }


//pr5.7
// for(let i = 0; 3 * i < 12;i++){
//     console.log(3 * i);
// }



//pr5.8
// const array = [10,20,23,47];
// let sum = 0;

// for(let i =0 ;i<array.length;i++){
//     sum =sum + array[i];
// }

// console.log(sum);



//pr5.9
// const obj = {
//     prop1: 10,
//     prop2: 20,
//     skip: 20,
//     prp3: 23,
//     prop4: 47,
// }

// let sum = 0;


// for(const key in obj){
//     if(key!= "skip"){
//         // obj[key]の形で書く;
//         sum += obj[key];
//     }
// }

// console.log(sum);




//pr5.10
// const obj = {prop: 3};

// const propDesc = Reflect.getOwnPropertyDescriptor(obj,"length");
// console.log(propDesc);


//pr5.11
// const array = [10,"文字列",20,true,23,47];
// let sum = 0;

// for(const value of array){

//     if(typeof value == "number"){
//         sum += value;
//     }

// }


// console.log(sum);

//pr5.12
// const obj = {
//     prop1: 10,
//     prop2: "文字列",
//     prop3: 20,
//     skip: 20,
//     prop4: true,
//     prop5: 23,
//     prop6: 47,
// }
// let sum = 0;

// const num = Object.values(obj);

// for(const value of num){
//     if(typeof value == "number"){
//         // console.log(value);
//         sum += value;
//     }
// }


// console.log(sum);


//5.13
// const breakTestArry = ["ぬけない","not break","break"," この前で抜ける"];


// for(const value of breakTestArry){
//     if(value == "break"){
//         console.log(value);
//         break;
//     }
//     console.log(value);
// }


//5.14
// for(let i = 1;i<5;i++){


//     if(i == 3){
//         continue
//     }
//     console.log(i + "回目のループです");
// }


//章末問題
// for(let i = 5;i<10;i++){
//     console.log(i);
// }


// for(let i = 1;i<=100;i++){
//     if(i % 3 ==0 && i % 5 ==0){
//         console.log("FizzBuzz");
//     }else if(i % 3 ==0){
//         console.log("Fizz");
//     }else if(i % 5 ==0){
//         console.log("Buzz");
//     }else{
//         console.log(i);
//     }
// }


// const capitals = {
//     日本: "東京",
//     アメリカ: "ワシントン",
//     イギリス: "ロンドン",
// };

// const entries = Object.entries(capitals);

// for(const entry of entries){
//     console.log(entry[0]+"の首都は"+entry[1]+"です");
// }


// try{
//     console.log("tryブロックの処理を開始します");
//     throw "例外を投げました";//throwは意図的にエラーを投げるので、catchが実行される。
//     console.log("tryブロックの処理を終了します");
// }catch(e){
//     console.error("catchブロックの処理を開始します。");
//     console.error("catchした値:"+e);
//     console.error("catchブロックの処理を終了します");
// }finally{
//     console.log("finallyブロックの処理を実行します");
// }

// console.log("try/catch/finally分の接続のコードを実行します");



// //pr6.1
// function multiply (val1,val2){
//     return val1 * val2;
// }


// console.log(multiply(7,9));

// console.log(multiply(-11,9));



// function noArgumentFunc() {
//     console.log("引数がない関数です");
// }


// noArgumentFunc();

// function multiply(val1,val2){
//     let result = val1 * val2;
//     console.log(result);
// }


// multiply(5,6,8);


// function twoArgument(arg1,arg2){
//     console.log("arg1:",arg1);
//     console.log("arg2",arg2);
// }



// twoArgument(5,6);



//pr6.3
// function hello() {
//     console.log("hello world");
// }

// hello();

// function personName(name){
//     console.log("こんにちは、"+name);
// }

// personName("YUU");




// function fn1(){
//     const val =1+1;
//     console.log(val);
// }

// fn1();
// function fn2(){
//     console.log(7%3);
//     return
// }

// fn2();



// greeting();

// function greeting(){
//     console.log("おはよう。お腹が空きました");
// }



// greeting2();

// const greeting2 =function (){
//     console.log("おはよう。お腹が空きました");
// }



//pr6.5

// function clacAreaOfCircle(radius,pi = 3){
//     return radius * radius * pi;
// }

// let result =clacAreaOfCircle(10);
// console.log(result);




//pr6.6
// const obj1 = {num: 3};
// const obj2 = {num: 3};
// let num =3;

// function fn(object1Arg,object2Arg,numberArg){
//     object1Arg.num = 5;
//     object2Arg.num = 5;
//     numberArg = 5;
// }


// fn(obj1,obj2,num);

// console.log(obj1.num);
// console.log(obj2.num);
// console.log(num);


//pr6.7
// function hello(name){
//     console.log("こんにちは"+name);
// }

// const obj = hello;

// obj("独習太郎");



//pr6.8

// function hello(){
//     console.log("こんにちは");
// }


// setTimeout(hello,5000);



//pr6.9
// function plus(a,b){return a+b;}
// function minus(a,b){return a-b;}

// function calc(val1,val2,callback){
//     const result = callback(val1,val2);
//     console.log(result);
// }

// calc(1,2,plus);
// calc(10,2,plus);
// calc(10,2,minus);



//pr6.10
// const hello = function(){
//     console.log("こんにちは");
// };

// console.log(hello.toString());

// setTimeout(hello
// ,3000);
// setTimeout(function(){
//     console.log("こんにちは");
// }
// ,5000);



//pr6.11
// const hello = ()=> {console.log("こんにちは");}

// hello();

// const double = num =>{
//     return num*2;
// }

// console.log(double(10));

// setTimeout(name =>{
//     console.log("こんにちは"+name);
// },3000,"独習太郎");


//章末問題
// setTimeout(name =>{
//     console.log("こんにちは,"+name);
// },2000,"syeimee")


// function add(val1,val2){return val1+val2;}
// function minus(val1,val2){return val1-val2;}
// function calcAndDisp (callback1,callback2,val1,val2){
//     const result1 = callback1(val1,val2);
//     const result2 = callback2(result1);
//     return result2;

// }

// calcAndDisp(minus,alert,3,4)

// const fn1 = (num1,num2) =>{
//     return num1 + num2;
// }
// console.log(fn1(3,2));

// const fn2 = num =>{
//     return num * 2;
// }
// console.log(fn2(2));

// const fn3 = ()=>{
//     console.log("hello,world");
// }

// fn3();


// const fn4 = name =>{
//     console.log("hello,world");
//     console.log("hello," + name);
// }

// fn4("syimee");

// const fn5 = () =>{
//     return {
//         name: "独習太郎",
//     }
// }

// console.log(fn5());


// let rand;

// function chance(){
//     rand = Math.random();
//     let result;

//     if(rand <.5){
//         result = "成功";
//     }else{
//         result = "失敗";
//     }
//     return result;
// }


// console.log(chance());

//クロージャに関して

//  function delayMessageFactory( printFn, ms ) {
//  return function( msg ) {
//  setTimeout( function() {
//  printFn( msg );
//  }, ms );
//  };
//  }




//  //上のクロージャをアロー関数で簡略化する
//  const delayMessageFactory = ( printFn, ms ) => msg  => setTimeout( () => {printFn( msg );}, ms );


//  const dialog = delayMessageFactory( alert, 2000 );
//  dialog( "こんにちは" );
//  // 2秒後にアラートで「こんにちは」と表示される
//  const log = delayMessageFactory( console.log, 1000 );
//  log( "こんばんは" );
//  // 1秒後にコンソールに「こんばんは」と表示される


//pr8.1
// window.name = "花子";

// function hello(){
//     console.log("こんにちは"+this.name);
// }


// const taro = {
//     name:"太郎",
//     hello: hello
// }


// hello();
// taro.hello();

//pr8.2
// window.name = "独習太郎";
// const which = () =>{
//     console.log(this.name);
// }



// const hanako = {
//     name:"独習花子",
//     callName: () => {
//         which();
//     }
// }


// hanako.callName();


//pr9.1
// class User{
//     constructor(username,password,roll){
//         this.name = username;
//         this.password = password;
//         this.roll = roll;
//     }

//     login(){
//         this.check();
//         console.log("ログイン"+this.name+"/"+this.password);
//     }

//     check(){
//         console.log("ログイン情報をチェックします")
//     }

//     checkroll(){
//         if(this.roll === "admin"){
//             console.log("管理者権限です");
//         }else{
//             console.log("一般ユーザーです");
//         }

//     }



// }




// const taro = new User("独習太郎","taro-pwd","user");
// taro.login();
// taro.checkroll();



//pr9.2

// class StdClass{
//     constructor(arg){
//         this.arg = arg;
//     }

//     static printFn = console.log;
//     static print (arg){
//         StdClass.printFn(arg);
//     }

//     print(){
//         this.constructor.print(this.arg);
//     }
// }


// const std = new StdClass("こんにちは");
// std.print();


//pr9.3
// class Person{
//     constructor(firstName,lastName){
//         this.firstName = firstName;
//         this.lastName = lastName;
//     }

//     get fullName(){
//         return this.lastName + this.firstName;
//     }

//     set age(value){
//         this._age = Number(value);
//     }

//     get age(){
//         return this._age;
//     }
//     set gender(sex){
//         this._gender = sex;
//         this.checkGender();

//     }
//     get gender(){
//         return this._gender;
//     }

//     checkGender(){
//         switch(this._gender){
//             case "男":
//                 this._age = "男";
//                 break;
//             case "女":
//                 this._age = "女";
//                 break;
//             case "トランスジェンダー":
//                 this._age = "トランスジェンダー";
//                 break
//             default:
//                 this._age = "";
//                 throw new Error("適切な性別を指定してください")

//         }
//     }

// }

// const taro = new Person("太郎","独習");
// console.log(taro.fullName);

// taro.age = "18";
// console.log(taro.age);

// taro.gender = "トランスジェンー";
// console.log(taro.gender);
// console.log(taro);


//pr9.4

// class Parent {
//     constructor(familyName){
//         this.familyName = familyName;
//     }

//     introduction(){
//         console.log("苗字は"+this.familyName+"です。");
//     }
// }

// class Child extends Parent{
//     constructor(familyName){
//         super(familyName);
//     }


// }
// const taro = new Child("独習");
// taro.introduction();

//pr9.6
// class Person{
//     #lastName = "独習";
//     #firstName;
//     #age;

//     constructor(firstName){
//         this.#firstName = firstName;
//     }

//     get fullName(){
//         return this.#lastName + this.#firstName;
//     }
//     set age (value){
//         this.#age = Number (value);
//     }
//     get age(){
//         return this.#age;
//     }
// }


// const taro = new Person("太郎");
// taro.age = 18;
// console.log(taro.age);
// console.log(taro.fullName);


// class User{
//     deleted = 0;
//     constructor(username){
//         this.username = username;
//     }

//     login(){
//         if (this.deleted === 0){
//             console.log(this.username +"はログインに成功しました。");
//         }else {
//             console.log(this.username +"はログインに失敗しました。")
//         }
//     }
// }


// class AdiminUser extends User{
//     constructor(username){
//         super(username);
//     }

//     deleteUser(user){
//         if(!(user instanceof User)){
//             throw new Error ("Userオブジェクトを引数にする必要があります。");
//         }
//         user.deleted = 1;
//         console.log(user.username +"を削除しました。")

//     }
// }

// const taro = new User("太郎");
// console.log(taro.username);
// taro.login();


// const admin = new AdiminUser("Y");
// admin.deleteUser(taro);
// taro.login();


//pr10.1

// setInterval(() =>{
//     console.log(window.innerWidth);
// },1000)

// let date = new Date("2022-5-15 03:12:13.333+9:00");
// console.log(date);
// date.setDate(15);
// console.log(date.getDay());
// date.setMonth(7);
// console.log(date.getDay());

// const date = new Date ("2022-5");
// const firstDay = new Date(date.getFullYear(),date.getMonth(),1);
// const lastDay = new Date(date.getFullYear(),date.getMonth()+1,0);
// console.log(firstDay.getDay());
// console.log(lastDay.getDay());

// firstDay.setDate(firstDay.getDate()+30);
// console.log(firstDay.toDateString());
// firstDay.setMonth(firstDay.getMonth()+20);
// console.log(firstDay);

// const thirtyDays = 1000 * 60 * 60 * 24 * 30;
// console.log(monthBegin+thirtyDays);


//pr10.6

// const fruits = {banana: "うまい",apple: "普通",orange: "微妙",other:{grape: "うまい"}};

// console.log(JSON.stringify(fruits,["banana","orange"]));

// function replacer(key,value){
//     if(typeof value ==="string" && value !== "うまい"){
//         return;
//     }else{
//         return value;
//     }

// }

// console.log(JSON.stringify(fruits,replacer));


//章末問題
// const firstDay = new Date("2023-5-20 0:00"); 
// const lastDay = new Date("2023-6-12 0:00");
// const dayUnit = 1000 * 60 * 60 * 24;

// const diffDay = (lastDay - firstDay)/dayUnit;
// console.log(diffDay);

//pr11.1
// let chuka = ["八宝菜","餃子","回鍋肉","青椒肉絲"];
// chuka.push("天津飯");
// chuka.unshift("チャーハン");
// chuka.shift();//先頭を削除
// chuka.pop();//末尾を削除
// chuka.splice(2,1);//2番目の要素を1つ削除
// chuka = chuka.concat(["杏仁豆腐","胡麻豆腐"]);
// let newArrayFromOneToThree =chuka.slice(1,4);

// for(let i = 0;i < chuka.length;i++){
//     console.log(chuka[i]);
// }

// console.log(chuka.indexOf("餃子"));//餃子のインデックスを参照
// console.log(newArrayFromOneToThree);
// newArrayFromOneToThree.reverse();
// console.log(newArrayFromOneToThree);

// const includeHapposai = newArrayFromOneToThree.includes("八宝菜");
// console.log(includeHapposai); 

//pr11.2

// const todos = [
//     { title: "晩御飯", priority: 2, completed: false },
//     { title: "ゴミ出し", priority: 1, completed: true },
//     { title: "食材の買い出し", priority: 3, completed: false },
//     { title: "洗濯", priority: 2, completed: true },
//     { title: "録画の視聴", priority: 1, completed: false },
// ];

// todos.forEach(({ title, completed }) => {
//     if (completed) {
//         console.log(title + 'は完了!');
//     } else {
//         console.log(title + "をやらないと！");
//     }
// })

// const notCompleted = todos.filter(({ completed }) => {
//     return completed !== true;
// });
// console.log(notCompleted);


// const priorityAsc =notCompleted.sort(todos.priority);
// console.log(priorityAsc)

// notCompleted.sort((todoA, todoB) => {
//     return todoB.priority - todoA.priority;
// });

// console.log(notCompleted);


// function printTodo(todos) {
//     todos.forEach(({title, completed}) => {
//         if (completed) {
//             console.log(title + "は完了");
//         } else {
//             console.log(title + "をやらないと！");
//         }
//     })
// }


// printTodo(notCompleted);


// const set = new Set( ["八宝菜", "餃子", "回鍋肉", "青椒肉絲", "餃子"] );
// set.add("杏仁豆腐");
// set.add("餃子");
// console.log(set);
// set.delete("回鍋肉");
// console.log(set);
// console.log(set.has("八宝菜"));

// const array = Array.from(set);
// console.log(array.join(" "));


// function genIterator(max){
//     let value = 0;

//     return {
//         next(){
//             if(value < max){
//                 return {
//                     done:false,
//                     value:value++
//                 }
//             }else{
//                 return{
//                     done:true
//                 }
//             }
//         }
//     }
// }


// const iterator = genIterator(3);
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());


// function rangeIterator(min,max){

//     if(min >= max){
//         throw "最小値は最大値より小さい値を設定してください。"
//     }

//     let value = min;
//     return{
//         next(){
//             if(value < max){
//                 return{
//                     done:false,
//                     value:value++
//                 }
//             }else{
//                 return{
//                     done: true
//                 }
//             }
//         }
//     }
// }


// const iterator = rangeIterator(2,5);

// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());


//pr12.2
// const html = `<h1>見出し1</h1>
// <h2>見出し2</h2>
// <h3>見出し3</h3>
// <header>ヘッダー</header>`;


// function* hTagGen(htmlStr){
//     const matches =html.matchAll(/<(h[1-6])>(.+)<\/\1>/g);
//     for (const matched of matches){
//         yield matched[2];
//     }
// }

// for(const text of hTagGen(html)){
//     console.log(text);
// }

//pr12.2

// function totalPrice(taxRate, ...productPrices){
//     let sum = 0;

//     for(const price of productPrices){
//         sum += price;
//     }

//     return Math.floor((1 + taxRate/ 100 ) * sum );

// }

// console.log(totalPrice(10,100,200,300,400,500));
// console.log(totalPrice(8,100,100));


//pr12.4

// const chuka = ["回鍋肉","青椒肉絲","餃子"];
// const desert = ["杏仁豆腐","胡麻団子"];

// const newChuka =[...chuka];
// const chukaAndDesert =[...chuka,...desert];
// const chukaAndTantanmenAndDesert =[...chuka,"担々麺",...desert];

// console.log(newChuka);
// console.log(chukaAndDesert);
// console.log(chukaAndTantanmenAndDesert);


// function genStep(min,max,step){
//         let value = min-step;
//         return{
//             next(){
//                 if(value < max){
//                     return{
//                         done:false,
//                         value:value+= step
//                     }
//                 }else{
//                     return{
//                         done: true
//                     }
//                 }
//             }
//         }
//     }
    
    
//     const iterator = genStep(4,10,2);
    
//     let a = iterator.next();

//     while(!a.done){
//         console.log(a.value);
//         a = iterator.next();
//     }



// function* genStep2(min,max,step){
//     for (let currentValue = min; currentValue <= max; currentValue += step){
//         yield currentValue;
//     }
// }

    
// const it2  = genStep2(4,10,2);
    
// let b = it2.next();

// while(!b.done){
//     console.log(b.value);
//     b = it2.next();
// }


// class Shape{
//     constructor (options){
//         const defaults = {
//             type: "四角形",
//             textColor: "黒",
//             borderColor: "なし",
//             bgColor: "白",
//         };

//         this.options = {...defaults,...options};
//     }


// draw(){
//     const{type,textColor,borderColor,bgColor} = this.options;
//     console.log(`形:[${type}] 文字色:[${textColor}] 枠色[${borderColor}] 背景色[${bgColor}]`);
// }
// }


// const triangle = new Shape({type: "三角形"});
// triangle.draw();




// function delay(fn,message,ms){
//     setTimeout(function(){
//         fn(message);
//     },ms);
    
// }

// delay(console.log,"こんにちは",1000);

// delay(alert,"さようなら",2000);



// delay(function(message1){
//     console.log(message1);

//     delay(function(message2){

//         console.log(message2);

//         delay(function(message3){
//             console.log(message3);
//         },"許さない...",1000)

//     },"絶対に許さない",1000);

// },"許さない",1000)


// function delay(fn,message,ms){
//     setTimeout(function(){
//         fn(message);
//     },ms);
    
// }


/*
promise・・・非同期処理の関数を入れる
then・・・非同期処理が成功したら
catch・・・非同期処理が失敗したら
finally・・・非同期処理が完了した後に必ず行いたい処理
*/


// const evenSeconds = (resolve,reject) =>{

//     setTimeout(()=>{
//         const date = new Date;
//         const second = date.getSeconds();    
//         if(second % 2 === 0){
//             resolve(second);
//         }else{
//             reject(second);
//         }
//     },1000)
    
// }

// const evenMsg = second =>{
//     console.log(second + "は偶数なので成功だ");
// }

// const oddMsg = second =>{
//     console.log(second+"は奇数なのでエラーだ");
// }

// const lastMsg = () =>{
//     console.log("処理を終了するよ〜")
// }

// let instance = new Promise(evenSeconds).then(evenMsg).catch(oddMsg).finally(lastMsg);


// const promiseFactory = (count) =>{
//     return new Promise ((resolve,reject) => {
//         setTimeout(() => {
//             count++;
//             console.log(count+"回目のコールです。時刻：["+new Date().toTimeString()+"]");

//             if(count === 5){
//                 reject(count);
//             }else{
//                 resolve(count);
//             }
//         },1000);
//     })
// }

// promiseFactory(0)
// .then( count =>{ return promiseFactory( count ); })
// .then( count =>{ return promiseFactory( count ); })
// .then( count =>{ return promiseFactory( count ); })
// .then( count =>{ return promiseFactory( count ); })
// .catch(errorCount =>{
//     console.log("おい！！！いつまで寝とんや！！起きろ！！もう"+errorCount+"回もコールしたで");
// }).finally( () =>{
//     console.log("もう起こさない〜〜〜");
// })

// const increaseByTwo = (count) =>{
//     return new Promise((resolve,reject) => {
        
//         setTimeout(() => {
//             console.log(count);
//             count+=2;

//             if(count >= 8){
//                 reject(count);
//             }else{
//                 resolve(count)
// ;            }
//         },1000);
//     });
// }

// increaseByTwo(0)
// .then( count =>{ return increaseByTwo(count);})
// .then( count =>{ return increaseByTwo(count);})
// .then( count =>{ return increaseByTwo(count);})

// .catch( errorCount =>{
//     console.log(errorCount + "を超えました");
// }).finally( ()=>{
//     console.log("処理を終了します");
// })


// function wait(ms){
//     return new Promise ((resoleve, reject) =>{
//         setTimeout(() =>{
//             console.log(ms+"msの処理が完了しました");
//             resoleve(ms);
//         },ms);
//     });
// }

// const wait400 = wait(400);
// const wait500 = wait(500);
// const wait600 = wait(600);


// Promise.all([wait500,wait600,wait400])
// .then(([resoleved500,resoleve600,resoleve400]) =>{
//     console.log("全てのPromiseが完了しました");
//     console.log(resoleved500,resoleve600,resoleve400);
// });


// const promiseFactory = (count) =>{
//     return new Promise ((resolve,reject) => {
//         setTimeout(() => {
//             count++;
//             console.log(count+"回目のコールです。時刻：["+new Date().toTimeString()+"]");

//             if(count === 3){
//                 reject(count);
//             }else{
//                 resolve(count);
//             }
//         },1000);
//     })
// }

// async function execute(){
//     try {
//         let count = await promiseFactory(0);
//         count = await promiseFactory(count);
//         count = await promiseFactory(count);
//         count = await promiseFactory(count);
//     }catch(errorCount){
//         console.log("エラーに飛びました。現在のカウントは"+errorCount+"です");
//     }finally{
//         console.log("処理を終了します。");
//     }
// }

// execute();


//行動をログ出力
function action(actionName,duration){
    return new Promise(resolve =>{
        setTimeout(() =>{
            console.log(actionName);
            resolve();
        },duration);
    });
}


//1日の行動
async function makeAction() {

    await action("徒歩",500)
    await action("朝食",200)
    //actionが完了すると以下を実行
    await Promise.all([ await action("昼食",500),action("おしゃべり",100)])
    await action("夕食",600)
    await action("趣味",400)
}

makeAction();