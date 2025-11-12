// public class Main {
//     public static void main(String[] args) {
//         test: //ラベルをつける
//         for(int i = 0; i < 100; i++){
//             for(int j = 0; j < 100; j++){
//                 if(j == 2){
//                     break test;//ラベルをつけたとこまで抜ける
//                 }
//             }
//             System.out.println(i);
//         }
//         System.out.println("finish");
//     }
// }

public class Main {
    public static void main(String[] args) {
        for(int i = 0; i < 100; i++){
            for(int j = 0; j < 100; j++){
                if(j == 2){
                    System.out.println("finish");
                    return;
                }
            }
            System.out.println(i);
        }
    }
}
