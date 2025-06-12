package exday5;

import java.util.ArrayList;

public class SampleEx502 {
        public static void main(String[] args) {
        //<>を使うことで、arrayの中に入れることができるクラスを限定できる
        ArrayList<Student> al = new ArrayList<Student> ();
        al.add(new Student("安藤一郎",1,1));
        al.add(new Student("伊藤花子",1,1));
        al.add(new Student("太田たかし",1,1));
        al.add(new Student("加藤紀子",1,1));
        al.add(new Student("木戸直美",1,1));

        al.remove(3);
        
        //alを1つずつ取り出してsに格納する（最近は特殊FOR文で書くことが多い）
        for(Student s : al){
            System.out.println("番号:"+ s.getNumber() + " 名前:"+ s.getName()+ " 学年:"+ s.getGrade());
        }

    }
}
