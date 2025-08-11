package day6;

/*
 * a,b,cを、いずれも1以上100以下の整数とするとき、
 * a*a+b*b=c*cを満たす、全てのa,b,cの組み合わせ全てと、
 * その数を求め、画面に表示しなさい。
 * ただし、a,bの数値の組み合わせが同じものも別のものとしてもかまわない。
 * 具体的には、a=3,b=4,c=5と、a=4,b=3,c=5は別の組み合わせとする
 */

public class Prob8_1{
    public static void main(String[] args) {
        
        int a,b,c;
        boolean isInt = false;
        int MAXNUMBER = 100;
        int MINNUMBER = 1;
        int count = 0;

        for(int i = MINNUMBER; i <= MAXNUMBER; i++){
            for(int j = MINNUMBER; j<= MAXNUMBER; j++){
                    a = i;
                    b = j;

                    double sqrt = Math.sqrt(a * a + b * b);
                    isInt = (sqrt == Math.floor(sqrt));
                    if(isInt){
                        c = (int) sqrt;
                        System.out.print("a = " + a +"b = " + b +"c = " + c);
                        System.out.println();
                        count ++;
                    }

            }
        }

        System.out.println("合計:" + count);
        System.out.println("終了");
    }
}
