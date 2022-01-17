import { IName, IScoreBody } from "../model/model.gametypes";

export const SET_NAME = "SET_NAME";
export const SAVE_TO_SCOREBOARD = "SAVE_TO_SCOREBOARD"

export interface SetNameAction {
    type: typeof SET_NAME
    payload: string
}


export interface SaveToScoreboardAction {
    type: typeof SAVE_TO_SCOREBOARD
    payload: IScoreBody

}

export function startSetName(name: string): SetNameAction {
    return {
        type: SET_NAME,
        payload: name
    }
};


export function startSaveToScoreboard(score: IScoreBody): SaveToScoreboardAction {
    return {
        type: SAVE_TO_SCOREBOARD,
        payload: score
    }
};

export type ActionTypes = SetNameAction | SaveToScoreboardAction;

export type AppActions = ActionTypes;