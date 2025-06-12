/*--------------------
厳格なチェックを行う
----------------------*/
'uss strict';
// let color = 'brown';
// console.log(color);

// color = 'pink';
// console.log(color);

// let x = 3;
// let y = 2;

// let ans1 = Math.pow(x,y);
// console.log(ans1);

// // let ans2 = x **  y;

// // console.log(ans2);


// let name = 'unko'
// console.log(name + "が"+x+"個あります");



// let weight = 30;
// let height = 1.7;
// let bmi = weight / (height * height);

// console.log(bmi);


// if(bmi >= 25){
//     console.log("肥満");
// }else if (bmi >= 18.5 && bmi < 25){
//     console.log("普通");
// }else{
//     console.log("痩せ");
// }

// let x = 100;

// if (x >= 90){
//     console.log("A");
// }else if(x >= 80){
//     console.log("B");
// }else if(x >= 60){
//     console.log("C");
// }else{
//     console.log("D");
// }


// let lisence = true;
// let goldLicence = true;

// if(lisence  && goldLicence){
//     console.log("あなたは優良ドライバーです。")
// }



// let num =4;

// switch(num){
//     case 1: 
//         console.log("金賞");
//     break;

//     case 2: 
//         console.log("銀賞");
//     break;

//     case 3: 
//         console.log("銅賞");
//     break;

//     case 4: 
//         console.log("４位");
//     break;

//     case 5:
//          console.log("５位");
//     break;

//     default:
//         console.log("圏外");
//     break;
// }


// let num = Math.floor(Math.random() * 5) + 1;

// switch(num){
//     case 1:
//         console.log("大吉");
//     break;

//     case 2:
//         console.log("大吉");
//     break;

//     case 3:
//         console.log("小吉");
//     break;

//     case 4:
//         console.log("吉");
//     break;

//     case 5:
//         console.log("凶");
//     break;
    
//     default:
//         console.log("想定外の数値です")
//     break;
// }

// let age = 21;
// let beverage = (age>=20)? 'ビール':'コーラ';
// console.log(beverage);


// function rectangle(height,width){
//     return height * width;
// }
// console.log("function命令の結果:"+rectangle(3,5));







// /*
// これを変数に入れるイメージ

// function (height,width){
//     return heighet * width;
// }
// */
// const getrectangle = function (height,width){
//     return height * width;
// }
// console.log("関数リテラルの結果:"+getrectangle(3,5));








// const getrectangle2 =
// new Function('height','width','return height * width');
// console.log("functionコンストラクタの結果:"+getrectangle2(3,5));




// const getrectangle3 = (height,width) =>{
//     return height * width;
// }
// console.log("アロー関数の結果:"+getrectangle3(3,5));





// const payment = (price,amount) =>{
//     return price * amount;
// }

// console.log(payment(100,20)+"円です");






// // コールバック関数 3秒経つとコールバック関数が実行　※＊が実行されたら**を実行する関数
// const displayMessage = () =>{
//     console.log('timeout!');
// }
// setTimeout(displayMessage,3000);




// function greeting(name){
//     console.log('hello!' + name + '-san');
// }
// function inputUserName(callback){
//     let name = prompt('貴様の名前を入力しろ');
//     callback(name); //ここでのcallbackはgreetingのこと
// }
// inputUserName(greeting);









// let colors = ['red','green','blue'];
// console.log(colors);
// console.log(colors[0]);
// console.log(colors[1]);
// console.log(colors[2]);

// console.log(colors.length);
// console.log("最後の文字列は"+colors[colors.length-1]);


// let names = [];


// names.push('Tom');
// console.log(names);
// names.unshift('Ann');
// console.log(names);
// names[1] = "john";
// console.log(names);

// names.splice(1,0,"waku","aoi");
// console.log(names);

// names.splice(1,1);
// console.log(names);

// let names2 = ['unko','unkoko'];
// let margedname = names.concat(names2);
// console.log(margedname);
// console.log(names);
// console.log(names2);

// names.shift();
// console.log("先頭を削除した結果:"+names);
// names.pop();
// console.log("末尾を削除した結果:"+names);



// //オブジェクトの生成
// let user = new Object();
// user.name='unnko';
// user.gender='man';
// user.birthYear = 1990;
// console.log(user);


//オブジェクト初期化子
// let user ={
//     name: "unnko",
//     gender: "man",
//     birthYear: 1990
// }


// console.log(user);
// console.log("ドット記法:"+user.name);
// console.log("ドット記法:"+user.gender);
// console.log("ドット記法:"+user.birthYear);


// console.log("ブラケット記法:"+user['name']);
// console.log("ブラケット記法:"+user['gender']);
// console.log("ブラケット記法:"+user['birthYear']);

// console.log("個数："+Object.keys(user).length);
// console.log("プロパティ（key)を取得："+Object.keys(user));



// let user ={
//     name: "unnko",
//     gender: "man",
//     birthYear: 1990,
//     calcage: function(thisyear){
//         return thisyear - this.birthYear;
//     }
// }

// console.log(user.calcage(2024));


// let numbers = [];
// for(let i = 0;i<100 ;i++){
//     numbers.push(i+1);
// }
// console.log(numbers);


// for(let i = 0; i<numbers.length; i++){

//     if(numbers[i] % 15 == 0){
//         console.log("BizzBuzz");
//     }else if(numbers[i]% 3 == 0){
//         console.log("Bizz");
//     }else if(numbers[i] & 5 == 0){
//         console.log("Buzz");
//     }else{
//         console.log(numbers[i]);
//     }
// }


let scores = [100,90,80,70,60];
let sum = 0;

for(let i = 0; i<scores.length;i++){
    sum += scores[i];
}

let avg = sum / scores.length;

console.log("合計値："+sum+" 平均値："+avg);