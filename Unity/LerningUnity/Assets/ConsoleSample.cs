using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ConsoleSample : MonoBehaviour
{

    void Start()
    {
        List<int> threeAhoNumberList = GetThreeAhoNumberList();
        foreach(int number in threeAhoNumberList){
            Debug.Log(number);
        }
    }

    List<int> GetThreeAhoNumberList(){
        List<int> threeAhoNumberList = new List<int>();
        for(int i =1; i <= 100; i++){
            if(IsThreeAhoNumber(i)){
                threeAhoNumberList.Add(i);
            }
        }
        return threeAhoNumberList;
    }

    bool IsThreeAhoNumber(int number){
        if(number % 3 == 0){
            return true;
        }

        while(number != 0){
            if(number % 10 == 3) return true;
            number = number / 10;
        }

        return false;
    }
}
