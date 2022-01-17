import { IScoreBody, IName } from '../model/model.gametypes'
import {
    ActionTypes,
    SET_NAME, SAVE_TO_SCOREBOARD
} from './actions';

interface IDefaultStateData {
    userName: string;
    scores: IScoreBody[];
    user: IScoreBody
}

export const actionsReducerDefaultState: IDefaultStateData = {
    userName: "",
    scores: [],
    user: {
        quoteId: "",
        length: 0,
        uniqueCharacters: 0,
        userName: "",
        errors: 0,
        duration: 0,
        score: 0
    }
}

const actionsReducer = (state = actionsReducerDefaultState, action: ActionTypes): IDefaultStateData => {
    switch (action.type) {
        case SET_NAME:
            return { ...state, userName: action.payload };
        case SAVE_TO_SCOREBOARD:
            return { ...state, user: action.payload };
        default:
            return state;
    }
}

export { actionsReducer };