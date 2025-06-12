// https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=ITP1_5_C&lang=ja

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

            //奇数番目が#、偶数番目が・ 
            for(int u = 0; u < h.get(i); u++){

                String start;
                String next;

                if(u % 2 == 0){
                    start = ".";
                    next = "#";
                }else{
                    start = "#";
                    next = ".";
                }

                for(int s = 0; s < v.get(i); s++){
                    if(s % 2 == 0){
                        System.out.print(next);
                    }else{
                        System.out.print(start);
                    }
                }
                System.out.println();//改行
            }

            System.out.println();//データセットの後も改行

        }
    }
}
