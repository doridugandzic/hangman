import { useState } from "react";
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { startSetName } from "../stuff/actions";
import { AppState } from "../stuff/store";

interface ILoginProps {
    closeModal: (modalId: string) => void;
    startSetName: (userName: string) => void;
    storeData?: any
}

function Login(props: ILoginProps) {
    const [userName, setName] = useState("");

    return (
        <div style={{ height: "15vh", width: "25vw", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <button onClick={() => props.closeModal('login')} style={{ position: "absolute", top: "25px", right: "25px", cursor: "pointer" }}>×</button>
            <input value={userName ? userName : props.storeData.actions.userName} onChange={(e) => setName(e.target.value)} style={{ margin: "50px 0", maxWidth: "50%" }}></input>
            <button onClick={() => props.startSetName(userName)} style={{ cursor: "pointer", maxWidth: "50%" }}>Save ya name bruh</button>
        </div>
    );
}

const MapStateToProps = (store: AppState) => {
    return {
        storeData: store
    };
};


const MapDispatchToProps = (dispatch: Dispatch) => {
    return {
        startSetName: (userName: string) => dispatch(startSetName(userName))
    }
};

export default connect(
    MapStateToProps,
    MapDispatchToProps
)(Login);
