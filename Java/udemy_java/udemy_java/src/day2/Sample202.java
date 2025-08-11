package day2;

public class Sample202 {
    public static void main(String[] args) {
        int a; //整数型の宣言
        int b = 3;
        int add, sub; //複数の変数を同時宣言
        double avg; //小数型の宣言
        a = 6;
        add = a + b;
        sub = a - b;
        avg = (a + b) / 2.0; //a,bの平均値を求める。
        System.out.println(a + "+" + b + "=" + add);
        System.out.println(a + "-" + b + "=" + sub);
        System.out.println(a + "と" + b + "の平均:" + avg);

    }
}