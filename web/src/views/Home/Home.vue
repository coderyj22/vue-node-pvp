<template>
  <div class="home">
    <div class="swiper">
      <swiper ref="homeSwiperRef" :options="swiperOptions">
        <swiper-slide>
          <img class="swiper-img" src="./img/banner1.jpeg" alt="" />
        </swiper-slide>
        <swiper-slide>
          <img class="swiper-img" src="./img/banner2.jpeg" alt="" />
        </swiper-slide>
        <swiper-slide>
          <img class="swiper-img" src="./img/banner3.jpeg" alt="" />
        </swiper-slide>
      </swiper>
      <div class="dots">
        <div
          class="dot"
          @click="clickDot(index)"
          :class="index === currentIndex ? 'active' : ''"
          v-for="(item, index) in dots"
          :key="index"
        ></div>
      </div>
    </div>

    <div class="entry-list">
      <div class="list-item">
        <i class="bg-img list-img1"></i>
        <div>爆料站</div>
      </div>
      <div class="list-item">
        <i class="bg-img list-img2"></i>
        <div>故事站</div>
      </div>
      <div class="list-item">
        <i class="bg-img list-img3"></i>
        <div>周边商城</div>
      </div>
      <div class="list-item">
        <i class="bg-img list-img4"></i>
        <div>体验服</div>
      </div>
      <div class="list-item">
        <i class="bg-img list-img5"></i>
        <div>新人专区</div>
      </div>
      <div class="list-item">
        <i class="bg-img list-img6"></i>
        <div>荣耀·传承</div>
      </div>
      <div class="list-item">
        <i class="bg-img list-img7"></i>
        <div>王者营地</div>
      </div>
      <div class="list-item">
        <i class="bg-img list-img8"></i>
        <div>公众号</div>
      </div>
      <div class="list-item">
        <i class="bg-img list-img9"></i>
        <div>版本介绍</div>
      </div>
      <div class="list-item">
        <i class="bg-img list-img10"></i>
        <div>对局环境</div>
      </div>
    </div>

    <div class="hide-btn">
      收起
    </div>

    <Card :list="newsData" header-title="新闻质询" v-if="newsData.length">
      <div class="cont-title">
        <div
          class="title-item"
          @click="newCurrentIndex = index"
          :class="newCurrentIndex === index ? 'active' : ''"
          v-for="(item, index) in newsData"
          :key="index"
        >
          {{ item.name }}
        </div>
      </div>
      <slide ref="slideRef" @changeIndex="changeIndex">
        <news-item v-for="(item, index) in newsData" :data="item.newsList" :key="index" />
      </slide>
    </Card>

    <Card header-title="英雄列表" class="hero-card" v-if="heroData.length">
      <img
        src="https://ossweb-img.qq.com/upload/webplat/info/yxzj/20200602/898981360562721.jpg"
        width="335px"
        alt=""
      />
      <div class="nav-title">
        <div
          class="nav-item"
          @click="changeHeroIndex(index)"
          v-for="(item, index) in heroData"
          :key="index"
          :class="heroCurrentIndex === index ? 'active' : ''"
        >
          {{ item.name }}
        </div>
      </div>
      <swiper ref="heroSwiperRef" :options="heroSwiperOptions">
        <swiper-slide
          v-for="(item, index) in heroData"
          class="slide-hero-item"
          :key="item._id || index"
        >
          <ul class="hero-container">
            <li v-for="hero in item.heroList" class="hero-item" :key="hero._id">
              <img :src="hero.avatar" alt="" />
              <div class="name">{{ hero.name }}</div>
            </li>
          </ul>
        </swiper-slide>
      </swiper>
    </Card>
  </div>
</template>

<script>
import Card from '../../components/Card/Card';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import { getNewsList, getHeroList } from '../../network';
import Slide from '../../components/Slide/Slide';
import NewsItem from '../../components/NewsItem/NewsItem';
import HeroItem from '../../components/HeroItem/HeroItem';

