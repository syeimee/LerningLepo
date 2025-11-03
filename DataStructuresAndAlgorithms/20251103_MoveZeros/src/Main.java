import java.util.Arrays;
public class Main {
    public static void main(String[] args) {
        int[] nums = {0, 1, 0, 3, 12 };
        System.out.println(Arrays.toString(moveZeros(nums)));
    }

    // move all zeros toward the end
    // pre: nums[0,1,0,3,12]
    // post: nums[1,3,12,0,0]
    public static int[] moveZeros(int[] nums){

        /* non-zero | zero
        *  0,1,0,3,12|
        *  -> 1,3,12 | 0,0
        */

        int nonZeroLast = 0;
        int runnerIndex = 0;
        // step1: linear scan left -> while(runnerIndex < nums.length)
        // testcase1: nums[0, 1, 0, 3, 12] nonZeroLast=0, runnerIndex=0
        // testcase1: nums[0, 1, 0, 3, 12] nonZeroLast=0, runnerIndex=1
        // testcase1: nums[1, 0, 0, 3, 12] nonZeroLast=1, runnerIndex=2
        // testcase1: nums[1, 3, 0, 0, 12] nonZeroLast=2, runnerIndex=3
        // testcase1: nums[1, 3, 12, 0, 0] nonZeroLast=3, runnerIndex=4
        while(runnerIndex < nums.length) {

            // step2: nums[runnnerIndex] != 0 then swap(nums, nonZeroLast,runnerIndex), nonZeroLast ++
            if(nums[runnerIndex] != 0){
                swap(nums, nonZeroLast, runnerIndex);
                nonZeroLast++;
            }
            runnerIndex++;
        }

        return nums;
    }

    public static void swap(int[] nums,int nonZeroLast, int runnerIndex){
        int tmp = nums[nonZeroLast];
        nums[nonZeroLast] = nums[runnerIndex];
        nums[runnerIndex] = tmp;
    }
}
