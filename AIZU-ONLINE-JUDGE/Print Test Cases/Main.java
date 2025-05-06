import java.util.Scanner;
/**
* ============================================
*  TITLE: Print Test Cases
*  URL: https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=ITP1_3_B&lang=ja
* ============================================
* 作成者: syeimee
* 作成日: 2025/05/06
*/

public class Main{
    public static void main(String[] args){

        int Max_TIMES = 10000;
        Scanner sc = new Scanner(System.in);
        int a[] = new int[Max_TIMES];

        int count = 0;
        for(int i = 0; i < Max_TIMES; i++){

            int input = sc.nextInt();

            if(input == 0){
                break;
            }else{
                a[i] = input;
                count++;
            }
        }

        for(int i = 0; i < count; i++){
            System.out.println("Case " + (i+1) + ": " + a[i]);
        }

        sc.close();
    }
}