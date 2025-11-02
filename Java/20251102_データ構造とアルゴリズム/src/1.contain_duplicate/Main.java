/* QUESTION
* Given nums[1,2,3,1], return true if there are duplicate items
*/
import java.util.*;
public class Main {

    // return true if nums[] contain dup
    // 条件: nums[1,2,3,1]
    // 結果: true
    public static boolean containDuplicate(int[] nums){
        
        // 境界値：nums.lengh <= 1だったら全てユニークなのでreturn false
        if (nums.length <= 1) return false;
        
        Map <Integer, Boolean> map = new HashMap<>();
        // step1: 単方向に検索する
        for(int num: nums){

            // step2-1: map.contain(nums[i]) == trueでdupだったらreturn true
            if(map.containsKey(num)) return true;

            // step2-2: map.contain(nums[i]) == falseだったらmapにinsertする
            map.put(num, true);
        }
        // retrun false
        return false;
    }


    public static void main(String[] args) {

        int[] nums = {1,2,3,6};
        boolean result = containDuplicate(nums);
        System.out.println(result);
    }
}

// ネストするとｎの２乗回の検索回数になるのでパフォーマンス悪い

// public class Main {
//     public static void main(String[] args) {
//         Map<Integer, Integer> nums = new HashMap<>();

//         nums.put(1,1);
//         nums.put(2,2);
//         nums.put(3,3);
//         nums.put(4,1);

//         boolean isDup = false;
//         for(int i = 1; i < 4; i++){
//             int count = 0;
//             for(Integer value: nums.values() ){
//                 if(value == i){
//                     count ++;
//                 }
//                 if(count > 1) {
//                     isDup = true;
//                 count = 0;
//                 }
//             }
//         }

//         System.out.println(isDup);
//     }
// }
