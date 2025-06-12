import java.util.Scanner;

/**
 * ============================================
 *  TITLE: 選択ソート(Selection Sort)
 *  URL: https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=ALDS1_2_B
 * ============================================
 * 
 * 選択ソートとは、未ソートのグループの最小値を選択し、先頭の要素と交換することを繰り返すことで、
 * 配列をソートするアルゴリズムです。
 * 
 * 1 selectionSort(A, N) // N個の要素を含む0-オリジンの配列A
 * 2   for i が 0 から N-1 まで
 * 3     minj = i
 * 4     for j が i から N-1 まで
 * 5       if A[j] < A[minj]
 * 6         minj = j
 * 7     A[i] と A[minj] を交換
 * 
 * 数列Aを読み込み、選択ソートのアルゴリズムで昇順に並び替え出力するプログラムを作成してください。
 * 上の疑似コードに従いアルゴリズムを実装してください。
 * 疑似コード 7 行目で、i と minj が異なり実際に交換が行われた回数も出力してください。
 * 
 * 入力条件:入力の最初の行に、数列の長さを表す整数 N が与えられます。２行目に、N 個の整数が空白区切りで与えられます。
 * 出力条件:出力は 2 行からなります。１行目に整列された数列を 1 行に出力してください。
 *         数列の連続する要素は１つの空白で区切って出力してください。2 行目に交換回数を出力してください。
 * 制約: 1 ≤ N ≤ 100, 0 ≤ A の要素 ≤ 100
 * 作成者: syeimee
 * 作成日: 2025/05/07
 */


public class Main {
    public static void main (String[] args){
        Scanner sc = new Scanner(System.in);
        
        int n = sc.nextInt();

        //n制約チェック
        if(n < 1 || n > 100){
            return;
        }

        int [] a = new int [n];

        for(int i = 0; i < n; i++){
            a[i] = sc.nextInt();
        }

        //A制約チェック
        if(a.length < 0 || a.length > 100){
            return;
        }

        Main selection_sort = new Main();
        selection_sort.selectionSort(a,n);
        sc.close();
    }

    /**
     * 選択ソートを実行するメソッド
     * @param array ソート対象の配列
     * @param n 配列の要素数
     */
    void selectionSort(int array[], int n){
        int i;//未ソート部分の先頭の指す。配列の先頭から末尾に向かって移動
        int minj;//未ソートグループ内での最小値の要素番号
        int j; //未ソートの部分から最小値の要素番号minjを探すための変数
        int count = 0;

        /**
         * 例: array = [5,4,8,7,9,3,1]
         */
        for(i = 0; i < n - 1; i++){
            minj = i; 

            for(j = i; j < n; j++){

                //未ソートグループの最小値を持つ要素番号を探してminjに保存(例:未ソートグループの最小値は1なので、minj=6)
                if(array[j] < array[minj]){
                    minj = j;
                }
            }

            if(array[i] != array[minj]){
                int temp = array[i];
                array[i] = array[minj];//最小値をソート済グループに移す(例:array[0]の5 と array[6]の1を入れ替え、array[0]は選択済グループとする。)
                array[minj] = temp;
                count ++;            
            }

        }

        sort_result(array,n,count);
    }

    /**
     * 出力メソッド
     */
    void sort_result(int array[], int n, int count ){
        for(int i =0; i < n; i++){
            if(i < n -1){
                System.out.print(array[i]+ " ");
            }else{
                System.out.print(array[i]);
            }
        }
        System.out.println();//改行
        System.out.println(count);
    }
}
