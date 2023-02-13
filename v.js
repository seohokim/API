const axios = require('axios');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./custom-tine-377517-bf470de263b8.json');
const express = require('express');
const fs = require('fs');

const router = express.Router();


const doc = new GoogleSpreadsheet("1l1DIoRJmKOeqUFPC4kdSXwDik1hVDAM5yilkN4LqUTo");
const YOUTUBE_API_KEY = 'AIzaSyAElt4WvF2lfO7IyH3AfpoawEDLkwCgu5w';


async function connectWithSheet() {
    let string = new Array();
    try{
        await doc.useServiceAccountAuth(creds);
        await doc.loadInfo();
        console.log(doc.title, '연결 완료!');
        const sheet = doc.sheetsByIndex[0];

        const rows = await sheet.getRows();
        console.log(stringfy(rows));
    } catch(error) {
        console.error(error);
    }
}
connectWithSheet();


function stringfy(rows) {
    let string = new Array();
    string += '이름, 채널 id, 구독자 수, 평균 조회 수, 평균 좋아요, 평균 댓글 수\n';
    for(let el in rows) {
        console.log(el.name);
        for(let rawData in el._rawData){
            console.log(rawData);
            string += `${rawData} `; 
        }
        string += '\n';
    }
    return string;
}
