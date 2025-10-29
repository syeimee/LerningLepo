// AtCoder で定期的に開催されている、国際的な権威があるコンテストである AtCoder Grand Contest (以下、AGC) は今までに 
// 54 回開催されてきました。

// みなさんがちょうど参加している 
// 230 回目の ABC である ABC230 と同様に、 当初は 
// N 回目の AGC のコンテスト名には 
// N を 
// 3 桁になるようにゼロ埋めした数が割り振られていました。( 
// 1 回目の AGC は AGC001, 
// 2 回目の AGC は AGC002, ...)

// ところが、最新の 
// 54 回目の AGC のコンテスト名は AGC055 で、回数より 
// 1 大きい数が割り振られています。これは、AGC042 が社会情勢の影響で中止されて欠番となったため、
// 42 回目以降に開催されたコンテストでは開催された回数より 
// 1 大きい数が割り振られているからです。(入出力例にある説明も参考にしてください。)

// さて、ここで問題です。整数 
// N が与えられるので、
// N 回目に開催された AGC のコンテスト名を AGCXXX の形式で出力してください。ここで、XXX にはゼロ埋めがなされた 
// 3 桁の数が入ります。
// https://atcoder.jp/contests/adt_easy_20251028_1/tasks/abc230_a

import java.util.*; 
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        sc.close();
        
        int num = (n >= 42) ? n + 1 : n;

        System.out.printf("AGC%03d", num);
    }
}