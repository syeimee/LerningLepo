import java.util.Arrays;
public class Main {
    
    public static void main(String[] args) {
        char[] s = {'A', 'B', 'C', 'D', 'E'};  // シングルクォート ' を使う
        System.out.println(swapString(s));
    }

    // 文字列を入れ替える
    //pre: s[c,a,t] 
    //post: s[t,a,c]
    public static char[] swapString(char[] s){

        //corner: s.length < 2だったらそのままリターン
        if(s.length < 2) return s;

        int front = 0;
        int end = s.length - 1;
        //step1:frontとendが交差するまでループ
        //testcase1: s=["C","A","T"] front = 0, end = 2 -> s=["T","A","C"]
        //testcase1: s=["C","A","T"] front = 1, end = 1 -> s=["T","A","C"]
        //testcase1: break;
        while (front < end) {
            swap(s, front,end);
            front ++;
            end --;
        }

        //step2: loopが終わったらreturnする
        return s;
    }
    
    private static void swap(char[] s, int front, int end){
            char tmp = s[end];
            s[end] = s[front];
            s[front] = tmp;
    }
}
