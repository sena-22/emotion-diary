import React from "react"

type Props = {
  emotion_id: number
  emotion_img: string
  emotion_descript: string
  onClick: (emotion_id: number) => void
  isSelected: boolean
}

type EmotionType = {
  [key: number]: string
}

const Emotion: EmotionType = {
  1: "bg-[#64c964] text-white",
  2: "bg-[#9dd772] text-white",
  3: "bg-[#fdce17] text-white",
  4: "bg-[#fd8446] text-white",
  5: "bg-[#fd565f] text-white",
}

const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick,
  isSelected,
}: Props) => {
  return (
    <div
      onClick={() => onClick(emotion_id)}
      className={[
        "cursor-pointer, rounded pt-5 pb-5 flex flex-col justify-center items-center",
        isSelected ? Emotion[emotion_id] : `bg-[#ececec]`,
      ].join(" ")}
    >
      <img src={emotion_img} alt="emotion" className="w-2/4 mb-2.5" />
      <span className="text-lg">{emotion_descript}</span>
    </div>
  )
}

export default React.memo(EmotionItem)
