"use client";

import { useState } from "react";
import CustomButton from "@/components/CustomButton";
import Header from "@/components/Header";
import ToDoItem from "@/components/TodoItem";
import { IoAdd } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useTimer } from "@/context/TimerContext";

export default function Home() {
  const [todoText, setTodoText] = useState("");
  const router = useRouter();
  const {
    hours,
    minutes,
    todos,
    setHours,
    setMinutes,
    addTodo,
    deleteTodo,
    resetTimer,
  } = useTimer();

  const handleAddTodo = () => {
    if (todoText.trim()) {
      addTodo(todoText.trim());
      setTodoText("");
    }
  };

  const handleStartTimer = () => {
    if (hours === 0 && minutes === 0) {
      alert("Please set a time");
      return;
    }
    if (todos.length === 0) {
      alert("Add a To Do list");
      return;
    }
    // resetTimer();
    router.push("/timer");
  };

  return (
    <div className="bg-[#f2e1d5] min-h-screen">
      <Header />
      <div className="items-center justify-items-center min-h-screen font-fredoka pb-[80px]">
        <div className="w-full max-w-md flex-col items-start pt-10 mx-auto">
          <h1 className="text-[40px] text-[#312C48] font-medium w-full text-center mb-5">
            How long will you work?
          </h1>

          {/* 시간 입력 */}
          <div className="w-full h-[300px] bg-[#312C48] rounded-2xl flex justify-center items-center flex-col py-4 px-8">
            <div className="flex gap-4 text-[#F9F5F2] items-center justify-center w-full">
              <div className="flex flex-col items-center w-[48%]">
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-[150px] text-[120px] text-center bg-transparent focus:outline-none appearance-none h-fit"
                />
              </div>
              <span className="text-[80px] w-[4%]">:</span>
              <div className="flex flex-col items-center w-[48%]">
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={minutes}
                  onChange={(e) => setMinutes(Number(e.target.value))}
                  className="w-[150px] text-[120px] text-center bg-transparent focus:outline-none appearance-none"
                />
              </div>
            </div>
            <div className="w-full flex justify-between">
              <h3 className="w-[48%] text-[20px] text-center text-[#F9F5F2]">
                hour
              </h3>
              <h3 className="text-[20px] w-[48%] text-center text-[#F9F5F2]">
                minute
              </h3>
            </div>
          </div>

          {/* 입력창 + 플러스 버튼 */}
          <div className="flex w-full items-center gap-2 mt-[40px]">
            <input
              type="text"
              placeholder="Enter a To Do"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddTodo();
                }
              }}
              className="flex-1 px-4 py-2 border-0 border-b-2 border-[#312C48] bg-transparent focus:outline-none focus:border-[#312C48] text-black"
            />
            <button
              onClick={handleAddTodo}
              className="w-10 h-10 flex items-center justify-center text-[#312C48] rounded-2xl hover:bg-[#312C48] hover:text-white transition font-medium text-[25px] leading-none text-center"
              aria-label="Add todo"
            >
              <IoAdd size={24} />
            </button>
          </div>

          <div className="mt-[20px] flex flex-col space-y-2">
            {todos.map((todo) => (
              <ToDoItem
                key={todo.id}
                text={todo.text}
                onDelete={() => deleteTodo(todo.id)}
              />
            ))}
          </div>

          {/* 고정 버튼 */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
            <CustomButton
              variant="primary"
              className="w-full h-[50px]"
              onClick={handleStartTimer}
            >
              Tik Do!
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}
