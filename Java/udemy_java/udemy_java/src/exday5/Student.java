package exday5;

public class Student {
    private String name;
    private int grade;
    private int number;

    public Student(String name,int grade,int number){
        this.name = name;
        this.grade = grade;
        this.number = number;
    }

    public String getName(){
        return this.name;
    }

    public int getGrade(){
         return this.grade;
    }

    public int getNumber(){
        return this.number;
    }

}
