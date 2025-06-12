import java.util.Scanner;
/**
* ============================================
*  TITLE: Circle in a Rectangle
*  URL: https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=ITP1_2_D&lang=ja
* ============================================
* 作成者: syeimee
* 作成日: 2025/05/05
*/

public class Main{
    public static void main(String[] args){

        Scanner sc = new Scanner(System.in);

        int width = sc.nextInt();
        int height = sc.nextInt(); 
        int x = sc.nextInt(); 
        int y = sc.nextInt(); 
        int r = sc.nextInt();

        Main varidate = new Main();
        varidate.varidate(width, height, x, y, r); // 入力値の検証

        Main region_judge = new Main();
        region_judge.region_judge(width, height, x, y, r); // 円が長方形の中に収まっているかどうかを判定
    
        sc.close();
    }

    void varidate(int width, int height, int x, int y, int r){
        int MIN_WIDTH = 0;
        int MAX_HEIGHT = 0;
        int MIN_X = -100;
        int MAX_Y = 100;
        int MAX_R = 100;

        if(width <= MIN_WIDTH || height <= MAX_HEIGHT || x < MIN_X || y > MAX_Y ||r > MAX_R) { // 数列の長さが1以上100以下であることを確認
            System.out.println("入力値が不正です");
            return;
        }
    }

    void region_judge(int width, int height, int x, int y, int r){
        int rect_x_min = 0;
        int rect_x_max = width;
        int rect_y_min = 0;
        int rect_y_max = height;
        int circle_x_min = x - r;
        int circle_x_max = x + r;
        int circle_y_min = y - r;
        int circle_y_max = y + r;
        if(circle_x_min < rect_x_min || circle_x_max > rect_x_max || circle_y_min < rect_y_min || circle_y_max > rect_y_max){
            System.out.println("No");
        }else{
            System.out.println("Yes");
        }
    }

}