// https://atcoder.jp/contests/adt_easy_20251028_1/tasks/abc322_b

import java.util.*; 
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        String s = sc.next();
        String t = sc.next();

        int result = 3;
        // 接頭辞のチェック
        if(t.substring(0,n).equals(s)){
            result = 1;
        }

        // 接尾辞のチェック
        if(t.substring(m-n).equals(s)){
            result = 2;
        }
        // 接頭辞でかつ接尾辞のチェック
        if(t.substring(0,n).equals(s) && t.substring(m-n).equals(s)){
            result = 0;
        }

        System.out.println(result);
    }
}