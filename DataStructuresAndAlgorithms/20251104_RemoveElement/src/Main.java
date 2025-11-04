import java.util.Arrays;
public class Main {
    public static void main(String[] args) {
        int[] nums = {3,2,2,3};
        int val = 3;
        System.out.println(removeElement(nums, val));
    }
    // return length of array section without value
    //pre: nums=[3,2,2,3] val=3
    //post: return 2
    public static int removeElement(int[] nums, int val){
        
        int nonValLast = 0;
        int runnerIndex = 0;
        //step1 while runnerIndex < nums.length
        //testcase1 nums=[3,2,2,3] val=3 runnerIndex=0 nonValLast=0 -> nums=[3,2,2,3]
        //testcase1 nums=[3,2,2,3] val=3 runnerIndex=1 nonValLast=0 -> nums=[2,3,2,3]
        //testcase1 nums=[3,2,2,3] val=3 runnerIndex=2 nonValLast=1 -> nums=[2,2,3,3]
        //testcase1 nums=[3,2,2,3] val=3 runnerIndex=3 nonValLast=2 -> nums=[2,2,3,3]

        while(runnerIndex < nums.length){
            //step2 if nums[runnnerIndex] != val then swap(nums, runnerIndex, nonValLast), Increment nonValLast 
            if(nums[runnerIndex] != val){
                swap(nums, runnerIndex, nonValLast);
                nonValLast++;
            }
            //step2 increment runnerIndex
            runnerIndex++;
        }

        //step3 return nonValLast
        return nonValLast;
    }
    private static void swap(int[] nums, int runnerIndex, int nonValLast){
        int tmp = nums[nonValLast];
        nums[nonValLast] = nums[runnerIndex];
        nums[runnerIndex] = tmp;
    }

}
