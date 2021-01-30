
import { useToasts } from "react-toast-notifications";
import React, { useEffect } from "react";
import { connect, useDispatch } from 'react-redux';

function ToastMessage(props) {
    const { addToast } = useToasts();

    useEffect(() => {
        console.log('Toast ', props.toast, props.toast.toast.message);
        if (props.toast.toast.isShow) {
            // addToast("Could not find resume toast", {
            //     appearance: "warning",
            //     autoDismiss: true,
            // })
            addToast(props.toast.toast.message, {
                appearance: props.toast.toast.type,
                autoDismiss: true,
            })
        }
    }, [props.toast]);

    return (
        <div></div>
    );
}

function mapStateToProps(state) {
    return {
        toast: state.toastReducer
    }
}

// export default CandidateList;
export default connect(mapStateToProps)(ToastMessage);
