package day6;

public class Sample602{
    public static void main (String [] args){

        //   インスタンス化①
        SampleClass02 sc = new SampleClass02();

        sc.n = 100;
        sc.s = "hello";

        System.out.println(sc.add(3,4));
        System.out.println(sc.add("world"));
        sc.showNum();


        //インスタンス化②
        SampleClass02 sc2 = new SampleClass02();

        sc2.n = 200;
        sc2.s = "programming";

        System.out.println(sc2.add(19,21));
        System.out.println(sc2.add("noujiruderu"));
        sc2.showNum();

    }


    
}