import FindIdContainer from "@/components/FindIdContainer";
import LoginContainer from "@/components/LoginContainer";
import { RecoilRoot } from "recoil";

export default function Home() {
  return (
    <main className="w-full h-full bg-login-background bg-cover bg-center  flex flex-col justify-center items-center">
      <h1 className="font-[700] text-[64px] text-[#7d99a7] mb-20">무비 트립</h1>
      <LoginContainer />
      {/* <FindIdContainer /> */}
    </main>
  );
}
