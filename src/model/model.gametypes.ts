export interface IRandomQuote {
        content: any,
        author: string,
        length: number,
        _id: string
}

export interface IScoreBody {
        score?: number;
        quoteId: string,
        length: number,
        uniqueCharacters: number,
        userName: string,
        errors: number,
        duration: number
}

export interface IName {
        userName?: string;
}

export interface IStoreData {
        store: [
                userName: IName,
                scoreBody: IScoreBody,
                scores: IScoreBody[]
        ]
}