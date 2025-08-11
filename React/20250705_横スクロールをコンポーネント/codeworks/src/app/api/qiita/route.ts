import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const token = process.env.QIITA_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "No token set" }, { status: 500 });
  }

  try {
    const res = await axios.get(
      'https://qiita.com/api/v2/authenticated_user/items?per_page=10',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return NextResponse.json(res.data);
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
