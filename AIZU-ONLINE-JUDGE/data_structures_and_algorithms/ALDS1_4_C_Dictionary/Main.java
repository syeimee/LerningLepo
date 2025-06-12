/**
 * ============================================
 *  TITLE: Dictionary
 *  URL:https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=ALDS1_4_C&lang=ja
 * ============================================
 * 
 * 辞書
 * 以下の命令を実行する簡易的な「辞書」を実装してください。
 * 
 * insert str: 辞書に strを追加する。
 * 
 *  
 * find str: 辞書に strが含まれる場合 'yes'と、含まれない場合 'no'と出力する。
 * 
 * 入力 最初の行に命令の数 nが与えられます。続く n行に n件の命令が順番に与えられます。命令の形式は上記のとおりである。
 * 
 * 出力 各 find 命令について、yes または no を１行に出力してください。
 * 
 * 制約
 * 与えられる文字列は、'A', 'C', 'G', 'T' の４種類の文字から構成される。
 * 1≤文字列の長さ≤12
 * n≤1,000,000
 * 
 * 
 * 
 * 作成者: syeimee
 * 作成日: 2025/05/12
 */
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

class Main{
    static Map<Integer, String> dictionary = new HashMap<>();
    static int key = 0;

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        sc.nextLine();

        String[] commands = new String[n];
        for(int i = 0; i < n; i++){
            commands[i] = sc.nextLine();
        }

        for(int i = 0; i < commands.length; i++){
            String parts[] = commands[i].split(" "); 
            switch (parts[0]) {
                case "insert":
                    insert(parts[1]);
                    break;
                case "find":
                    System.out.println(find(parts[1]));
                    break;
                default:
                    break;
            }
        }

        sc.close();

    }

    static void insert(String value){
        dictionary.put(key,value);
        key++;
    }
    static String find(String value){
        if(dictionary.containsValue(value)){
            return "yes";
        }else{
            return "no";
        }
    }
}