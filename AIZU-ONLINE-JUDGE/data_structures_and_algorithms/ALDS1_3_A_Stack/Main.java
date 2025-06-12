/**
 * ============================================
 *  TITLE: Stack
 *  URL: https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=ALDS1_3_A&lang=ja
 * ============================================
 * 
 * スタック
 * 逆ポーランド記法は、演算子をオペランドの後に記述する数式やプログラムを記述する記法です。
 * 例えば、一般的な中間記法で記述された数式 (1+2)*(5+4) は、逆ポーランド記法では 1 2 + 5 4 + * と記述されます。逆ポーランド記法では、中間記法で必要とした括弧が不要である、というメリットがあります。
 * 
 * 逆ポーランド記法で与えられた数式の計算結果を出力してください。
 * 
 * 入力
 * １つの数式が１行に与えられます。連続するシンボル（オペランドあるいは演算子）は１つの空白で区切られて与えられます。
 * 
 * 出力
 * 計算結果を１行に出力してください。
 * 
 * 制約
 * 2 ≤ 式に含まれるオペランドの数 ≤ 100
 * 1 ≤ 式に含まれる演算子の数 ≤ 99
 * 演算子は +、-、* のみを含み、１つのオペランドは106 以下の正の整数
 * -1 × 109 ≤ 計算途中の値 ≤ 109
 * 
 * 作成者: syeimee
 * 作成日: 2025/05/10
 */


import java.util.Scanner;

public class Main {
    static int top;//topをクラス変数にする
    static int MAX = 200; // スタックの最大サイズ
    static int s [] = new int[MAX+1];

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        String line = sc.nextLine();

        String[] input = line.trim().split("\\s+");

        initialize();//スタックを初期化

        for(int i = 0; i<input.length; i++){
            if(isOperator(input[i])){
                //演算子が来たら2つ前までオペランドをpopしてcalcしpushする
                int a = 0;
                int b = 0;
                int calcResult = 0;

                try{
                    a = pop();
                }catch(IllegalStateException e){
                    System.out.println(e.getMessage());
                }

                try{
                    b = pop();
                }catch(IllegalStateException e){
                    System.out.println(e.getMessage());
                }

                try{
                    calcResult = calc(a, b, input[i]);
                }catch(IllegalStateException e){
                    System.out.println(e.getMessage());
                }

                try{
                    push(calcResult);
                }catch(IllegalStateException e){
                    System.out.println(e.getMessage());
                }

            }else{

                //演算子じゃなかったらparseIntしてスタックにpush
                try{
                    push(Integer.parseInt(input[i]));
                }catch(IllegalStateException e){
                    System.out.println(e.getMessage());
                }

            }
        }

        System.out.println(pop());
    }

    /**
     * スタックインデックスを初期化
     */
    static void initialize() {
        top = 0;

        for (int i = 0; i < s.length; i++) {
            s[i] = 0; // スタックをクリア
        }
    }

    /**
    * スタックが空かどうか判定する
    *
    * @return 空だったらtrue
    */
    static boolean isEmpty(){
        return top == 0;
    }

    /**
    * スタックが満杯かどうか判定する
    *
    * @return 満杯だったらtrue
    */
    static boolean isFull(){
        return top >= MAX;
    }

    /**
    * スタックに値をプッシュする
    *
    * @param x プッシュする値
    * @throws IllegalStateException スタックが満杯の場合
    */
    static void push(int x){
        if (isFull()){
            throw new IllegalStateException("ERROR: オーバーフロー - 値 " + x + " をプッシュできません");        }
        top++;
        s[top] = x;
    }

    /**
    * スタックに値をポップする
    *　
    * @return ポップした値
    * @throws IllegalStateException スタックが空の場合
    */
    static int pop(){
        if(isEmpty()){
            throw new IllegalStateException("ERROR: アンダーフロー");
        }
        top--;
        return s[top+1]; //popしたオペランドを返す
    }

    /**
    * 演算を行う
    *
    * @return  計算結果を返す
    * @throws IllegalStateException 有効な演算子ではない場合
    */
    static int calc(int a, int b, String operator ){
        switch(operator){
            case "+":
                return b + a;
            case "-":
                return b - a;
            case "*":
                return b * a;
            default:
                throw new IllegalStateException("ERROR: 有効な演算子ではありません");
        }
    }

    /**
    * 演算子かどうかを判定する
    *
    * @return  演算子だったらtrue
    */
    static boolean isOperator(String operator){
        return operator.equals("+") || operator.equals("-") || operator.equals("*");
    }
}
