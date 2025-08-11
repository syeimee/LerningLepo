package exday7;

public class SampleEx704 {
    public static void main(String[] args){
        try{
            throw new SampleException("自作の例外のサンプル");
        }catch(SampleException e){
            e.printStackTrace();
        }
    }
    
}
