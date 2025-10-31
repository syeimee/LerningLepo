// https://atcoder.jp/contests/adt_easy_20251028_1/tasks/abc400_b

// CASE: N = 1 M = 1 → X = 1 + 1 = 2
// CASE: N = 2 M = 2 → X = 1 + (2 * 1) + (2 * 2)

import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        // STEP1: N,Mを標準入力で受け付ける
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        sc.close();

        // 桁数チェックフラグ
        boolean isInf = false;

        // STEP2: i = 0 から MまでのNのi乗を配列に入れる
        long tmp[] = new long[m+1];
        for(int i = 0; i <= m; i++){
            tmp[i] = (long)Math.pow(n,i);

            // 1要素でも10桁を超えると強制inf
            if(tmp[i] > 1000000000){
                isInf = true;
                break;
            }

        }
        long sum = 0;
        if(!isInf){
            // STEP3: STEP2の和を計算する
            for(int i = 0; i < tmp.length; i++){
                sum = sum + tmp[i];
                
                // sumが10桁を超えると強制inf
                if(sum > 1000000000){
                    isInf = true;
                    break;
                }
            }
        }

        // STEP4: isInfがfalseならSTEP3の和を出力する。そうじゃないと文字列infを出力する。
        if(!isInf){
            System.out.println(sum);
        }else{
            System.out.println("inf");
        }
    }
}
