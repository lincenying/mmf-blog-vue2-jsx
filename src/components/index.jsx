import { mapGetters } from 'vuex'
import indexPost from './index-post'
import { ua, ssp } from '../tools/command'
const fetchInitialData = async (store, config = { page: 1}) => {
    const {params: {id, qs}, path} = store.state.route
    const base = {
        ...config,
        action: 'getArticleList',
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
                    <div class="w-icon w-icon-2"></div>
                    <div class="w-icon w-icon-3"></div>
                    {this.topics.hasNext ? <a on-click={this.loadMore.bind(this, this.topics.page + 1)} href="javascript:;">加载更多</a> : <span>好厉害, 竟然翻到最后一页了...</span>}
                </div>
            </div>
        )
    }
}
