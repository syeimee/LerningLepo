package exday7;

public class SampleEx702{
    public static void main(String[] args) {
        try{
            for(int i = 3; i >= 0; i--){
                int a = i;
                int b = 5;
                System.out.print(b + "/" + a + "=");
                System.out.println(b/a);
            } 
        }catch(ArithmeticException e){
            System.out.println();
            System.out.println("0による割り算発生");
        }finally{
            System.out.println("終了");
        }
    }
}   