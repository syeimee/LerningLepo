// 1.配列A[100]と配列B[100]を用意する。
// 2.配列A、Bにそれぞれ1～999までの整数をランダムに入れる（重複した値も可）
// 3.配列Aの全要素にて、配列Bに同じ値がある場合はその配列Aの要素の値を0にする。
// 4.配列Aの要素を0にした配列Bの要素も0にする。
// 5.配列Aの要素が0となった件数を表示する。
// 6.配列Bの要素が0となった件数を表示する。

import java.util.Arrays;
import java.util.Random;

class Kadai{
    public static void main (String[] args){

        final int ARRAY_SIZE = 100;
        final int MIN_RANDOM_VALUE = 1;
        final int MAX_RANDOM_VALUE = 100;

        int[] A = new int[ARRAY_SIZE];
        int[] B = new int[ARRAY_SIZE];
        
        Random rand = new Random();
        for (int i = 0; i < ARRAY_SIZE; i++) {
            A[i] = rand.nextInt(MAX_RANDOM_VALUE - MIN_RANDOM_VALUE + 1) + MIN_RANDOM_VALUE;
            B[i] = rand.nextInt(MAX_RANDOM_VALUE - MIN_RANDOM_VALUE + 1) + MIN_RANDOM_VALUE;
        }

        System.out.println("処理前の配列------------------------------");
        System.out.println("A: " + Arrays.toString(A));
        System.out.println("B: " + Arrays.toString(B));
        System.out.println("------------------------------------------");

        // 比較の齟齬が出ないように、配列Bの複製を作成し、結果出力用の配列とする
        int[] resultB = Arrays.copyOf(B, B.length);

        for (int i = 0; i < A.length; i++) {
            for (int j = 0; j < B.length; j++) {
                if (A[i] == B[j]) {
                    A[i] = 0;
                    resultB[j] = 0; 
                    break;
                }
            }
        }

        System.out.println("処理後の配列------------------------------");
        System.out.println("A: " + Arrays.toString(A));
        System.out.println("B: " + Arrays.toString(resultB));
        System.out.println("------------------------------------------");

        int countA = 0;
        int countB = 0;

        for(int i = 0; i < A.length; i++){
            if(A[i] == 0){countA++;}
        }

        for(int i = 0; i < resultB.length; i++){
            if(resultB[i] == 0){countB++;}
        }

        System.out.println("配列Aの要素が0となった件数: " + countA);
        System.out.println("配列Bの要素が0となった件数: " + countB);

    }
}