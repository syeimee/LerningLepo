// https://atcoder.jp/contests/adt_easy_20251028_1/tasks/abc356_c
// CASE1:
/*
*3 2 2
*3 1 2 3 o →正の組み合わせ(1,2)(2,3)(1,3)
*2 2 3 x → xの時は、正の組み合わせから除外(2,3)
* ∴ 正の組み合わせは(1,2)(1,3)
 */ 

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Scanner;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(); // 鍵の本数
        int m = sc.nextInt(); // テストの試行回数
        int k = sc.nextInt(); // 正しい鍵の数

        //　テスト試行回数分ループを回す
        int[][] tests = new int[m][]; // テストケースの組
        String[] results = new String[m]; // テストの結果
        int maxCountTestCaseIndex = 0; // 最大値個数をもつテストケースのIndex
        for(int i = 0; i < m; i++){
            // STEP1:鍵のテストパターンを受け付ける
            int c = sc.nextInt();
            tests[i] = new int[c];  

            // STEP1-1:テストで使用する鍵の本数を受け付けて、その数だけループする
            for(int s = 0; s < c; s++){
                //テストケース組に入れる
                tests[i][s] = sc.nextInt();
            }
            results[i] = sc.next();  

            // 最大のcを持つインデックスを更新
            if (tests[i].length > tests[maxCountTestCaseIndex].length && results[i].equals("o")) {
                maxCountTestCaseIndex = i;
            }
        }
        sc.close();

        // STEP3:STEP2を基準に正しい鍵の組み合わせを作る。
        List<List<Integer>> candidates = new ArrayList<>();
        combination(tests[maxCountTestCaseIndex], k, 0, new ArrayList<>(), candidates);

        // STEP4:各候補がすべてのテスト結果と一致するかチェック
        // 各候補がすべてのテスト結果と一致するかチェック
        int validCount = 0;
        for(List<Integer> comb : candidates){
            Set<Integer> correctKeys = new HashSet<>(comb);
            boolean isValid = true;
            
            for(int i = 0; i < m; i++){
                // テストで使った鍵のうち、正しい鍵が何本含まれているか数える
                int count = 0;
                for(int key : tests[i]){
                    if(correctKeys.contains(key)){
                        count++;
                    }
                }
                
                // 結果が'o'ならcount >= k、'x'ならcount < k である必要がある
                if(results[i].equals("o")){
                    if(count < k){
                        isValid = false;
                        break;
                    }
                } else {
                    if(count >= k){
                        isValid = false;
                        break;
                    }
                }
            }
            
            if(isValid) validCount++;
        }
        
        System.out.println(validCount);
}

    //nCrの計算
    static void combination(int[] arr, int r, int start, List<Integer> current, List<List<Integer>> result) {
        // r個選んだら結果に追加
        if (current.size() == r) {
            result.add(new ArrayList<>(current));
            return;
        }
        // startから順に選んでいく
        for (int i = start; i < arr.length; i++) {
            current.add(arr[i]);                 // 要素を選ぶ
            combination(arr, r, i + 1, current, result); // 再帰的に次を選ぶ
            current.remove(current.size() - 1);  // 戻ってやり直す（バックトラック）
        }
    }
}
