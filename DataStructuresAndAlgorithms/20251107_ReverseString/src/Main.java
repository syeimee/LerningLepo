public class Main {
    public static void main(String[] args) {
        String words = "I am Dog";
        System.out.println(reverseStrings(words));
    }

    public static String reverseStrings(String s){
        int front = 0;
        int end = 0;
        char[] c = s.toCharArray();
    
        //step1 linear scan
        while(end < s.length()) {
            //step2: if words[end] == " " then reverse(words, front, end -1)
            if(c[end] == ' '){
                reverse(c, front, end - 1);
                front = end + 1;
            }else if(end == s.length()-1){
                reverse(c, front, end);
            }

            end++;
        }

        return new String(c);
    }

    public static void reverse(char[] c, int front, int end){
        while(front < end){
            char tmp = c[front];
            c[front] = c[end];
            c[end] = tmp;
            front++;
            end--;
        }
    }
}