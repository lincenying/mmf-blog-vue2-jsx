export default {
    methods: {
        handleSlideToggle() {
            $(".m-about").slideToggle("800")
        }
    },
    render(h) { // eslint-disable-line
        return (
            <div>
                <div class="box m-tit">
                    <h1><a on-click={this.handleSlideToggle} href="javascript:;"></a></h1>
                    <a on-click={this.handleSlideToggle} href="javascript:;" class="w-icon">查看个人介绍</a>
                </div>
                <div class="box box-do m-about">
                    <div class="logo">
                        <a href="javascript:;"><img src="http://ww2.sinaimg.cn/large/005uQRNCgw1f4ij3dy4pmj302o02odfo.jpg" /></a>
                    </div>
                    <p>姓名: 林岑影</p>
                    <p>年龄: 1987.09</p>
                    <p>职业: 前端开发</p>
                    <p>技能: HTML5 + CSS3 + jQuery + Gulp + WebPack + ES6 + Vue + NodeJS + PHP</p>
                    <a on-click={this.handleSlideToggle} href="javascript:;" class="w-icon">收起个人介绍</a>
                </div>
            </div>
        )
    }
}
