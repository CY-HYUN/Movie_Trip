import { getPrismaClient } from "@/utils/util";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// export async function GET(request: NextRequest) {
//   const { prisma } = getPrismaClient();
//   const email = request.nextUrl.searchParams.get("email");
//   console.log(email);

//   try {
//     if (email) {
//       const user = await prisma.user.findUnique({
//         where: {
//           email: email as string,
//         },
//       });
//       return user
//         ? NextResponse.json({ data: user.userId, status: 200 })
//         : NextResponse.json({
//             message: "아이디 찾기를 실패했습니다.",
//             status: 404,
//           });
//     }

//     return NextResponse.json({
//       message: "아이디 찾기를 실패했습니다.",
//       status: 404,
//     });
//   } catch (error) {
//     console.error(error);
//     NextResponse.json({ message: "Internal server error" });
//   }
// }
export async function GET(request: NextRequest) {
  const { prisma } = getPrismaClient();
  const email = request.nextUrl.searchParams.get("email");
  console.log(email);

  try {
    if (email) {
      const user = await prisma.user.findUnique({
        where: {
          email: email as string,
        },
      });

      if (user) {
        // 이메일 전송
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "a01057579174@gmail.com", // 보내는 이메일 주소
            pass: "uboi mpuf cnip tmjs", // 이메일 비밀번호
          },
        });

        const mailOptions = {
          from: "a01057579174@gmail.com", // 보내는 이메일 주소
          to: email, // 수신자 이메일 주소
          subject: "아이디 찾기 결과",
          text: `귀하의 아이디는 ${user.userId}입니다.\n비밀번호는 ${user.password}`,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ data: user.userId, status: 200 });
      } else {
        return NextResponse.json({
          message: "아이디 찾기를 실패했습니다.",
          status: 404,
        });
      }
    }

    return NextResponse.json({
      message: "아이디 찾기를 실패했습니다.",
      status: 404,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error", status: 500 });
  }
}
