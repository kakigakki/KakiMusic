import axios from "axios";
import { qqMusicConfigParam, ERR_OK } from "./config";
import { getUid } from "common/js/uid.js";


const debug = process.env.NODE_ENV !== "production";

//获取歌曲的歌词
export function getLyric(mid) {
    const url = debug ? '/api/lyric' : 'http://106.55.149.238/kakiMusic/api/lyric'

    const data = Object.assign({}, qqMusicConfigParam, {
        songmid: mid,
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0,
        categoryId: 10000000,
        pcachetime: +new Date(),
        format: 'json'
    })

    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}


//批量获取歌曲的播放url
export function getPurlUrl(songs) {
    const url = debug ?
        "/api/getPurlUrl" :
        "http://106.55.149.238/kakiMusic/api/getPurlUrl";
    let mids = [];
    let types = [];

    songs.forEach(song => {
        mids.push(song.mid);
        types.push(0);
    });

    //接口所需要的关键参数
    const urlMid = genUrlMid(mids, types);
    const data = Object.assign({}, {
        g_tk: 1928093487,
        inCharset: "utf-8",
        outCharset: "utf-8",
        notice: 0,
        g_tk: 5381,
        format: "json",
        platform: "h5",
        needNewCode: 1,
        uin: 0
    });

    return new Promise((resolve, reject) => {
        let tryTime = 3;

        function request() {
            return axios
                .post(url, {
                    comm: data,
                    req_0: urlMid
                })
                .then(response => {
                    const res = response.data;
                    if (res.code === ERR_OK) {
                        let urlMid = res.req_0;
                        if (urlMid && urlMid.code === ERR_OK) {
                            const purlMap = {};
                            urlMid.data.midurlinfo.forEach(item => {
                                if (item.purl) {
                                    purlMap[item.songmid] = item.purl;
                                }
                            });
                            if (Object.keys(purlMap).length > 0) {
                                resolve(purlMap);
                            } else {
                                retry();
                            }
                        } else {
                            retry();
                        }
                    } else {
                        retry();
                    }
                });
        }

        function retry() {
            if (--tryTime >= 0) {
                request();
            } else {
                reject(new Error("Can not get the songs url"));
            }
        }

        request();
    });
}


//获取该接口所需要的关键参数
function genUrlMid(mids, types) {
    const guid = getUid();
    return {
        module: "vkey.GetVkeyServer",
        method: "CgiGetVkey",
        param: {
            guid,
            songmid: mids,
            songtype: types,
            uin: "0",
            loginflag: 0,
            platform: "23"
        }
    };
}