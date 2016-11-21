import { mapGetters } from 'vuex'
import ls from 'store2'
import indexPost from '../components/index-post'
import { ua, ssp } from '../utils'
const fetchInitialData = async (store, config = { page: 1}) => {
    const {params: {id, qs}, path} = store.state.route
    const base = {
        ...config,
        markdown: 1,
        limit: 10,
        id,
        qs
    }
    await store.dispatch('getTopics', base)
    if (config.page === 1) ssp(path)
}
export default {
    components: {
        indexPost
    },
    computed: {
        ...mapGetters({
            topics: 'getTopics'
        }),
        isPC() {
            return ua() === "PC"
        }
    },
    methods: {
        loadMore(page) {
            fetchInitialData(this.$store, {page})
        }
    },
    mounted() {
        if (this.topics.list.length <= 0 || this.$route.path !== this.topics.path) {
            fetchInitialData(this.$store, {page: 1})
        } else {
            ssp(this.$route.path)
            this.$store.dispatch('gProgress', 100)
        }
    },
    watch: {
        '$route'() {
            fetchInitialData(this.$store, {page: 1})
        }
    },
    beforeRouteLeave (to, from, next) {
        const scrollTop = document.body.scrollTop
        const path = this.$route.path
        if (scrollTop) ls.set(path, scrollTop)
        else {
            if (ls.get(path)) ls.remove(path)
        }
        next()
    },
    render(h) { // eslint-disable-line
        const lists = this.topics.list.map(item => {
            return (
                <index-post key={item._id} item={item} ispc={this.isPC} />
            )
        })
        return (
            <div class="g-mn">
                <div class="posts">
                    {lists}
                </div>
                <div class="box m-page box-do">
                    <div class="w-icon w-icon-2" />
                    <div class="w-icon w-icon-3" />
                    {this.topics.hasNext ? <a on-click={this.loadMore.bind(this, this.topics.page + 1)} href="javascript:;">加载更多</a> : <span>好厉害, 竟然翻到最后一页了...</span>}
                </div>
            </div>
        )
    }
}
