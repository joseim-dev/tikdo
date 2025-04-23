import { IoRemoveCircleOutline } from "react-icons/io5";

interface ToDoItemProps {
  text: string;
  onDelete: () => void;
}

export default function ToDoItem({ text, onDelete }: ToDoItemProps) {
  return (
    <div className="w-full h-[70px] px-3 py-2 flex items-center justify-between border-[#312C48] border-l-10 border-2 rounded-xl text-black bg-[#f2e1d5]">
      <div className="truncate">{text}</div>
      <button
        onClick={onDelete}
        className="text-red-600 hover:text-red-800 transition"
        aria-label="Remove todo"
      >
        <IoRemoveCircleOutline size={28} />
      </button>
    </div>
  );
}
