import React from "react"

type Props = {
  emotion_id: number
  emotion_img: string
  emotion_descript: string
  onClick: (emotion_id: number) => void
  isSelected: boolean
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
        "EmoitonItem",
        isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`,
      ].join(" ")}
    >
      <img src={emotion_img} alt="emotion" />
      <span>{emotion_descript}</span>
    </div>
  )
}

export default React.memo(EmotionItem)
