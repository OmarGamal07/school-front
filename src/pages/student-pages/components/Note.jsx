import user from "../../../assets/user.webp"

const Note = ({note}) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <img className="object-cover block w-[35px] h-[35px] rounded-full" src={user} alt="profile"/>
      </div>
      <div className="w-full outline-none block bg-gray-200 rounded-xl p-2 relative">
        <span className="font-semibold">{note.studentId.firstName}</span>
        <p className="text-sm mt-2">
          {note.note}
        </p>
      </div>
    </div>
  )
}

export default Note