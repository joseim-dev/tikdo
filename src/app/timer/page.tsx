"use client";

import React, { useEffect, useRef } from "react";
import { IoPlay, IoPause, IoHome } from "react-icons/io5";
import SubToDoItem from "@/components/SubToDoItem";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/navigation";
import { useTimer } from "@/context/TimerContext";

export default function TimerPage() {
  const router = useRouter();
  const isInitialized = useRef(false);
  const shouldRedirect = useRef(false);
  const {
    hours,
    minutes,
    todos,
    isRunning,
    elapsedTime,
    setElapsedTime,
    startTimer,
    pauseTimer,
    finishTimer,
    toggleCompleteTodo,
    deleteTodo,
  } = useTimer();

  // 초기 타이머 시간 설정 + 자동 시작
  useEffect(() => {
    const totalSeconds = hours * 3600 + minutes * 60;

    if (totalSeconds === 0) {
      router.push("/");
      return;
    }

    if (!isInitialized.current) {
      setElapsedTime(totalSeconds);
      isInitialized.current = true;
      startTimer(); // ✅ 자동 시작
    }
  }, [hours, minutes, setElapsedTime, router, startTimer]);

  // 타이머 실행
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && elapsedTime > 0) {
      interval = setInterval(() => {
        setElapsedTime((prev: number) => {
          if (prev <= 1) {
            clearInterval(interval);
            finishTimer();
            shouldRedirect.current = true;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, elapsedTime, setElapsedTime, finishTimer]);

  // 타이머 종료 후 /finish로 이동
  useEffect(() => {
    if (elapsedTime === 0 && !isRunning && shouldRedirect.current) {
      router.push("/finish");
    }
  }, [elapsedTime, isRunning, router]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
  };

  const handleFinish = () => {
    finishTimer();
    shouldRedirect.current = true;
    router.push("/finish");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#312C48] text-white">
      {/* 홈 버튼 */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => router.push("/")}
          className="group transition hover:scale-105"
          aria-label="Go to Home"
        >
          <IoHome
            size={30}
            className="text-white group-hover:text-[#5e4ca2] transition-colors duration-200"
          />
        </button>
      </div>

      {/* 타이머 영역 */}
      <div className="w-full md:w-[70%] flex flex-col justify-center items-center min-h-[300px] md:min-h-screen border-b border-b-gray-700 md:border-b-0">
        <span className="font-fredoka font-medium text-[110px] sm:text-[140px] md:text-[160px] lg:text-[180px] xl:text-[230px] text-white text-center w-full">
          {formatTime(elapsedTime)}
        </span>
        <div className="mt-6 px-4 w-full md:hidden flex justify-center">
          <CustomButton
            variant="secondary"
            className="w-full max-w-sm"
            onClick={isRunning ? pauseTimer : startTimer}
          >
            {isRunning ? "Pause" : "Play"}
          </CustomButton>
        </div>
      </div>

      {/* 할 일 목록 영역 */}
      <div className="w-full md:w-[30%] h-screen overflow-y-auto bg-[#312C48] border-l border-[#ffffff1a]">
        <div className="px-4 py-6 min-h-full flex flex-col">
          <div className="flex-1">
            {/* 미완료 목록 */}
            <div className="mb-8">
              <h2 className="font-fredoka text-[30px] font-medium text-white border-b border-[#ffffff1a] pb-2 mb-4">
                Tik Do List
              </h2>
              <div className="space-y-3">
                {todos
                  .filter((todo) => !todo.isCompleted)
                  .map((todo) => (
                    <SubToDoItem
                      key={todo.id}
                      text={todo.text}
                      isCompleted={false}
                      onComplete={() =>
                        toggleCompleteTodo(todo.id, elapsedTime)
                      }
                      onDelete={() => deleteTodo(todo.id)}
                    />
                  ))}
              </div>
            </div>

            {/* 완료 목록 */}
            <div>
              <h2 className="font-fredoka text-[30px] font-medium text-white border-b border-[#ffffff1a] pb-2 mb-4">
                Done
              </h2>
              <div className="space-y-3">
                {todos
                  .filter((todo) => todo.isCompleted)
                  .map((todo) => (
                    <SubToDoItem
                      key={todo.id}
                      text={todo.text}
                      isCompleted={true}
                      completedAt={todo.completedAt}
                      onComplete={() =>
                        toggleCompleteTodo(todo.id, elapsedTime)
                      }
                      onDelete={() => deleteTodo(todo.id)}
                    />
                  ))}
              </div>
            </div>
          </div>

          {/* PC Finish 버튼 */}
          <div className="mt-6 hidden md:block">
            <CustomButton
              variant="secondary"
              className="w-full h-[50px]"
              onClick={handleFinish}
            >
              Finish
            </CustomButton>
          </div>
        </div>

        {/* 모바일 Finish 버튼 */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-40 md:hidden">
          <CustomButton
            variant="secondary"
            className="w-full h-[60px]"
            onClick={handleFinish}
          >
            Finish
          </CustomButton>
        </div>
      </div>

      {/* 데스크탑 하단 Play/Pause 버튼 */}
      <div className="hidden md:block fixed bottom-6 left-6 z-50">
        <button
          onClick={isRunning ? pauseTimer : startTimer}
          className="w-14 h-14 rounded-full bg-white text-[#312C48] shadow-lg flex items-center justify-center hover:scale-105 transition"
          aria-label={isRunning ? "Pause" : "Play"}
        >
          {isRunning ? <IoPause size={32} /> : <IoPlay size={32} />}
        </button>
      </div>
    </div>
  );
}
