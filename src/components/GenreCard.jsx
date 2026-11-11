
function GenreCard({name, Icon, onClick, isSelected}) {
  return (
    <button type="button" onClick={onClick} className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl cursor-pointer hover:bg-[#DDD0EB] transition-colors ${isSelected ? "bg-[#70538C] text-white" :"bg-[#EDE5F5] text-[#70538C]"}`}>
            <Icon />
            <span>{name}</span>
          </button>
  )
}

export default GenreCard