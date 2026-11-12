function ButtonFilterCard({ name, isSelected, onClick }) {
  return (
    <button
      type="button"
      name={name} onClick={onClick}
      className={`${isSelected ? "bg-[#1D3151] text-[#EAC77B] rounded-full px-4 py-2 text-sm font-medium" : "bg-[#E9DFD1] text-[#1D3151] border border-[#D7C6AC] rounded-full px-4 py-2 text-sm font-medium hover:bg-[#D7C6AC] transition-colors cursor-pointer"}`}
    >
      {name}
    </button>
  );
}

export default ButtonFilterCard;
