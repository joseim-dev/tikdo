"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
  completedAt?: number; // 경과 시간 (초)
}

interface TimerContextType {
  hours: number;
  minutes: number;
  todos: Todo[];
  startTime: Date | null;
  endTime: Date | null;
  isRunning: boolean;
  elapsedTime: number;
  setElapsedTime: (value: number | ((prev: number) => number)) => void;
  setHours: (hours: number) => void;
  setMinutes: (minutes: number) => void;
  addTodo: (text: string) => void;
  completeTodo: (id: string, elapsedTime: number) => void;
  toggleCompleteTodo: (id: string, elapsedTime: number) => void;
  deleteTodo: (id: string) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  finishTimer: () => void;
  resetTimer: () => void;
  initializeTodo: () => void;
  clearTimerStorage: () => void;
}

const TimerContext = createContext<TimerContextType | null>(null);

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const savedHours = localStorage.getItem("timer_hours");
    const savedMinutes = localStorage.getItem("timer_minutes");
    const savedTodos = localStorage.getItem("timer_todos");
    const savedStartTime = localStorage.getItem("timer_startTime");
    const savedEndTime = localStorage.getItem("timer_endTime");
    const savedElapsedTime = localStorage.getItem("timer_elapsedTime");
    const savedIsRunning = localStorage.getItem("timer_isRunning");

    if (savedHours) setHours(Number(savedHours));
    if (savedMinutes) setMinutes(Number(savedMinutes));
    if (savedTodos) setTodos(JSON.parse(savedTodos));
    if (savedStartTime) setStartTime(new Date(savedStartTime));
    if (savedEndTime) setEndTime(new Date(savedEndTime));
    if (savedElapsedTime) setElapsedTime(Number(savedElapsedTime));
    if (savedIsRunning) setIsRunning(savedIsRunning === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("timer_hours", hours.toString());
    localStorage.setItem("timer_minutes", minutes.toString());
    localStorage.setItem("timer_todos", JSON.stringify(todos));
    localStorage.setItem("timer_isRunning", isRunning.toString());
    if (startTime)
      localStorage.setItem("timer_startTime", startTime.toISOString());
    if (endTime) localStorage.setItem("timer_endTime", endTime.toISOString());
    localStorage.setItem("timer_elapsedTime", elapsedTime.toString());
  }, [hours, minutes, todos, startTime, endTime, elapsedTime, isRunning]);

  const addTodo = (text: string) => {
    setTodos([
      ...todos,
      { id: Date.now().toString(), text, isCompleted: false },
    ]);
  };

  const completeTodo = (id: string, currentElapsedTime: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, isCompleted: true, completedAt: currentElapsedTime }
          : todo
      )
    );
  };

  const toggleCompleteTodo = (id: string, currentElapsedTime: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              isCompleted: !todo.isCompleted,
              completedAt: !todo.isCompleted ? currentElapsedTime : undefined,
            }
          : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const initializeTodo = () => {
    setTodos([]);
  };

  const startTimer = () => {
    if (!startTime) setStartTime(new Date());
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const finishTimer = () => {
    setIsRunning(false);
    setEndTime(new Date());
  };

  const resetTimer = () => {
    setIsRunning(false);
    setStartTime(null);
    setEndTime(null);
    setElapsedTime(0);
    setHours(0);
    setMinutes(0);
  };

  const clearTimerStorage = () => {
    localStorage.removeItem("timer_hours");
    localStorage.removeItem("timer_minutes");
    localStorage.removeItem("timer_todos");
    localStorage.removeItem("timer_startTime");
    localStorage.removeItem("timer_endTime");
    localStorage.removeItem("timer_elapsedTime");
    localStorage.removeItem("timer_isRunning");
  };

  const value = {
    hours,
    minutes,
    todos,
    startTime,
    endTime,
    isRunning,
    elapsedTime,
    setElapsedTime,
    setHours,
    setMinutes,
    addTodo,
    completeTodo,
    toggleCompleteTodo,
    deleteTodo,
    startTimer,
    pauseTimer,
    finishTimer,
    resetTimer,
    initializeTodo,
    clearTimerStorage,
  };

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error("useTimer must be used within a TimerProvider");
  }
  return context;
}
