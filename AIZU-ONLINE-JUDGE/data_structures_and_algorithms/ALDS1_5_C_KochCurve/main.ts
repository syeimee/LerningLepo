/**
 * ====================================================================
 * ##　Memo
 * ①TSファイルのコンパイルコマンド
 *  tsc main.ts
 * ②コンパイルJSの実行コマンド
 *  node main.js
 * ③標準入力の受け取り
 * const input = require('fs').readFileSync('/dev/stdin', 'utf8');
 * ④標準入力の終了
 *  Ctrl + D
 * 
 * ## 課題
 * URL : https://judge.u-aizu.ac.jp/onlinejudge/description.jsp?id=ALDS1_5_C&lang=ja
 * 
 * ## 問題概要
 * 整数 n を入力し、深さ n の再帰呼び出しによって作成されるコッホ曲線の頂点の座標を出力するプログラムを作成してください。
 * 
 * ## 入力
 * 1. 1 つの整数 n が与えられます。
 * 
 * ## 出力
 * コッホ曲線の各頂点の座標 (x,y) を出力してください。１行に１点の座標を出力してください。端点の１つ (0,0)から開始し、一方の端点 (100,0)
 * で終えるひと続きの線分の列となる順番に出力してください。出力は 0.0001 以下の誤差を含んでいてもよいものとします。
 * 
 * ## 制約
 * - 0 ≤ n ≤6 
 * ====================================================================
 */

import { isElementAccessExpression } from "typescript";

const main = () =>{
    const input: string = require('fs').readFileSync('/dev/stdin', 'utf8');
    const lines:string[] = input.split('\n');
    
    // step1 Aの要素数nを受け取る
    const n: number = parseInt(lines[0].trim())

    const START_POINT: number[] = [0, 0];
    const END_POINT: number[] = [100, 0];
    console.log(START_POINT[0].toFixed(8) + ' ' +START_POINT[1].toFixed(8));
    koch(n,START_POINT,END_POINT);
    console.log(END_POINT[0].toFixed(8) + ' ' +END_POINT[1].toFixed(8));

}

/**
 * 
 * @param currentDepth 現在見ている深さ
 * @param startingPoint 始点
 * @param endPoint 終点
 * @param targetDepth 目的の深さ
 */
const koch = (
    depth: number,
    startingPoint: number[],
    endPoint: number[],
):void =>{

    if(depth === 0){
        return;
    }

    // step2 始点と終点を1:2,2:1に内分点s,tを求める。ただしｎ=0のとき、始点(0,0)、終点(100,0)とする。
    const sx: number = (startingPoint[0] * 2  + endPoint[0]) / 3;
    const tx: number = ((startingPoint[0] + endPoint[0] * 2 )  / 3);

    const sy: number = (startingPoint[1] * 2  + endPoint[1]) / 3;
    const ty: number = ((startingPoint[1]+ endPoint[1] * 2 ) / 3);

    // step3 uを回転移動で求める
    const u: number[] = rotate60Degrees([tx,ty],[sx,sy]);

    koch(depth - 1, startingPoint, [sx,sy]);
    console.log(sx.toFixed(8) + ' ' + sy.toFixed(8));
    koch(depth - 1, [sx,sy], u);
    console.log(u[0].toFixed(8) + ' ' + u[1].toFixed(8));
    koch(depth - 1, u, [tx,ty]);
    console.log(tx.toFixed(8) + ' ' + ty.toFixed(8));
    koch(depth - 1, [tx,ty], endPoint);
}


/**
/* 60度回転移動の説明（座標 s を基準に t を回転させる場合）
/*
/* 1. 原点を基準に角度 θ だけ回転移動した座標 u は以下の通り。
/*    x = r * cos(φ + θ)
/*    y = r * sin(φ + θ)
/*    （r は原点からの距離、φ は元の角度）
/*
/* 2. 座標 s と t の差ベクトルを考えると、
/*    ベクトル = (t_x - s_x, t_y - s_y)
/*
/* 3. この差ベクトルを角度 θ だけ回転させると、
/*    x' = cosθ * (t_x - s_x) - sinθ * (t_y - s_y)
/*    y' = sinθ * (t_x - s_x) + cosθ * (t_y - s_y)
/*
/* 4. 最後に回転したベクトルを元の基準点 s に平行移動して、
/*    回転後の座標は
/*    X = x' + s_x
/*    Y = y' + s_y
/*/
const rotate60Degrees = (t: number[], s: number[]): number[] => {
    const theta = (Math.PI / 3); // 60度 = π/3ラジアン
  
    const rotatedX = (t[0] - s[0]) * Math.cos(theta) - (t[1] - s[1]) * Math.sin(theta) + s[0];
    const rotatedY = (t[0] - s[0]) * Math.sin(theta) + (t[1] - s[1]) * Math.cos(theta) + s[1];

    return [rotatedX,rotatedY]
};



main();