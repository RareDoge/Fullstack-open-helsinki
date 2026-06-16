
const Notification = ({message}) => {

    const addedMsgStyle = {
        color: 'green',
        background: 'lightgray',
        fontSize: 40,
        padding:5,
        borderRadius: 5,
        border: '3px solid green',
        marginBottom: 15
    }
    if(message === null){
        return null
    }
    else{
    return(
        <div style={addedMsgStyle}>
            {message}
        </div>
    )
}
}
export default Notification