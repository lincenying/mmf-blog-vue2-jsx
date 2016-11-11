export default {
    props: ['item', 'ispc'],
    data () {
        return {
            showMore: false
        }
    },
    methods: {
        handleOpen(e) {
            this.showMore = !this.showMore
            var $mPost = $(e.target).parents(".m-post")
            var offset = $mPost.offset()
            $("body").animate({
                scrollTop: offset.top
            }, 500 )
        }
    },
    render(h) { // eslint-disable-line
        const more = !this.showMore ? <a on-click={this.handleOpen} class="more" href="javascript:;">展开 ↓</a> : <a on-click={this.handleOpen} class="less" href="javascript:;">收起 ↑</a>
        const moreOrLess = this.ispc ? <div class="more-less">{more}</div> : ''
        return (
            <div class="index m-post box article">
                <a href="javascript:;" class="w-icon w-icon-1">&nbsp;</a>
                <a href="javascript:;" class="w-icon2">&nbsp;</a>
                <div class="info">
                    <a href="javascript:;">{this.item.creat_date}</a>
                </div>
                <div class="cont cont-1">
                    <div class="text">
                        <h2><router-link to={'/article/' + this.item._id}>{this.item.title}</router-link></h2>
                        {this.ispc ? <div class={!this.showMore ? 'markdown-body showless' : 'markdown-body'} domProps-innerHTML={this.item.html} /> : ''}
                        {moreOrLess}
                    </div>
                </div>
                <div class="info info-1" />
            </div>
        )
    }
}
