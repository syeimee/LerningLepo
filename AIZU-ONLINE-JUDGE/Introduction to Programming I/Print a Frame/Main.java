// https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=ITP1_5_B&lang=ja#

import java.util.Scanner;
import java.util.ArrayList;
public class Main {
    public static void main(String[] args) {
        // step1 縦と横の値を受け取る
        Scanner sc = new Scanner(System.in);

        ArrayList<Integer> v = new ArrayList<>();
        ArrayList<Integer> h = new ArrayList<>();

        while(true){
            String line = sc.nextLine();
            String pairs[] = line.split(" ");

            if (line.equals("0 0") ){
                break;
            }else{
                v.add(Integer.parseInt(pairs[1]));
                h.add(Integer.parseInt(pairs[0]));
            }
        }


        // step2 横の長さ分System.out.printで#を出力し、縦の長さ分そのセットを改行して出力する
        for(int i = 0; i < v.size(); i++){
            if(v.size() != h.size() ){
                break;
            }

            for(int u = 0; u < h.get(i); u++){
                if((u == 0) || (u == h.get(i) - 1)){

                    for(int s = 0; s < v.get(i); s++){
                        System.out.print("#");
                    }
                    System.out.println();//改行

                }else{
                    System.out.print("#");
                    for(int s = 0; s < v.get(i) - 2; s++){
                        System.out.print(".");
                    }
                    System.out.print("#");
                    System.out.println();//改行
                }

            }

            System.out.println();//データセットの後も改行

        }
    }
}
