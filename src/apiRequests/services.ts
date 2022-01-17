import { AxiosResponse } from 'axios';
import { IRandomQuote, IScoreBody } from '../model/model.gametypes';

const axios = require('axios')


export function getRandomQuote() {
    return axios.get('https://api.quotable.io/random')
        .then(function (response: AxiosResponse<IRandomQuote>) {
            console.log(response.data)
            return response.data
        }).catch(function (error: any) {
            console.log("err:", error);
        })
}

export function getScores() {
    return axios.get('https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores')
        .then(function (response: AxiosResponse<(IScoreBody[])>) {
            return response.data;
        }).catch(function (error: any) {
            console.log("err:", error)
        })
}

export function postScore(scoreBody: IScoreBody) {
    axios.post('https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores', scoreBody, {
        headers: {
            'Content-Type': 'application/ json'
        }
    }).then(function (response: any) {
        console.log(response)
    }).catch(function (error: any) {
        console.log("err:", error)
    })
}