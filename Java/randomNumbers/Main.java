import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Random random = new Random();

        System.out.println("1から10までの数字を入力してください");
        int count = sc.nextInt();

        if(count < 1 || count > 10){
            System.out.println("入力値が不正です。1から10までの数字を入力してください");
            return;
        }

        System.out.println("##########出力結果##########");
        for(int i = 0; i < count; i++){
            int randomNumber = random.nextInt(99999999);
            System.out.println(randomNumber);
        }
    }
}
