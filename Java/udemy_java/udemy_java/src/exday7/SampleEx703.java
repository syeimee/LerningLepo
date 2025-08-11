package exday7;

public class SampleEx703 {
    public static void main(String[] args) {
        try{
            for(int i = 0; i<=5; i++){
                int a = getNum(i);
                int b = 5;
                System.out.println(a+"/"+b+"=");
                System.out.println(calc(a,b));
            }

        }catch(ArithmeticException e){
            System.out.println();
            System.out.println("0による割り算発生");
        }catch(ArrayIndexOutOfBoundsException e){
            System.out.println("配列の範囲外にアクセスしました");
        }finally{
            System.out.println("終了");
        }
    }

    private static int calc(int a,int b)throws ArithmeticException{
        return a/b;
    }

    //範囲外に出た時の処理
    public static int getNum(int index) throws ArrayIndexOutOfBoundsException{
        int[] num = {1,2,3,4};
        return num[index];
    }











}
