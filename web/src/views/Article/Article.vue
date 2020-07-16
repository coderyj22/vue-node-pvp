<template>
  <div class="article">
    <div class="article-content" v-if="show">
      <div class="article-title">
        <button class="back-btn" @click="clickBack"></button>
        <div class="title-txt">{{ articleContent.title }}</div>
        <div class="create-time">{{ articleContent.updatedAt | formatDate }}</div>
      </div>
    </div>
    <div class="article-body">
      <div v-if="articleContent.body">
        <div v-html="articleContent.body"></div>
      </div>
      <div v-else>当前文章暂未录入数据</div>
    </div>
  </div>
</template>

<script>
import { getArticleDetail } from '../../network';
import moment from 'moment';

export default {
  name: 'Article',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      articleContent: null,
      show: false,
    };
  },
  created() {
    getArticleDetail(this.id).then(res => {
      console.log(res);
      this.articleContent = res.data;
      this.articleContent.title = '女啦可是纽芬兰省垃圾危如累卵苏丹诺夫卢卡斯的阿瑟费看来是我家人';
      this.show = true;
    });
    // console.log(this.id);
  },
  methods: {
    clickBack() {
      this.$router.back();
    },
  },
  filters: {
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD');
    },
  },
};
</script>

<style lang="scss">
.article {
  .article-content {
    .article-title {
      height: 40px;
      position: relative;
      padding: 0 5px;
      display: flex;
      line-height: 40px;
      border-bottom: 1px solid #d4d4d5;

      .back-btn {
        position: absolute;
        height: 40px;
        background: url('https://game.gtimg.cn/images/yxzj/m/m201606/cp/backBg.png') no-repeat
          center;
        background-size: 100%;
      }

      .title-txt {
        flex: 1;
        height: 40px;
        line-height: 40px;
        font-size: 13px;
        color: #4394e4;
        padding-left: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0;
      }

      .create-time {
        color: #9fa0a0;
        font-size: 12px;
        line-height: 40px;
      }
    }
  }

  .article-body {
    padding: 5%;
    overflow: hidden;
  }

  .article-body img {
    width: 100%;
  }
}
</style>
