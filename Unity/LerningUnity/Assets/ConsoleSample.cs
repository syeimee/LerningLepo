using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ConsoleSample : MonoBehaviour
{

Rigidbody rigidbody;

void Start(){
    rigidbody = GetComponent<Rigidbody>();
}
void Update(){
    float x = Input.GetAxis("Horizontal");//水平方向
    float y = Input.GetAxis("Vertical");//垂直方向

    rigidbody.velocity = new Vector3(x, y, 0);
}
}
