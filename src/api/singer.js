import { qqMusicConfigParam } from "./config";
import axios from "axios";

const debug = process.env.NODE_ENV !== "production";
export function getSingerList() {
    const url = debug ?
        "/api/getSingerList" :
        "http://106.55.149.238/kakiMusic/api/getSingerList";
    const data = Object.assign({}, qqMusicConfigParam, {
        channel: "singer",
        page: "list",
        key: "all_all_all",
        pagesize: 100,
        pagenum: 1,
        hostUin: 0,
        needNewCode: 0,
        platform: "yqq"
    });
    return axios
        .get(url, {
            params: data
        })
        .then(res => {
            return res.data;
        });
}

export function getSingerSongList(singerId) {
    const url = debug ?
        "/api/getSingerSongList" :
        "http://106.55.149.238/kakiMusic/api/getSingerSongList";

    const data = Object.assign({}, qqMusicConfigParam, {
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
        order: 'listen',
        begin: 0,
        num: 80,
        songstatus: 1,
        singermid: singerId
    });

    return axios
        .get(url, {
            params: data
        })
        .then(res => {
            return res.data;
        });
}