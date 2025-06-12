package day5;

class Sample501{
    public static void main(String[] args) {
        double [] num = new double [3];
        double sum, avg;

        num[0] = 5.0;
        num[1] = 6.0;
        num[2] = 7.0;
        sum = 0.0;

        for(int i = 0; i < num.length;i++){
            sum += num[i];
        }

        avg = sum / num.length;

        System.out.println("sum:" + sum);
        System.out.println("avg:" + avg);

    }
}