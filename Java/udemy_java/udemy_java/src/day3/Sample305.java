package day3;

class Sample305{
    public static void main(String[] args) {
        int rand = (int)(Math.random()*3)+1;

        System.out.println(rand);

        switch (rand) {
            case 1:
                System.out.println("one");
                break;

            case 2:
                System.out.println("two");
                break;

            case 3:
                System.out.println("three");
                break;

            default:
                System.out.println("例外値");
                break;
        }
    }
}