package exday5;

import java.util.*;

public class SampleEx501 {
    public static void main(String[] args) {
        ArrayList al = new ArrayList();
        al.add(new Student("安藤一郎",1,1));
        al.add(new Student("伊藤花子",1,1));
        al.add(new Student("太田たかし",1,1));
        al.add(new Student("加藤紀子",1,1));
        al.add(new Student("木戸直美",1,1));

        al.remove(3);
        
        //ArrayListではsizeメソッドで配列の長さ、getで配列そのものを取得できる
        for(int i = 0; i < al.size(); i++){
            Student s = (Student) al.get(i);
            System.out.println("番号:"+ s.getNumber() + " 名前:"+ s.getName()+ " 学年:"+ s.getGrade());
        }

    }

    
}
