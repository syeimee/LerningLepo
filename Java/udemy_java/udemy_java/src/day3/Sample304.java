package day3;

class Sample304{
    public static void main(String[] args) {
        /*================
        半丁博打を作ってみる
        ================*/

        // サイコロの目
        int dice = (int)(Math.random() * 7) + 1; //1から6までの乱数

        if(dice > 0 && dice < 7){

            if(dice % 2 == 0){
                System.out.println(dice + "の「丁」");
            }else{
                System.out.println(dice + "の「半」");
            }
            
        }else{
            System.out.println(dice +"は範囲外の値です");
        }

    }
}