// GET http://localhost:3000/api
// export async function GET(request: Request) {
//   return Response.json({ hello: "world" });
// }

import { NextRequest, NextResponse } from "next/server";

// 외부 api 호출
// export async function GET(request: Request) {
//   const res = await fetch(
//     "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?ServiceKey=wuW9xR1SRT8ETx%2BJEfP%2BCBTSTJTuRG%2FDMDRoqgYVzVT%2FlxBMvOM4TcOqO%2FYbLKbZVl2ZLK34V8jY0D4RW7fuTw%3D%3D&pageNo=1&   numOfRows=10&dataType=JSON&base_date=20240724&base_time=0600&nx=55&ny=127"
//   );
//   const data = await res.json();
//   return Response.json({ data });
// }

// export async function GET(request: Request) {
//   console.log("get posts");
//   console.log(request.ip); // request객체를 사용하면 캐시가 동작하지 않음(바뀌는 데이터 사용)
//   const res = await fetch("http://172.31.98.210/posts?type=info", {
//     next: {
//       revalidate: 10,
//     },
//   });
//   const data = await res.json();
//   return Response.json({ data });
// }

export async function GET(request: NextRequest) {
  console.log("get posts");
  console.log(request.ip, request.cookies, request.nextUrl.searchParams);
  const res = await fetch("http://172.31.98.210/posts?type=info");
  const data = await res.json();
  return NextResponse.json({ data });
}
