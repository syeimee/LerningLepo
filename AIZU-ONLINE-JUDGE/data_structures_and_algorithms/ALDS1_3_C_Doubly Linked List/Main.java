/**
 * ============================================
 *  TITLE: Doubly Linked List
 *  URL:https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=ALDS1_3_C&lang=ja
 * ============================================
 * 
 * 双方向連結リスト
 * 以下の命令を受けつける双方向連結リストを実装してください。
 * 
 * insert x: 連結リストの先頭にキー x を持つ要素を継ぎ足す。
 * delete x: キー x を持つ最初の要素を連結リストから削除する。そのような要素が存在しない場合は何もしない。
 * deleteFirst: リストの先頭の要素を削除する。
 * deleteLast: リストの末尾の要素を削除する。
 * 入力
 * 入力は以下の形式で与えられます。
 * 
 * n
 * command1
 * command2
 * ...
 * commandn
 * 最初の行に命令数 n が与えられます。続く n 行に命令が与えられる。命令は上記4つの命令のいずれかです。キーは整数とします。
 * 
 * 出力
 * 全ての命令が終了した後の、連結リスト内のキーを順番に出力してください。連続するキーは１つの空白文字で区切って出力してください。
 * 
 * 制約
 * 命令数は 2,000,000 を超えない。
 * delete 命令の回数は 20 を超えない。
 * 0 ≤ キーの値 ≤ 109。
 * 命令の過程でリストの要素数は 106を超えない。
 * delete, deleteFirst, または deleteLast 命令が与えられるとき、リストには１つ以上の要素が存在する。
 * 
 * 作成者: syeimee
 * 作成日: 2025/05/11
 */

import java.util.LinkedList;
import java.util.Arrays;
import java.util.Scanner;

public class Main {
    static LinkedList<Integer> linkedList;

    public static void main(String[] args) {
        init(); //初期化

        Scanner sc = new Scanner(System.in);

        //①標準入力でコマンド行数lineNum、コマンド列lineを受け取る
        int lineNum = sc.nextInt();
        sc.nextLine(); // 改行を消費

        String [] line = new String[lineNum];
        for(int i = 0; i < lineNum; i++){
            line[i] = sc.nextLine();
        }

        //②コマンド列からコマンドと連結リストに追加する数値を取得して、処理を行う。
        for(int i = 0; i <lineNum; i++){
            //コマンド組を分割
            String[] parts = separateLine(line[i]);

            String command;
            int inputNumber;
            if(parts.length == 2){
                command = parts[0];
                inputNumber = Integer.parseInt(parts[1]);
            }else{
                command = line[i];
                inputNumber = 0;
            }

            //コマンドごとに処理を切り替えて実行
            operation(command, inputNumber);
        }

        //③結果を出力
        for(int i = 0; i < linkedList.size(); i++){
            int element = linkedList.get(i);

            if(i != linkedList.size() - 1){
                System.out.print(element);
                System.out.print(" ");    
            }else{
                System.out.print(element);
            }
        }
        System.out.println();    
        sc.close();

        linkedList.clear();
        linkedList = null;
    }
    /**
     * 初期化
     */
    static void init(){
        linkedList = new LinkedList<Integer>();
    }
    /**
     * 連結リストの先頭にキー x を持つ要素を継ぎ足す。
     * @param x 追加する要素 
     */
    static void insert(int x){
        linkedList.add(0,x);
    }
    /**
     * キー x を持つ最初の要素を連結リストから削除する。そのような要素が存在しない場合は何もしない。
     * @param x 削除する要素 
     */
    static void delete(int x){
        boolean hasNumber = linkedList.contains(x);

        if(hasNumber){
            int index = linkedList.indexOf(x);
            linkedList.remove(index);
        }
    }
    /**
     * リストの先頭の要素を削除する。
     * 
     */
    static void deleteFirst(){
        linkedList.remove();//引数なしの時は先頭を削除
    }
    /**
     * リストの末尾の要素を削除する
     * 
     */
    static void deleteLast(){
        linkedList.removeLast();
    }
    /**
     * 入力コマンドによって処理を切り替える
     * 
     */
    static void operation(String command, int inputNumber){
        switch(command){
            case "insert":
                insert(inputNumber);
                break;
            case "delete":
                delete(inputNumber);
                break;
            case "deleteFirst":
                deleteFirst();
                break;
            case "deleteLast":
                deleteLast();
                break;
            default:
                throw new IllegalStateException("コマンドが不正です");
        }
    }
    /**
     * コマンド列からコマンドと数値を分離する
     * @param line 標準入力から取得したコマンド列
     * @return　コマンドと数値
     * 
     */
    static String[] separateLine(String line){
        return line.split(" ");
    }
}
