"use client";

import { VT323 } from "next/font/google";
import { useTimer } from "@/context/TimerContext";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/CustomButton";
import { initialize } from "next/dist/server/lib/render-server";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
});

export default function FinishPage() {
  const router = useRouter();
  const {
    todos,
    hours,
    minutes,
    startTime,
    endTime,
    elapsedTime,
    resetTimer,
    clearTimerStorage,
    initializeTodo,
  } = useTimer(); // ✅ resetTimer 추가

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const completedTodos = todos.filter((todo) => todo.isCompleted);

  return (
    <div className="min-h-screen bg-[#f2e1d5] py-10 px-4">
      <div
        className={`${vt323.className} max-w-md mx-auto bg-[#D4D1CB] border-2 border-dashed border-[#312C48] rounded-sm p-8 text-black`}
      >
        {/* 영수증 헤더 */}
        <div className="text-center border-b-2 border-dashed border-[#312C48] pb-4">
          <h1 className="text-4xl mb-2">TIK DO RECEIPT</h1>
          <p className="text-sm">--------------------------------</p>
          <p className="text-sm">{startTime && formatDate(startTime)}</p>
          <p className="text-sm">--------------------------------</p>
        </div>

        {/* 세션 정보 */}
        <div className="mt-6 border-b-2 border-dashed border-[#312C48] pb-4">
          <h2 className="text-xl mb-2">SESSION INFO</h2>
          <div className="space-y-1 text-md">
            <div className="flex justify-between">
              <span>START TIME:</span>
              <span>{startTime && formatDate(startTime)}</span>
            </div>
            <div className="flex justify-between">
              <span>END TIME:</span>
              <span>{endTime && formatDate(endTime)}</span>
            </div>
            <div className="flex justify-between">
              <span>TOTAL TIME:</span>
              <span>{formatTime(hours * 3600 + minutes * 60)}</span>
            </div>
            <div className="flex justify-between">
              <span>TIME USED:</span>
              <span>
                {formatTime(hours * 3600 + minutes * 60 - elapsedTime)}
              </span>
            </div>
          </div>
        </div>

        {/* 통계 정보 */}
        <div className="mt-4 border-b-2 border-dashed border-[#312C48] pb-4">
          <h2 className="text-xl mb-2">TASK SUMMARY</h2>
          <div className="space-y-1 text-md">
            <div className="flex justify-between">
              <span>COMPLETED:</span>
              <span>{completedTodos.length}</span>
            </div>
            <div className="flex justify-between">
              <span>TOTAL:</span>
              <span>{todos.length}</span>
            </div>
            <div className="flex justify-between">
              <span>SUCCESS RATE:</span>
              <span>
                {Math.round((completedTodos.length / todos.length) * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* 완료된 작업 목록 */}
        <div className="mt-4 border-b-2 border-dashed border-[#312C48] pb-4">
          <h2 className="text-xl mb-2">COMPLETED ITEMS</h2>
          <p className="text-sm">--------------------------------</p>
          <div className="space-y-2 mt-2">
            {completedTodos.map((todo) => (
              <div key={todo.id} className="text-md flex justify-between">
                <span>- {todo.text}</span>
                <span>{todo.completedAt && formatTime(todo.completedAt)}</span>
              </div>
            ))}
          </div>
          <p className="text-sm mt-2">--------------------------------</p>
        </div>

        {/* 푸터 */}
        <div className="mt-4 text-center">
          <p className="text-sm">*** KEEP GRINDING. TRUST THE PROCESS ***</p>
          <p className="text-sm">================================</p>
          <CustomButton
            variant="primary"
            className="w-full mt-4"
            onClick={() => {
              resetTimer();
              clearTimerStorage();
              initializeTodo();
              router.push("/");
              window.open(
                "https://www.profitableratecpm.com/vhfhpcgctp?key=ba19d665601588c24ff335f5cab9b795",
                "_blank"
              );
            }}
          >
            Start New Session
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
