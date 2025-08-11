package day6;

public class Kadai605{
    public static void main(String[] args) {
        TwoString twoString = new TwoString();

        twoString.setString("hello", "world");
        System.out.println(twoString.getString1());
        System.out.println(twoString.getString2());
        System.out.println(twoString.getConnectedString());
    }
}