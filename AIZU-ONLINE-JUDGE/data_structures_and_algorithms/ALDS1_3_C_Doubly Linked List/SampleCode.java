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

public class SampleCode {
    static LinkedList<Integer> linkedList;

    public static void main(String[] args) {
        sampleCode();
    }
    static void sampleCode(){
        //新しいLinkedListオブジェクトを初期化
        LinkedList<String> linkedList = new LinkedList<String>(Arrays.asList("Hello","World"));
        System.out.println(linkedList);//[Hello, World]

        /**
         * 要素の追加
         */
        //要素の追加
        linkedList.add("d");
        linkedList.addAll(Arrays.asList("e","f")); 
        System.out.println(linkedList); //[Hello, World, d, e, f]

        //インデックスを指定した要素の追加
        linkedList.add(1,"x");
        System.out.println(linkedList); //[Hello, x, World, d, e, f]

        /**
         * 要素の削除
         */
        //最初の要素の削除
        linkedList.remove(); //引数なしの場合は最初の要素を削除
        System.out.println(linkedList); //[x, World, d, e, f]

        //2番目の要素の削除
        linkedList.remove(2);
        System.out.println(linkedList); //[x, World, e, f]

        //連結リスト内の特定の文字列を削除
        linkedList.remove("x");
        System.out.println(linkedList); //[World, e, f]

        /**
         * 要素の検索
         */
        //連結リストに文字列"World"を含む場合はtrueを返す
        boolean hasWorld = linkedList.contains("World");
        System.out.println(hasWorld); //true

        //連結リストの要素のインデックスを返す
        int indexOfF = linkedList.indexOf("f");
        System.out.println(indexOfF); //2

        //連結リスト内の指定されたインデックスの値を返す
        String elementAtIndex2 = linkedList.get(2);
        System.out.println(elementAtIndex2); //f

        /**
         * 更新
         */
        //指定されたインデックスの値を設定
        linkedList.set(2,"y");
        System.out.println(linkedList); //[World, e, y]

        /**
         * 連結リストへのアクセス
         */
        for (int i = 0; i < linkedList.size(); i++) {
            String element = linkedList.get(i);
            System.out.println(element);
            //World
            //e
            //y
        }


    }
}
