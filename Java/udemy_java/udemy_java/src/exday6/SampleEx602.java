package exday6;
import java.util.*;
public class SampleEx602 {
    //HasSetでは重複したkeyは弾かれる
    public static void main(String[] args) {
        HashSet <String> hs = new HashSet<>();
        hs.add("山田太郎");
        hs.add("山田太郎");
        hs.add("山田花子");
        hs.add("山田花子");
        hs.add("山田恭子");

        for(String s : hs){
            System.out.println(s);
        }
    }
}
