import java.util.HashMap;
import java.util.Map;

public class Main {
    /* ----------------------
     * | 3 | 2 | 3 | array length = 3 , majority = ceilng(3/2) = 2 ∴ return a majority element which appears >= 2 times
     */


     public static void main(String[] args) {
        int[] nums = {3, 2, 3};
        System.out.println(majorityElement(nums));
     }

     // retrun majority element (appearing ceil(n/2) times) in array
     // pre: nums[3, 2, 3]
     // post: 3
     public static int majorityElement(int[] nums){

        Map<Integer, Integer> map = new HashMap<>();
        int maxCount = (int) Math.ceil(nums.length / 2);

        // step1: hashmapを作る
        for(int num: nums){
            if(!map.containsKey(num)){
                map.put(num, 1);
            }else{
                map.put(num, map.get(num) + 1);
            }
        }

        // mapのvalueがmaxCount以上だったらreurn (int) entry.getKey()
        int majorityNum = nums[0];
        for(Map.Entry entry: map.entrySet()){
            if((int) entry.getValue() >= maxCount){
                majorityNum = (int) entry.getKey();
            }
        }
        return majorityNum;
     }
}
