import java.util.HashMap;
import java.util.Map;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] nums1 = {1,2,3,4};
        int[] nums2 = {2,3,4,5};
        System.out.println(Arrays.toString(Intesection(nums1,nums2)));
    }

    public static int[] Intesection(int[] nums1, int[] nums2){
        //step1 add items in nums1 to hashmap and mark them as 1
        Map<Integer,Integer> map = new HashMap<>();
        for(int num:nums1){
            if(!map.containsKey(num)){
                map.put(num, 1);
            }
        }

        int count = 0;
        //step2 for each item in nums2, marks ones that exist in hashmap as 0(true/false)
        for(int num:nums2){
            if(map.containsKey(num) && map.get(num) == 1){
                map.put(num, 0);
                count ++;
            }
        }

        int[] results = new int[count];
        int i = 0;
        for(Map.Entry entry: map.entrySet()){
            //0のものだけを返す
            if((int) entry.getValue() == 0){
                results[i] = (int) entry.getKey();
                i++;
            }
        }

        return results;
    }

}
