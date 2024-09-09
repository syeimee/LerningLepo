/**
 * オブジェクト指向その１
 ===================================================================*/

// class krassSengen{
//     name :String= '';

//     // ?をつけることで初期値を設定しなくてもコンパイルエラーにならない
//     // name? :String;

//     age :number = 0;
// }

// const olivia = new krassSengen();
// console.log(olivia.name);
// console.log(olivia.age);
// olivia.name = "hogehoge";
// olivia.age = 5;
// console.log(olivia.name);
// console.log(olivia.age);

// * オブジェクト指向その１ここまで===========================================

/**
 * オブジェクト指向その2　読み取り専用の実装
 ===================================================================*/

//  class krassSengen{
//     readonly name :String ='';
//     age :number = 3;
//  }

//  const olivia = new krassSengen();
//  olivia.name = "hogehoge"; //読み取り専用なので、エラーとなる

 // * オブジェクト指向その2 ここまで===========================================


 /**
 * オブジェクト指向その3　クラス内メソッドの実装
 ===================================================================*/
//  class krassSengen{
//     readonly name: String = 'hogehoge'; //多分Javaで言うとこのfinal?
//              age: number = 18;

//     isAdult(): boolean {
//         if(this.age >= 20){
//             return true;
//         }else{
//             return false;
//         }
//     }
//     setAge(age: number){
//         this.age = age;
//     }
//  }

//  const olivia = new krassSengen();
//  console.log(`age: ${olivia.age}`);
//  console.log(olivia.isAdult());

//  olivia.setAge(24);
//  console.log(`age: ${olivia.age}`);
//  console.log(olivia.isAdult());

 // * オブジェクト指向その3 ここまで===========================================

 /**
 * オブジェクト指向その2　読み取り専用の実装
 ===================================================================*/

//  class krassSengen{
//     readonly name :String ='';
//     age :number = 3;
//  }

//  const olivia = new krassSengen();
//  olivia.name = "hogehoge"; //読み取り専用なので、エラーとなる

 // * オブジェクト指向その2 ここまで===========================================


 /**
 * オブジェクト指向その4　コンストラクタの実装　
 *  ===================================================================*/
//  class krassSengen{
//     readonly name: String = 'hogehoge'; 
//     readonly age: number = 18;

//     //コンストラクタはconstructorで必ず定義する　readonlyに対しても代入ができる
//     constructor(name: String, age: number){
//         this.name = name;
//         this.age = age;
//     }            
//     isAdult(): boolean {
//         if(this.age >= 20){
//             return true;
//         }else{
//             return false;
//         }
//     }
//  }

//  const olivia = new krassSengen("fugafuga",22);
//  console.log(`name: ${olivia.name}`);
//  console.log(`name: ${olivia.age}`);


 // * オブジェクト指向その4 ここまで===========================================
