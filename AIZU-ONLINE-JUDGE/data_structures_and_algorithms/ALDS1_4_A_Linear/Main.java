/**
 * ============================================
 *  TITLE: Linear Search
 *  URL:https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=ALDS1_4_A&lang=ja
 * ============================================
 * 
 * 線形探索
 * n個の整数を含む数列 Sと、q個の異なる整数を含む数列 Tを読み込み、Tに含まれる整数の中で Sに含まれるものの個数 Cを出力するプログラムを作成してください。
 * 
 * 入力
 * １行目に n、２行目に Sを表す n個の整数、３行目に q、４行目に Tを表す q個の整数が与えられます。
 * 
 * 出力
 * Cを１行に出力してください。
 * 
 * 制約
 * n≤10,000
 * q≤500
 * 0≤Sの要素≤10^9
 * 0≤Tの要素≤10^9
 * Tの要素は互いに異なる
 * 
 * 
 * 作成者: syeimee
 * 作成日: 2025/05/11
 */

import java.util.Scanner;
public class Main {
    static int count = 0;
    public static void main(String[] args) {
        //①標準入力で値を受け取る
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        sc.nextLine();
        int S[] = new int[n + 1];//番兵を追加するため
        String sLine = sc.nextLine().trim(); 
        String[] sParts = sLine.split("\\s+");//１行に複数個数入力されるため、一度配列にする
        for(int i =0; i < n; i++){
            if(!sParts[i].isEmpty()){
                S[i] = Integer.parseInt(sParts[i]);
            }
        }

        int q = sc.nextInt();
        sc.nextLine();
        int T[] = new int[q];
        String qLine = sc.nextLine().trim();
        String[] qParts = qLine.split("\\s+");//１行に複数個数入力されるため、一度配列にする
        for(int i =0; i < q; i++){
            if(!qParts[i].isEmpty()){
                T[i] = Integer.parseInt(qParts[i]);
            }
        }

        //②数列Tに含まれる整数の中でSに含まれるものをカウントする
        for(int i = 0; i < T.length; i++){
            sameNumberCount(S, T[i],n);
        }
        //③カウントした値を出力する
        System.out.println(count);
    }   

    /**
     * 引数Tに含まれる整数の中でSに含まれるものの個数を返す(線形探索)
     * @param targetArray 検索対象数列
     * @param targetNumber 検索対象数
     */
    static void sameNumberCount(int[] targetArray, int targetNumber, int sentinelIndex){
        targetArray[sentinelIndex] = -1;

        int i = 0;
        while(targetArray[i] != -1){
            if(targetArray[i] == targetNumber){
                count++;
                break;
            }
            i++;
        }
    }
}