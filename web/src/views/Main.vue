<template>
  <div>
    <div class="top-bar">
      <div class="logo-cont">
        <a href="https://pvp.qq.com/m/index.shtml" class="logo" />
        <div class="logo-title">
          <h1>王者荣耀</h1>
          <p>团队成就更多</p>
        </div>
      </div>
      <div class="download"><a href="https://pvp.qq.com/zlkdatasys/mct/d/play.shtml"></a></div>
    </div>

    <div class="nav bg-primary">
      <div
        class="nav-item"
        @click="clickItem(index)"
        v-for="(item, index) in navList"
        :key="item.id"
      >
        <span :class="index === currentIndex ? 'active' : ''">{{ item.title }}</span>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
      navList: [
        { id: 0, title: '首页' },
        { id: 1, title: '攻略中心' },
        { id: 2, title: '赛事中心' },
      ],
      currentIndex: 0,
    };
  },
  methods: {
    clickItem(i) {
      this.currentIndex = i;
    },
  },
};
</script>

<style scoped lang="scss">
.top-bar {
  width: 375px;
  height: 45px;
  background: url('../assets/img/sprite.png') no-repeat 0 -357px;
  background-size: 375px;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10000;

  .logo-cont {
    margin-top: 6px;
    height: 30px;
    display: flex;
    /*align-items:center;*/
    margin-left: 30px;
    vertical-align: middle;

    .logo {
      display: block;
      width: 30px;
      height: 30px;
      background: url('../assets/img/sprite.png') no-repeat 0 -308px;
      background-size: 375px;
    }

    .logo-title {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 10px;

      h1 {
        padding: 0;
        margin: 0;
        font-size: 12px;
        color: #fff;
        font-weight: normal;
      }

      p {
        padding: 0;
        margin: 0;
        margin-top: 2px;
        font-size: 12px;
        color: #666;
      }
    }
  }

  .download {
    a {
      display: block;
      width: 60px;
      height: 24px;
      background: url('../assets/img/sprite.png') no-repeat -59px -309px;
      background-size: 375px;
      margin-top: 10px;
      margin-right: 20px;
    }
  }
}

.nav {
  height: 42px;
  display: flex;
  margin-top: 45px;
  .nav-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      color: #fff;
      display: block;
      height: 23px;
      box-sizing: border-box;
    }

    .active {
      border-bottom: 3px solid #fff;
    }
  }
}
</style>
