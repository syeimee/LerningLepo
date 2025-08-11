package class1;

import java.io.File;
import java.io.IOException;

public class ClassSample01 {
    public static void main(String[] args){
        try{
            File file = new File("/Users/yuu/Desktop/filesample.txt");   // Fileクラスのインスタンスを作成
            System.out.println(file.exists());                  // ファイルの有無を調べる
            System.out.println(file.createNewFile());           // ファイルの生成
        }catch(IOException e){
            System.out.println("処理に失敗しました。");
        }
    }

}