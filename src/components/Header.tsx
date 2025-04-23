import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center px-6 py-4 shadow-md bg-[#f2e1d5]">
      {/* 왼쪽: 로고 */}
      <Link href="/" className="text-xl font-bold text-blue-600">
        <Image src="/icon.png" width={90} alt="logo" height={45} />
      </Link>

      {/* 오른쪽: 버튼 */}
      <button className="bg-[#312C48] text-white px-4 py-2 rounded border-2 border-transparent hover:bg-[#F7F4F1] hover:border-[#312C48] hover:text-[#312C48] transition font-fredoka font-medium">
        Tutorial
      </button>
    </header>
  );
}
