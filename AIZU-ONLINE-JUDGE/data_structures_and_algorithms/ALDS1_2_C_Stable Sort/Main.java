import java.util.Scanner;

/**
 * ============================================
 *  TITLE: 安定なソート(Stable Sort)
 *  URL: https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=ALDS1_2_C&lang=ja
 * ============================================
 * 
 * トランプのカードを整列しましょう。ここでは、４つの絵柄(S, H, C, D)と９つの数字(1, 2, ..., 9)から構成される計 36 枚のカードを用います
 * 例えば、ハートの 8 は"H8"、ダイヤの 1 は"D1"と表します。
 * バブルソート及び選択ソートのアルゴリズムを用いて、与えられた N 枚のカードをそれらの数字を基準に昇順に整列するプログラムを作成してください。
 * アルゴリズムはそれぞれ以下に示す疑似コードに従うものとします。数列の要素は 0 オリジンで記述されています。
 * 
 * また、各アルゴリズムについて、与えられた入力に対して安定な出力を行っているか報告してください。
 * ここでは、同じ数字を持つカードが複数ある場合それらが入力に出現する順序で出力されることを、「安定な出力」と呼ぶことにします。
 * （※常に安定な出力を行うソートのアルゴリズムを安定なソートアルゴリズムと言います。）
 * 
 * 入力条件:1 行目にカードの枚数 N が与えられます。 2 行目に N 枚のカードが与えられます。各カードは絵柄と数字のペアを表す２文字であり、隣合うカードは１つの空白で区切られています。
 * 出力条件:1 行目に、バブルソートによって整列されたカードを順番に出力してください。隣合うカードは１つの空白で区切ってください。
 *         2 行目に、この出力が安定か否か（Stable またはNot stable）を出力してください。
 *         3 行目に、選択ソートによって整列されたカードを順番に出力してください。隣合うカードは１つの空白で区切ってください。
 *         4 行目に、この出力が安定か否か（Stable またはNot stable）を出力してください。
 * 制約: 1 ≤ N ≤ 36
 * 作成者: syeimee
 * 作成日: 2025/05/07
 */


public class Main {
    public static void main (String[] args){
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();

        if(n < 1 || n > 36){
            return;
        }

        String[] cards = new String[n];
        for(int i = 0; i < n; i++){
            cards[i] = sc.next();
        }

        String[] bubbleSorted = bubbleSort(cards.clone(),n);
        sort_result(cards, bubbleSorted, n);

        String[] selectionSorted = selectionSort(cards.clone(),n);
        sort_result(cards, selectionSorted, n);

        sc.close();
    }

    /**
     * 選択ソートを実行するメソッド
     * @param array ソート対象の配列
     * @param n 配列の要素数
     */
    static String[] selectionSort(String[] cards, int n){
        int i;//未ソート部分の先頭の指す。配列の先頭から末尾に向かって移動
        int minj;//未ソートグループ内での最小値の要素番号
        int j; //未ソートの部分から最小値の要素番号minjを探すための変数

        /**
         * 例: array = [5,4,8,7,9,3,1]
         */
        for(i = 0; i < n - 1; i++){
            minj = i; 

            for(j = i; j < n; j++){

                //未ソートグループの最小値を持つ要素番号を探してminjに保存(例:未ソートグループの最小値は1なので、minj=6)
                if(getValue(cards[j]) < getValue(cards[minj])){
                    minj = j;
                }
            }

            if(minj != j){
                String temp = cards[i];
                cards[i] = cards[minj];//最小値をソート済グループに移す(例:array[0]の5 と array[6]の1を入れ替え、array[0]は選択済グループとする。)
                cards[minj] = temp;
            }

        }

        return cards;
    }

    /**
     * バブルソートを実行するメソッド
     * @param A
     * @param n
     */
    static String[] bubbleSort(String[] cards, int n){
        boolean flag = true; //入れ替え対象の隣接要素が存在する

        while(flag){
            flag = false; 
            for(int j = n - 1; j > 0; j--){
                if(getValue(cards[j]) < getValue(cards[j - 1])){ //A[j]がA[j-1]より小さい場合
                    String temp = cards[j]; //A[j]の値を一時的に保存
                    cards[j] = cards[j - 1]; //A[j]にA[j-1]の値を代入
                    cards[j - 1] = temp; //A[j-1]にtempの値を代入
                    flag = true; //入れ替え対象の隣接要素が存在する
                }
            }
        }

        return cards;
    }

    /**
     * 出力メソッド
     */
    static void sort_result(String[] original, String[] sorted, int n){
        for(int i =0; i < n; i++){
            if(i < n -1){
                System.out.print(sorted[i]+ " ");
            }else{
                System.out.print(sorted[i]);
            }
        }

        System.out.println();//改行

        if(isStable(original,sorted,n)){
            System.out.println("Stable");
        }else{
            System.out.println("Not stable");
        }
    }

    /**
     * 安定なソートかを判定するメソッド
     * 
     * 安定なソートとは、同じ値を持つ要素がソート後も元の順序を保つソートのことです。
     * このメソッドでは、ソート前とソート後の配列を比較して、安定かどうかを判定します。
     * 
     * @param original ソート前の配列
     * @param sorted ソート後の配列
     * @param n 配列の要素数
     * @return ソートが安定なら true、不安定なら false
     */
    static boolean isStable(String[] original, String[] sorted, int n) {
        // ソート前の配列で、同じ値を持つ要素を探す
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // original[i] と original[j] が同じ値を持つ場合
                if (getValue(original[i]) == getValue(original[j])) {
                    // ソート後の配列で、original[j] が original[i] より先に出現するかを確認
                    for (int a = 0; a < n; a++) {
                        if (sorted[a].equals(original[j])) { // sorted[a] に original[j] が見つかった場合
                            for (int b = a + 1; b < n; b++) {
                                if (sorted[b].equals(original[i])) { // sorted[b] に original[i] が見つかった場合
                                    // original[j] が original[i] より先に並んでいるため、不安定
                                    return false;
                                }
                            }
                        }
                    }
                }
            }
        }
        // すべての要素が安定である場合
        return true;
    }


    // カードの値を取得
    static int getValue(String card) {
        return Integer.parseInt(card.substring(1));
    }
    
}