export default {
  name: 'Home',
  components: {
    Swiper,
    SwiperSlide,
    Card,
    Slide,
    NewsItem,
    HeroItem,
  },
  computed: {
    swiper() {
      return this.$refs.homeSwiperRef.$swiper;
    },
  },
  watch: {
    newCurrentIndex(newVal) {
      this.$refs.slideRef.goToPage(newVal);
    },
    heroCurrentIndex(newVal) {
      this.heroSwiper.slideTo(newVal, 300, false);
    },
  },
  data() {
    return {
      swiperOptions: {
        loop: true,
        autoplay: {
          delay: 1000,
        },
        pagination: {
          el: '.pagination-home',
        },
      },
      heroSwiperOptions: {
        autoHeight: true,
      },
      dots: [],
      currentIndex: 2,
      newCurrentIndex: 0,
      heroCurrentIndex: 0,
      heroData: [],
      newsData: [],
    };
  },
  mounted() {
    getNewsList().then(res => {
      this.newsData = res.data;
    });
    getHeroList().then(res => {
      this.heroData = res.data;
      console.log(this.heroData);
      this.$nextTick(() => {
        this.heroSwiper = this.$refs.heroSwiperRef.$swiper;
        this.heroSwiper.on('slideChange', () => {
          this.heroCurrentIndex = this.heroSwiper.activeIndex;
        });
      });
    });
    this._initDots();
    this.timer = null;
    this.play();
    this.swiper.on('slideChange', () => {
      const { activeIndex } = this.swiper;
      this.currentIndex = (activeIndex + 1) % 3;
      this.timer && clearTimeout(this.timer);
      this.play();
    });
  },
  methods: {
    changeIndex(i) {
      this.newCurrentIndex = i;
    },
    changeHeroIndex(i) {
      this.heroCurrentIndex = i;
    },
    play() {
      this.timer = setTimeout(() => {
        this.swiper.slideNext();
      }, 3000);
    },
    _initDots() {
      this.dots = new Array(this.$refs.homeSwiperRef.$children.length);
    },
    clickDot(index) {
      this.currentIndex = (index + 2) % 3;
      this.swiper.slideTo(this.currentIndex, 300);
    },
  },
  beforeDestroy() {
    this.timer && clearTimeout(this.timer);
  },
};
</script>

<style scoped lang="scss">
.home {
  .swiper-img {
    width: 375px;
  }
}

.swiper {
  position: relative;
}

.dots {
  height: 20px;
  position: absolute;
  width: 100%;
  display: flex;
  bottom: 10px;
  z-index: 10;
  justify-content: flex-end;

  .dot {
    width: 8.5px;
    height: 8.5px;
    margin-right: 10px;
    background-color: #fff;

    &.active {
      background-color: #4b67af;
    }
  }
}

.entry-list {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  margin-top: 10px;

  .list-item {
    width: 25%;
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    position: relative;
    margin: 10px 0;
    box-sizing: border-box;
    color: #222;

    .bg-img {
      display: block;
      width: 23px;
      height: 20px;
      background-image: url('../../assets/img/sprite.png');
      background-size: 375px;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 1px;
        height: 100%;
        background-color: #d4d9de;
      }

      &.list-img1 {
        background-position: -224px -67px;
      }

      &.list-img2 {
        background-position: -318px -68px;
      }

      &.list-img3 {
        background-position: -131px -4px;
      }

      &.list-img4 {
        background-position: -37px -67px;
      }

      &.list-img5 {
        background-position: -319px -5px;
      }

      &.list-img6 {
        width: 24px;
        background-position: -128px -66px;
      }

      &.list-img7 {
        width: 25px;
        height: 25px;
        background-position: -222px -4px;
        background-size: 375px;
      }

      &.list-img8 {
        background-position: 0 -418px;
      }

      &.list-img9 {
        background: url('./img/add_list1.png') no-repeat 0 0;
        width: 24px;
        height: 20px;
        display: block;
        background-size: 100% 100%;
      }

      &.list-img10 {
        background: url('./img/add_list2.png') no-repeat 0 0;
        width: 26px;
        display: block;
        background-size: 100% 100%;
      }
    }

    &:nth-child(4n) {
      .bg-img::after {
        display: none;
      }
    }
  }
}

.hide-btn {
  background-color: #f9f9f9;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #333;
}

.hero-card {
  .nav-title {
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .nav-item {
      height: 20px;
      font-size: 13px;

      &.active {
        color: #db9e3f;
        border-bottom: 2px solid #db9e3f;
      }
    }
  }

  .slide-hero-item {
    .hero-container {
      display: flex;
      /*justify-content: space-between;*/
      align-items: center;
      flex-wrap: wrap;
      padding: 0;

      .hero-item {
        box-sizing: content-box;
        padding: 0 4px;
        width: 58px;
        height: 87px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
          width: 58px;
          height: 58px;
        }

        .name {
          text-align: center;
        }
      }
    }
  }
}
</style>
