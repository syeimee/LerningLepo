package day6;

public class TwoString{
    private String string1,string2;

    public void setString(String string1,String string2){
        this.string1 = string1;
        this.string2 = string2;
    }

    public String getString1(){
        return this.string1;
    }

    public String getString2(){
        return this.string2;
    }

    public String getConnectedString(){
        return this.string1 + this.string2;
    }


}