package day4;

class Sample405{
    public static void main(String[] args) {
        int dice = (int) (Math.random() * 7) + 1;

        while(true){
            System.out.println(dice);
            dice = (int) (Math.random() * 7) + 1;

            if(dice == 6){
                System.out.println(dice);
                System.out.println("処理を終了します");
                break;
            }

        }
    }
}