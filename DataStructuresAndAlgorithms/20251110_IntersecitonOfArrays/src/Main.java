import java.util.HashMap;
import java.util.Map;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] nums1 = {1,2,3,4};
        int[] nums2 = {2,3,4,5};
        System.out.println(Arrays.toString(Intesection(nums1,nums2)));
    }

    //return arrays of items which appear in both nums1 and nums2
    //pre: nums1 = [1,2,2,1] nums2 = [2,2]
    //post: resutls=[2]
    public static int[] Intesection(int[] nums1, int[] nums2){
        
        //step1 add items in nums1 to hashmap and mark them as 1
        //testcase1: nums1 = [1,2,2,1] nums2 = [2,2], map[(1,1),(2,1)]
        Map<Integer,Integer> map = new HashMap<>(); // (nums1の数値, duplicateではないとき1)
        for(int num:nums1){
            if(!map.containsKey(num)){
                map.put(num, 1);
            }
        }

        int numOfIntersections = 0;//重複している数
        //step2 for each item in nums2, marks ones that exist in hashmap as 0(true/false)
        //testcase1: nums1 = [1,2,2,1] nums2 = [2,2], map[(1,1),(2,0)] numOfIntersections = 1
        for(int num:nums2){
            if(map.containsKey(num) && map.get(num) == 1){
                map.put(num, 0);
                numOfIntersections ++;
            }
        }

        int[] results = new int[numOfIntersections];
        int i = 0;
        for(Map.Entry entry: map.entrySet()){
            //0のものだけを返す
            if((int) entry.getValue() == 0){
                results[i] = (int) entry.getKey();
                i++;
                //testcase1: nums1 = [1,2,2,1] nums2 = [2,2], map[(1,1),(2,0)] numOfIntersections = 1 results = [2]
            }
        }
        return results;
    }

}
