import {
  IoRemoveCircleOutline,
  IoCheckbox,
  IoSquareOutline,
} from "react-icons/io5";

interface ToDoItemProps {
  text: string;
  isCompleted?: boolean;
  completedAt?: number; // 경과된 시간 (초 단위)
  onComplete?: () => void;
  onDelete?: () => void;
}

export default function SubToDoItem({
  text,
  isCompleted = false,
  completedAt,
  onComplete,
  onDelete,
}: ToDoItemProps) {
  // 초 → 시:분:초로 변환
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="w-full h-[70px] min-h-[70px] max-h-[70px] px-3 py-2 flex items-center justify-between border-[#8173c1] border-l-10 border-3 rounded-xl text-black bg-white overflow-hidden">
      <div className="flex items-center gap-2 truncate">
        {/* 체크/해제 버튼 */}
        <button
          onClick={onComplete}
          className="text-[#8173c1] hover:text-[#5e4ca2] transition"
          aria-label="Toggle check"
        >
          {isCompleted ? (
            <IoCheckbox size={22} />
          ) : (
            <IoSquareOutline size={22} />
          )}
        </button>

        {/* 텍스트 및 완료 시간 */}
        <div className="flex flex-col">
          <span className={isCompleted ? "line-through text-gray-400" : ""}>
            {text}
          </span>
          {isCompleted && completedAt !== undefined && (
            <span className="text-sm text-gray-500">
              Completed in {formatTime(completedAt)}
            </span>
          )}
        </div>
      </div>

      {/* 삭제 버튼 (필요 시 주석 해제) */}
      {/* <button
        onClick={onDelete}
        className="text-red-600 hover:text-red-800 transition"
        aria-label="Remove todo"
      >
        <IoRemoveCircleOutline size={24} />
      </button> */}
    </div>
  );
}
