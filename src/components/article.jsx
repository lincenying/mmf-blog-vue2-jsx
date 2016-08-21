import { mapGetters } from 'vuex'
import comment from './comment'
const fetchInitialData = async store => {
    await store.dispatch(`getArticle`)
    await store.dispatch(`getComment`, { page: 1, limit: 5})
}
export default {
    computed: {
        ...mapGetters({
            article: 'getArticle'
        })
    },
    components: {
        comment
    },
    mounted() {
        fetchInitialData(this.$store)
    },
    watch: {
        '$route'() {
            fetchInitialData(this.$store)
        }
    },
    render(h) { // eslint-disable-line
        return (
            <div class="g-mn">
                <div class="posts">
                    <div class="m-post box article">
                        <a href="javascript:;" class="w-icon w-icon-1">&nbsp;</a>
                        <a href="javascript:;" class="w-icon2">&nbsp;</a>
                        <div class="info">
                            <a href="javascript:;">{this.article.data.creat_date}</a>
                            <a href="javascript:;">浏览: {this.article.data.visit}</a>
                            <a href="javascript:;" class="comnum">{this.article.data.comment_count}</a>
                        </div>
                        <div class="cont cont-1">
                            <div class="text">
                                <h2><router-link to={'/article/' + this.article.data._id}>{this.article.data.title}</router-link></h2>
                                <div class="markdown-body" domProps-innerHTML={this.article.data.content}></div>
                            </div>
                        </div>
                        <div class="info info-1"></div>
                    </div>
                </div>
                <div class="box m-page box-do">
                    <div class="w-icon w-icon-2"></div>
                    <div class="w-icon w-icon-3"></div>
                    {
                    this.article.prev.prev_id ?
                        <router-link to={'/article/' + this.article.prev.prev_id} id="__prev_permalink__" class="prev">上一篇</router-link> :
                        <span class="prev">上一篇</span>
                    }
                    {
                    this.article.next.next_id ?
                        <router-link to={'/article/' + this.article.next.next_id} id="__next_permalink__" class="next">下一篇</router-link>:
                        <span class="next">下一篇</span>
                    }
                </div>
                <comment></comment>
            </div>
        )
    }
}
