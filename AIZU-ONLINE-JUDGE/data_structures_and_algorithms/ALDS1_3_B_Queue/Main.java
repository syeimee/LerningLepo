import java.util.Scanner;

/**
 * ============================================
 *  TITLE: Queue
 *  URL: https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=ALDS1_3_B&lang=ja#
 * ============================================
 * 
 * キュー
 * 名前 namei と必要な処理時間 timei を持つ n 個のプロセスが順番に一列に並んでいます。
 * ラウンドロビンスケジューリングと呼ばれる処理方法では、CPU がプロセスを順番に処理します。
 * 各プロセスは最大 q ms（これをクオンタムと呼びます）だけ処理が実行されます。
 * q ms だけ処理を行っても、まだそのプロセスが完了しなければ、そのプロセスは列の最後尾に移動し、CPU は次のプロセスに割り当てられます。
 * 
 * 例えば、クオンタムを 100 msとし、次のようなプロセスキューを考えます。
 * 
 * A(150) - B(80) - C(200) - D(200)
 * まずプロセス A が 100 ms だけ処理され残りの必要時間 50 ms を保持しキューの末尾に移動します。
 * 
 * B(80) - C(200) - D(200) - A(50)
 * 次にプロセス B が 80 ms だけ処理され、時刻 180 ms で終了し、キューから削除されます。
 * 
 * C(200) - D(200) - A(50)
 * 次にプロセス C が 100 ms だけ処理され、残りの必要時間 100 ms を保持し列の末尾に移動します。
 * 
 * D(200) - A(50) - C(100)
 * このように、全てのプロセスが終了するまで処理を繰り返します。
 * 
 * ラウンドロビンスケジューリングをシミュレートするプログラムを作成してください。
 * 
 * 入力
 * 入力の形式は以下の通りです。
 * 
 * n q
 * name1 time1
 * name2 time2
 * ...
 * namen timen
 * 最初の行に、プロセス数を表す整数 n とクオンタムを表す整数 q が１つの空白区切りで与えられます。
 * 
 * 続く n 行で、各プロセスの情報が順番に与えられます。文字列 namei と整数 timei は１つの空白で区切られています。
 * 
 * 出力
 * プロセスが完了した順に、各プロセスの名前と終了時刻を空白で区切って１行に出力してください。
 * 
 * 制約
 * 1 ≤ n ≤ 100,000
 * 1 ≤ q ≤ 1,000
 * 1 ≤ timei ≤ 50,000
 * 1 ≤ 文字列 namei の長さ ≤ 10
 * 1 ≤ timei の合計 ≤ 1,000,000
 * 
 * 作成者: syeimee
 * 作成日: 2025/05/10
 */


public class Main {
    static int MAX = 500000;
    static String[] q; 
    static int head = 0;
    static int tail = 0;

    public static void main(String[] args) {
        init();

        Scanner sc = new Scanner(System.in);
        int totalTime = 0;

        //①標準入力でプロセス数nを受け取る
        int n = sc.nextInt();

        //②標準入力でクオンタイムqを受け取る
        int qTime = sc.nextInt();
        sc.nextLine(); // 改行を消費

        //③標準入力でプロセス名nameと処理時間timeの組を受け取る
        String[] processPairs = new String[n];
        for (int i = 0; i < n; i++) {
            processPairs[i] = sc.nextLine(); // 各行を読み取る
        }

        //④③の組をenqする
        for(int i = 0; i<n; i++){
            try{
                enqueue(processPairs[i]);
            }catch(IllegalStateException e){
                System.out.println(e.getMessage());
            }
        }

        //⑤キューをdeqして処理時間timeからクオンタイム分引き,
        //  0以下になれば出力結果resultsにプロセス名nameと処理時間timeを格納する
        String[] results = new String[n];
        int resultIndex = 0;
        while(resultIndex < n){
            try{
                String processPair = dequeue();
                int processTime = getProcessTime(processPair);
                int updatedProcessTime = processTime - qTime;

                if(updatedProcessTime <= 0){
                    totalTime += processTime;
                    String completeProcess = updateProcessPair(processPair,totalTime);
                    results[resultIndex] = completeProcess;
                    resultIndex++;
                }else{
                    totalTime += qTime;
                    String updateProcessPair = updateProcessPair(processPair,updatedProcessTime);
                    enqueue(updateProcessPair);
                }
            }catch(IllegalStateException e){
                System.out.println(e.getMessage());
            }
        }

        //⑥結果を出力
        for(int i = 0; i < results.length; i++){
            System.out.println(results[i]);
        }

        sc.close();
    }


    /**
    * キューを初期化する
    *
    */
    static void init(){
        head = 0;
        tail = 0;
        q = new String[MAX];
    }

    /**
    * キューの末尾に要素 x を追加する
    *
    * @param 追加する要素x
    */
    static void enqueue(String x){
        if(isFull()){
            throw new IllegalStateException("ERROR: オーバーフロー - 値 " + x + " をenqueueできません"); 
        }
        q[tail] = x;
        tail++;
    }

    /**
    * キューの先頭から要素を取り出す
    *
    * @return 取り出した要素
    */
    static String dequeue(){
        if(isEmpty()){
            throw new IllegalStateException("ERROR: アンダーフロー"); 
        }

        String result = q[head];
        head++;
        return result;
    }

    /**
     * キューが空かを判定する
     * 
     * @return 空だったらtrue
     */
    static boolean isEmpty(){
        return head == tail;
    }

    /**
     * キューが満杯かを判定する
     * 
     * @return 満杯だったらtrue
     */
    static boolean isFull(){
        // 次に追加する位置が head と一致する場合、キューは満杯
        return (tail + 1) % MAX == head;
    }

    /**
     * プロセス名と処理時間の組から処理時間を取り出す
     * 
     * @return 処理時間を整数で返す
     */
    static int getProcessTime(String processPair){
        // 空白で分割
        String[] parts = processPair.split(" ");
        // 数値部分を取得してintに変換
        return Integer.parseInt(parts[1]);
    }

    /**
     * プロセス名と処理時間の組を更新する
     * 
     * @param beforProcessPair 更新前のプロセス組
     * @param updateProcessTime 更新後のプロセス時間
     * @return 更新後のプロセス組
     */
    static String updateProcessPair(String beforProcessPair, int updateProcessTime){
        // 空白で分割
        String[] parts = beforProcessPair.split(" ");
        String processName = parts[0];
        return (processName + " " + updateProcessTime); //文字列連結演算子（+）を使う場合はパース不要
    }

}
