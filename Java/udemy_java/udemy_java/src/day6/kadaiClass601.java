package day6;

class KadaiClass601{

    public int max(int a, int b, int c){

        int max = a;

        if(max < b){
            max = b;
        }

        if(max < c){
            max = c;
        }

        return max;
    }  

    public int min(int a, int b, int c){

        int min = a;

        if(min > b){
            min = b;
        }

        if(min >  c){
            min = c;
        }

        return min;
    }  


}