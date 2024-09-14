import { NextRequest, NextResponse } from "next/server";

//このファイルはapp直下ではなく、src直下に置く必要がある。
export const middleware = (request: NextRequest) =>{
    console.log("MIDDLE WARE");
    return NextResponse.next();
}

export const config ={
    matcher: ['/','/task'] //ミドルウェアを通過させたいパスを配列で指定
}



