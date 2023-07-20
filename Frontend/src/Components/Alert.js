import React, { useState } from 'react'

const Alert = (props) => {
    const [alert, setAlert] = useState(null);
    const showAlert = (message, type) => {
        setAlert({
            message: message,
            type: type,
        })

        setTimeout(() => {
            setAlert(null);
        }, 3000);
    };

    return (
        <div>
            {
                props.Alerting && <div >
                    <div className={`alert alert-${props.Alerting.type}`} role="alert" >
                        <div style={{ textAlign: "center" }}> <strong>{props.Alerting.message}</strong></div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Alert
