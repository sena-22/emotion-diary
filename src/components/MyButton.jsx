const MyButton = ({type,text,onClick})=>{


    //이상한 타입이면 강제로 디폴트 타입으로 변경
    const btnType = ['positive', 'negative'].includes(type) ? type : 'default';

    return  (
    <button className={["MyButton", `MyButton_${btnType}`].join(" ")} onClick={onClick}>
        {text}
    </button>
    )
}

MyButton.defaultProps = {
    type: "default",
}

export default MyButton;