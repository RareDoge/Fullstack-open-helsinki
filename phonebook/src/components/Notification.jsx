
const Notification = ({message, msgType}) => {

    const addedMsgStyle = {
        color: 'green',
        background: 'lightgray',
        fontSize: 30,
        padding:5,
        borderRadius: 5,
        border: '3px solid green',
        marginBottom: 15
    }
    const errorMsg = {
        color: 'red',
        background: 'lightgray',
        fontSize: 30,
        padding:5,
        borderRadius: 5,
        border: '3px solid red',
        marginBottom: 15
    }

    if(message === null){
        return null
    }
    else if(msgType === 'success'){
    return(
        <div style={addedMsgStyle}>
            {message}
        </div>
    )
    }
    else if(msgType === 'error'){
        return(
            <div style={errorMsg}>
                {message}
            </div>
        )
    }
}
export default Notification