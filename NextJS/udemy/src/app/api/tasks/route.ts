//http://localhost:3000/api/tasks　エンドポイント
import { NextResponse } from "next/server";

//ファイル名は固定
export interface Task {
    id: number,
    name: String
}

const tasks: Task[] =[
    {id: 1, name: 'プログラミング'},
    {id: 2, name:'ランニング'}
];

const sleep = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

export const GET = async () =>{
    await sleep(3000);
    return NextResponse.json({tasks},{status: 200})
};

export const dynamic = 'force-dynamic';