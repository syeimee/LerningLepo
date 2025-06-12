package day6;

public class SampleClass02{
    int n = 10;
    String s = "Field";

    int add (int a, int b){
        return a + b;
    }

    String add(String b){
        return this.s + b;
    }

    void showNum(){
        System.out.println("n=" + n);
    }

}