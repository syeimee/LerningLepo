import java.util.*;

/**
 * お題② nums配列の中で、インデックスの差がｋ以内に同じ値があればコンソール上でtrueを出力する。
 * 例: nums = {1, 2, 3, 1}, k = 3  -> nums[0] = 1, nums[3] = 1なのでtrue
 * 例: nums = [1,2,3,1,2,3], k = 2 -> nums[0] = 1, nums[2] = 3なのでfalse
 */

public class Main {
    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 1};
        int k = 3;
        boolean result = containDuplicate(nums,k);        System.out.println(result);
    }

    public static boolean containDuplicate(int[] nums, int k){
        if (nums.length <= 1) return false;
        
        Map<Integer, Integer> map = new HashMap<>();
        for(int i = 0; i < nums.length; i++){

            if(map.containsKey(nums[i]) && i - map.get(nums[i]) <= k ) return true;
            map.put(nums[i], i); // num, index
        }

        return false;
    }
}