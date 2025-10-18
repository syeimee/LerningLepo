// demo_app/app/api/google-sheets/sample/route.ts
import { NextRequest, NextResponse } from 'next/server'

const GAS_URL =
    'https://script.google.com/macros/s/AKfycbyjuyf2G1iOjonene5Vm6sLHVIFe_S-N934-07pKh8vN8vUV58V4M7oKdjKqjFWnYKR/exec'
export async function POST(req: NextRequest) {
    try {
        const body = await req.json() // Reactから送られてきたJSONを取得

        // Google Apps Script に転送
        const response = await fetch(GAS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain', // GAS側がtext/plainで受け取る場合
            },
            body: JSON.stringify(body),
        })

        // GASからのレスポンスをJSONとして取得
        const data = await response.json()

        return NextResponse.json(data)
    } catch (err) {
        console.error(err)
        return NextResponse.json(
            { error: 'Failed to send to Google Sheets' },
            { status: 500 }
        )
    }
}

// OPTIONS（CORS用）も必要なら追加
export async function OPTIONS() {
    return NextResponse.json(
        {},
        {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        }
    )
}
