import java.util.HashMap;
import java.util.Map;
import java.util.Arrays;
public class Main {

    public static void main(String[] args) {
        int[] nums = {2,7,11,15};
        int target = 9;

        System.out.println(Arrays.toString(twoSum(nums, target)));
    }
    
    // 足して9になるペアのインデックスを返す
    // pre: nums[2,7,11,15] target=9
    // post: [0,1]
    public static int[] twoSum(int[] nums,int target){
        Map<Integer, Integer> map = new HashMap<>(); // num[i], index
        
        //testcase1: nums={1,2,3,4} target=4,i=0,map=(1,0)
        //testcase1: nums={1,2,3,4} target=4,i=1,map=(1,0)(2,1)
        //testcase1: nums={1,2,3,4} target=4,i=2,map=(1,0)(2,1) retrun 3,1
        for(int i = 0; i < nums.length; i++){
            //step1-1 map.contains(target-num[i]) == trueなら return num[i], target-num[i]
            if(map.containsKey(target-nums[i])){
                return new int[]{map.get(target-nums[i]), i};

                // 以下のように配列を用意してもいいかも
                //int[] result = new int[2];
                // result[0] = map.get(target-nums[i]);
                // result[1] = i;
                // retrun result

            }
            //step1-2 map.contains(target-num[i]) == falseなら　map.put(nums[i],i)
            map.put(nums[i], i);
        }
        // retrun 
        return null;
    }
}