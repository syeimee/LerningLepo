/**
 * ============================================
 *  お題: 挿入ソート(Insertion Sort)
 *  URL: https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=ALDS1_1_A
 * ============================================
 * 
 * N個の要素を含む数列Aを昇順に並び替える挿入ソートのプログラムを作成してください。
 * アルゴリズムの動作を確認するため、各計算ステップでの配列（入力直後の並びと、各iの処理が終了した後の並び）を出力してください。
 * 
 * 入力条件:入力の最初の行に、数列の長さを表す整数Nが与えられます。２行目に、N個の整数が空白区切りで与えられます。
 * 出力条件:出力はN行からなります。挿入ソートの各計算ステップでの途中結果を１行に出力してください。最後の要素の後の空白など、余計な空白や改行を含めると
 * Presentation Errorとなりますので、注意してください。
 * 
 * 制約: 1 <= N <= 100, 0 <= A[i] <= 1000
 * 
 * 作成者: syeimee
 * 作成日: 2025/05/04
 */

import java.util.Scanner;
import java.util.Arrays;
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in); // 入力を受け取るためのScannerオブジェクトを作成
        int n = scanner.nextInt(); // 最初の行から数列の長さを取得

        if(n < 1 || n > 100) { // 数列の長さが1以上100以下であることを確認
            System.out.println("数列の長さは1以上100以下でなければなりません。");
            return;
        }
        
        int [] a = new int[n]; // 数列を格納する配列を作成

        for(int i = 0; i < n; i++) {
            a[i] = scanner.nextInt(); // 2行目から数列の要素を取得
        }

        if(a.length != n) { 
            System.out.println("配列の長さが数列の長さと一致しません。");
            return;
        }else if ( a.length < 0 || a.length > 1000 ){
            System.out.println("配列の要素は0以上1000以下でなければなりません。");
            return;
        }
        
        Main insertionSort = new Main(); // InsertionSortクラスのインスタンスを作成
        insertionSort.insertionSort(a, n);
        scanner.close();
    }

    /**
     * 配列の要素を順番に出力するメソッド
     * @param A
     * @param n
     */
    void trace(int A[], int n){
        for(int i = 0; i < n; i++){
            if(i >= 0 && i < n - 1){ // 最後の要素以外はスペースを追加
                System.out.print(A[i] + " "); // 配列の要素を出力
            }else if(i == n - 1){ // 最後の要素はスペースを追加しない
                System.out.print(A[i]); // 配列の要素を出力
            }
        }
        System.out.println(); // 改行
    }

    /**
     * 挿入ソートを実行するメソッド(例:[8,3,1,5,2,1])
     * @param A
     * @param n
     */
    void insertionSort(int A[], int n){
        trace(A, n); // 配列の状態を出力

        for(int i = 1; i < n; i++){
            int v = A[i]; // 現在の要素を保存(例:A[1]=3)
            int j = i - 1; // 前の要素のインデックスを取得(例:A[0]=8)

            while(j >= 0 && A[j] > v){ // 現在の要素より大きい要素がある限り(例:A[0]=8>A[1]=3)
                A[j + 1] = A[j]; // 要素を右にシフト(例:A[1]=A[0]=8)
                j--; // インデックスを減少(例:j=0→-1)
            }
            A[j + 1] = v; // 現在の要素を挿入(例:A[0]=3)
            trace(A, n); // 配列の状態を出力
        }
    }
}
