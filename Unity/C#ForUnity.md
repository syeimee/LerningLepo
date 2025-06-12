# コンソールとコメントアウト

デバッグコード
```c#
Debug.Log("hogehoge");
```

# StartとUpdate
Startはゲーム実行時に１回呼ばれるもの
Updateは定期的に呼ばれるもの

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class UpdateText : MonoBehaviour
{
    void Start()
    {
       Text sampleText = GetComponent<Text>();
       sampleText.text = "aaaaa"; 
    }


}
```
# 変数の宣言

スクリプトを実行するには必ずGameObjectにアタッチする

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class UpdateText : MonoBehaviour
{
    　
    void Start()
    {
        string say;
        say = "hello world";
        Debug.Log(say);
    }


}
```

宣言と代入を同時に行う場合

```c#
public class ConsoleSample : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        string str = "Sampletxt";
        Debug.Log(str);
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
```

定数の宣言には、`const`をつける

```c#
const string str = "sampletxt";
```

Unity側のコンソールでclearボタンを押すとログを消すことができる

# if文

```c#
int hp = 100;
if(hp > 50){
    Debug.Log("処理A");
}else{
    Debug.Log("処理B");
}
```

```c#
int hp = 100;
if(hp > 50){
    Debug.Log("処理A");
}else if(hp > 30){
    Debug.Log("処理B");
}else{
    Debug.Log("処理C");
}
```

※ １行でかく
```c#
if(i % 3 == 0) numberLists.Add(i);
```

# swich文

```c#
    string character = "Player";

    switch(character)
    {
        case "Player":
            Debug.Log("味方だよ");
            break;

        case "Enemy":
            Debug.Log("敵だよ");
            break;

        default:
            Debug.Log("その他");
            break;
    } break;

```

2条件でもできる

```c#
    string character = "Player";

    switch(character)
    {
        case "Player":
        case "friends":
            Debug.Log("味方だよ");
            break;

        case "Enemy":
            Debug.Log("敵だよ");
            break;

        default:
            Debug.Log("その他");
            break;
    } break;

```

# while文

```c#
int x = 0;

int x = 10;
while(x < 10){
    Debug.Log(x);
    x++;
}
```

```c#
for(int i = 0; i < 10; i++){
    Debug.Log(i);
}

```

break
7になったらforを抜ける
```c#
for(int i = 0; i < 10; i++){
    if(i == 7){
        break;
    }
    Debug.Log(i);
}
```

continue
7になったら次の処理を行う
```c#
for(int i = 0; i < 10; i++){
    if(i == 7){
        continue;
    }
    Debug.Log(i);
}
```

# 配列の宣言、代入、取得

宣言した後に代入①
```c#
int [] x = new int[2];
x[0] = 1;
x[1] = 2;
```
代入②
```c#
int [] x = new int[3](0, 2,-3);
```

取得
```c#
Debug.Log(x[0]);
Debug.Log(x[1]);
Debug.Log(x[2]);
```

長さの取得
Javaだと`length`フィールド、C#だと`Length`プロパティ
```c#
int [] x = new int[2];
x[0] = 1;
x[1] = 2;

Debug.Log(x.Length); //配列の長さ2
```

# Listの宣言、代入、取得
Arrayと違い追加や削除が行えるのが特徴

```c#
List<int> numbers = new List<int>();
```

```c#
List<int> numbers = new List<int>(1,2,3);
```

代入
```c#
List<int> numbers = new List<int>();
number[1] = 0;
```

追加
```c#
numbers.add(100);//numbers[3]に対して行った時
Debug.Log(numbers[3]);//100
```

削除
```c#
numbers.RemoveAt(1);　//番号で削除
numbers.Remove(-1); //-1という値を削除
```

長さの取得
```c#
Debug.Log(numbers.Count);//Listの場合はCountを使う
```
0-9までのListの作成して表示する
```c#
List<int> numberList = new List<int>();
for(int i = 0; i < 10; i++){
    numberList.Add(i);
}

for(int i = 0; i < numberList.Count; i++){
    Debug.Log(numberList[i]);
}
```

# forEach文

```c#
List<string> nameList = new List<string>(){"M", "S", "I"}

forEach(string Name in nameList){
    Debug.Log(Name); //M,S,I
}
```

# 関数（メソッド）

関数の定義
```c#
void HelloCodeWorks(){
    Debug.Log("Hello CODE WORKS");
}
```

関数の呼び出し
```c#
void Start(){
    HelloCodeWorks();
}
```

引数
デフォルト引数との設定
```c#
void HelloCodeWorks(string name == "CODEWORKS"){
    Debug.Log($"Hello {name}"); //文字連結では、先頭に$をつける
}
```
戻り値

```c#
string samleName(string name){
    Debug.Log(name);
    return $"{name}さん"
}

```

# 列挙型

定義
```c#
public enum Type{
    STOP,
    RIGHT,
    LEFT
}
```

使用
限られた中で選択になるので、エラーが起こりにくい
可読性を上げることもできる
```c#
TYPE type = TYPE.STOP;

void Start(){
    if(type == TYPE.STOP){
        Debug.Log(type);
    }
}
```


## 練習問題
1から100までの３の倍数と３のつく数字を要素とするリストを返す関数を作成せよ

```c#
public class ConsoleSample : MonoBehaviour
{
    int startNum = 1;
    int endNum = 100;

    List <int> numberList = new List <int> ();
    void Start()
    {
        Aho();
        foreach(int number in numberList){
            Debug.Log(number);
        }
    }

    List<int> Aho(){
        for(int i = startNum; i <= endNum; i++){
        //３の倍数かどうか
            bool flag = false;

            if(i % 3 == 0) flag = true;

        //３のつく数字かどうか
            if(i == 3){
                flag = true;
            }else if(i % 10 == 3){
                flag = true;
            }else if(i % 100 == 3){
                flag = true;
            }

            if(flag == true) numberList.Add(i);

        }

        return numberList;
    }

}
```
リファクタリング
```c#
    void Start()
    {
        List<int> threeAhoNumberList = GetThreeAhoNumberList();
        foreach(int number in threeAhoNumberList){
            Debug.Log(number);
        }
    }

    List<int> GetThreeAhoNumberList(){
        List<int> threeAhoNumberList = new List<int>();
        for(int i =1; i <= 100; i++){
            if(IsThreeAhoNumber(i)){
                threeAhoNumberList.Add(i);
            }
        }
        return threeAhoNumberList;
    }

    bool IsThreeAhoNumber(int number){
        if(number % 3 == 0){
            return true;
        }

        while(number != 0){
            if(number % 10 == 3) return true;
            number = number / 10;
        }

        return false;
    }
```

# クラス

```c#
public class PlayerModel{
    string name;
    int hp;
    int at;

    public PlayerModel(){
        name = "MSI";
    }
    public void SayName(){
        Debug.Log(name);
    }
}
```

クラスのインスタンス化
```c#
PlayerModel player = new PlayerModel();
player.SayName();
```






