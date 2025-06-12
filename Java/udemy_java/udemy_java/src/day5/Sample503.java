package day5;

class Sample503{
    public static void main(String[] args) {
        int [][] num = new int[3][5];

        //num.lengthは何階か　num[i].lentghは何部屋かみたいなイメージ
        for(int i = 0; i < num.length; i++){
            for(int j = 0; j < num[i].length; j++){
                num[i][j] = i + j;
            }
        }

        for(int i = 0; i < num.length; i++){
            for(int j = 0; j < num[i].length; j++){
                System.out.print(num[i][j] + " ");
            }
        }

        System.out.println();
    }
}