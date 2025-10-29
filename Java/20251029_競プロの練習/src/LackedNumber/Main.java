// 問題文
// 数字のみからなる、長さがちょうど 
// 9 の文字列 
// S が与えられます。
// S には 0 から 9 までのうち、ちょうど 
// 1 つの数字を除いた 
// 9 種類の数字が一度ずつ登場します。

// S に登場しない唯一の数字を出力してください。

// 制約
// S は数字のみからなる長さ 
// 9 の文字列である。
// S の文字はすべて相異なる。

import java.util.Scanner;
import java.util.Arrays;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int inputs= sc.nextInt();
        sc.close();

        // 入力した数値を配列に変換する[4,5,9,2,3,0,7,8,1]
        int[] converted_inputs = new int[9];
        for(int i = 8; i >= 0; i--){
            converted_inputs[i] = inputs % 10;
            inputs = inputs / 10;
        }

        // 0から9までの数値を含むかをチェックする
        boolean[] seen = new boolean[10];
        for (int i = 0; i < 9; i++) {
            seen[converted_inputs[i]] = true;
        }

        int ans = -1;
        for(int i = 0; i <= 9; i++){
            if(!seen[i]){
                ans = i;
                break;
            }
        }
        System.out.println(ans);
    }
}
