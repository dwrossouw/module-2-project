
function GenreCard({name, Icon, onClick, isSelected}) {
  return (
    <button type="button" onClick={onClick} className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl cursor-pointer hover:bg-[#C7D5E0] transition-colors ${isSelected ? "bg-[#1D3151] text-white" :"bg-[#A9BBCB] text-[#1D3151]"}`}>
            <Icon />
            <span>{name}</span>
          </button>
  )
}

export default GenreCard