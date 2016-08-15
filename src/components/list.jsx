import { mapGetters } from 'vuex'
const fetchInitialData = async store => {
    const base = {
        action: 'getAdminArticle',
        limit: 20
    }
    await store.dispatch('getAdminTopics', base)
}
export default {
    computed: {
        ...mapGetters({
            topics: 'getAdminTopics'
        }),
        curPage() {
            return parseInt(this.$route.params.page, 10)
        },
        prevPage() {
            return parseInt(this.$route.params.page, 10) - 1
        },
        nextPage() {
            return parseInt(this.$route.params.page, 10) + 1
        }
    },
    methods: {
        mdel(id) {
            this.$store.dispatch('deleteArticle', {
                id,
                action: 'delete'
            })
        },
        recover(id) {
            this.$store.dispatch('recoverArticle', {
                id,
                action: 'recover'
            })
        }
    },
    created() {
        if (this.$route.path !== this.topics.path)
            fetchInitialData(this.$store)
        else
            this.$store.dispatch('gProgress', 100)
    },
    watch: {
        '$route'() {
            fetchInitialData(this.$store)
        }
    },
    render(h) { // eslint-disable-line
        const lists = this.topics.list.map(item => {
            return (
                <li class="list-group-item">
                    <router-link to={'/article/' + item._id} target="_blank">{item.title}</router-link>
                    {
                        item.is_delete === 0 || item.is_delete === "0" ?
                        <a on-click={this.mdel.bind(this, item._id)} href="javascript:;" class="badge badge-danger">删除</a> :
                        <a on-click={this.recover.bind(this, item._id)} href="javascript:;" class="badge badge-info">恢复</a>
                    }
                    <router-link to={'/edit/' + item._id + '/' + this.curPage} class="badge badge-success">编辑</router-link>
                </li>
            )
        })
        return (
            <div class="g-mn">
                <div class="box">
                    <ul class="list-group">
                        {lists}
                    </ul>
                </div>
                <div class="box m-page box-do">
                    <div class="w-icon w-icon-2"></div>
                    <div class="w-icon w-icon-3"></div>
                    {
                        this.topics.hasPrev ?
                        <router-link to={'/list/' + this.prevPage} id="__prev_permalink__" class="prev">上一页</router-link> : ''
                    }
                    {
                        this.topics.hasNext ?
                        <router-link to={'/list/' + this.nextPage} id="__next_permalink__" class="next">下一页</router-link> : ''
                    }
                </div>
            </div>
        )
    }
}
