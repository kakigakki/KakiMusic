import Vue from "vue";
import VueRouter from "vue-router";
import Recommand from "../views/recommand/Recommand.vue";
import Rank from "../views/rank/Rank.vue";
import Search from "../views/search/Search.vue";
import Singer from "../views/singer/Singer.vue";
import SingerDetail from "../views/singer/subView/singerDetail.vue";
import Disc from "../views/recommand/subView/Disc.vue";
import RankList from "../views/rank/subView/RankList.vue"

Vue.use(VueRouter);

const routes = [{
        path: "/",
        redirect: "/recommend"
    },
    {
        path: "/recommend",
        name: "Recommend",
        component: Recommand,
        children: [{
            path: ":id",
            component: Disc
        }]
    },
    {
        path: "/rank",
        name: "Rank",
        component: Rank,
        children: [{
            path: ":id",
            component: RankList
        }]
    },
    {
        path: "/search",
        name: "Search",
        component: Search,
        children: [{
            path: ":id",
            component: SingerDetail
        }]
    },
    {
        path: "/singer",
        name: "Singer",
        component: Singer,
        children: [{
            path: ":id",
            component: SingerDetail
        }]
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;