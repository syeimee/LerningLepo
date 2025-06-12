import java.util.Scanner;

/**
 * ============================================
 *  お題: バブルソート(Bubble Sort)
 *  URL: https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=ALDS1_2_A&lang=ja
 * ============================================
 * 
 * バブルソートはその名前が表すように、泡（Bubble）が水面に上がっていくように配列の要素が動いていきます。
 * バブルソートは次のようなアルゴリズムで数列を昇順に並び変えます。
 * 
 * 1 bubbleSort(A, N) // N 個の要素を含む 0-オリジンの配列 A
 * 2   flag = 1 // 逆の隣接要素が存在する
 * 3   while flag
 * 4     flag = 0
 * 5     for j が N-1 から 1 まで
 * 6       if A[j] < A[j-1]
 * 7         A[j] と A[j-1] を交換
 * 8         flag = 1
 * 
 *  数列 A を読み込み、バブルソートで昇順に並び変え出力するプログラムを作成してください。
 *  また、バブルソートで行われた要素の交換回数も報告してください。
 * 
 * 入力条件:入力の最初の行に、数列の長さを表す整数 N が与えられます。2 行目に、N 個の整数が空白区切りで与えられます。
 * 出力条件:出力は 2 行からなります。１行目に整列された数列を 1 行に出力してください。
 *         数列の連続する要素は１つの空白で区切って出力してください。2 行目に交換回数を出力してください。
 * 制約: 1 ≤ N ≤ 100 , 0 ≤ A の要素 ≤ 100
 * 作成者: syeimee
 * 作成日: 2025/05/05
 */


public class Main {
    public static void main (String[] args){
        int MAX_SIZE = 100;
        int MIN_SIZE = 1;
        int MAX_ARR_RENGTH = 100;
        int MIN_ARR_RENGTH = 0;

        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); // 最初の行から数列の長さを取得

        if(n < MIN_SIZE || n > MAX_SIZE) { // 数列の長さが1以上100以下であることを確認
            System.out.println("Nは1以上100以下でなければなりません。");
            return;
        }

        int [] a = new int [n]; // 数列を格納する配列を作成
        for(int i = 0; i < n; i++) {
            a[i] = sc.nextInt(); // 2行目から数列の要素を取得
        }

        if(a.length != n) { 
            System.out.println("配列の長さが数列の長さと一致しません。");
            return;
        }else if ( a.length < MIN_ARR_RENGTH || a.length > MAX_ARR_RENGTH ){
            System.out.println("配列の要素は0以上100以下でなければなりません。");
            return;
        }

        Main bubbleSort = new Main();
        bubbleSort.bubbleSort(a, n); // バブルソートを実行
        sc.close();
    }

    /**
     * 配列の要素を順番に出力するメソッド
     * @param A
     * @param n
     */
    void trace(int A[], int n, int swapCount){

        for(int i = 0; i < n; i++){
            if(i >= 0 && i < n - 1){ // 最後の要素以外はスペースを追加
                System.out.print(A[i] + " "); // 配列の要素を出力
            }else if(i == n - 1){ // 最後の要素はスペースを追加しない
                System.out.print(A[i]); // 配列の要素を出力
            }
        }

        System.out.println(); // 改行
        System.out.println(swapCount); // 交換回数を出力

    }

    /**
     * バブルソートを実行するメソッド
     * @param A
     * @param n
     */
    void bubbleSort(int A[], int n){
        boolean flag = true; //入れ替え対象の隣接要素が存在する
        int swapCount = 0; // 交換回数をカウントする変数

        while(flag){
            flag = false; 
            for(int j = n - 1; j > 0; j--){
                if(A[j] < A[j - 1]){ //A[j]がA[j-1]より小さい場合
                    int temp = A[j]; //A[j]の値を一時的に保存
                    A[j] = A[j - 1]; //A[j]にA[j-1]の値を代入
                    A[j - 1] = temp; //A[j-1]にtempの値を代入
                    flag = true; //入れ替え対象の隣接要素が存在する
                    swapCount++; // 交換回数をカウント
                }
            }
        }

        trace(A, n, swapCount); // 配列の状態を出力
    }
}
