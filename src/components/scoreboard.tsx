import { Dispatch } from "Redux";
import { connect } from "react-redux";
import { AppState } from "../stuff/store";
import { useState } from "react";
import { getScores } from "../apiRequests/services";
import { IScoreBody } from "../model/model.gametypes";
import { calcScores } from "../App";

interface IScoreboardProps {
    storeData: any;
    closeModal: (modalId: string) => void;
}


function Scoreboard(props: IScoreboardProps) {
    const [scores, setScores] = useState([] as IScoreBody[]);


    async function getScoreBoard() {


        let scoreboard = await getScores();

        for (let i = 0; i < scoreboard.length; i++) {
            scoreboard[i].score = calcScores((scoreboard[i].duration / 100), scoreboard[i].length, scoreboard[i].uniqueCharacters, scoreboard[i].errors);
            console.log(scoreboard[i].score)
        }
        //await scoreboard.sort((a: { score: number; }, b: { score: number; }) => (a.score > b.score) ? 1 : ((b.score > a.score) ? -1 : 0)).reverse()

        await scoreboard.sort(function (a: any, b: any) {
            switch (true) {
                case (a.errors !== b.errors):
                    return a.errors > b.errors ? 1 : -1;
                case (a.uniqueCharacters !== b.uniqueCharacters):
                    return a.uniqueCharacters > b.uniqueCharacters ? 1 : -1;
                case (a.length !== b.length):
                    return a.length > b.length ? 1 : -1;
                case (a.duration !== b.duration):
                    return a.duration > b.duration ? 1 : -1;
            }
        })

        await setScores(scoreboard);
    }

    function renderScores() {
        const items = (scores).map((user, index) => <li key={index}>{user.userName}</li>)

        if (scores.length > 0) {
            return items
        }

    }

    return (
        <div style={{ width: "25vw", height: "auto", display: "flex", flexDirection: "column", bottom: "10px", minHeight: " 10vh" }}>
            <button disabled={props.storeData.actions.userName === ""} onClick={() => props.closeModal('score')} style={{ position: "absolute", top: "25px", right: "25px", cursor: "pointer" }}>×</button>
            <button style={{ width: "50%", justifyContent: "center", alignSelf: "center" }} onClick={() => getScoreBoard()}> GET SCORES DOOD</button>
            <ul>
                {renderScores()}
            </ul>
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

    }
};

export default connect(
    MapStateToProps,
    MapDispatchToProps
)(Scoreboard);
