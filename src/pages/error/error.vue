<template>
  <div class="error">
    <p class="headline">{{ tipWords }}</p>
    <p class="info">{{ desWords }}</p>
    <router-link to="/" class="return-home">返回首页</router-link>
  </div>
</template>

<script>
export default {
  name: 'pageErr',
  data() {
    return {
      tipWords: '对不起，您没有权限',
      desWords: '请联系管理员开通本页面的权限再来访问吧~'
    }
  },
  created() {
    if (this.$route.path === '/404') {
      this.tipWords = '找不到页面'
      this.desWords = '请检查您输入的网址是否正确'
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.animat(@duration, @delay) {
  animation-name: slideUp;
  animation-duration: @duration;
  animation-delay: @delay;
  animation-fill-mode: forwards;
  opacity: 0;
}
.error {
  background: #f0f2f5;
  height: 100vh;
  text-align: center;
  padding-top: 24vh;
  .headline {
    font-size: 20px;
    line-height: 24px;
    color: #1482f0;
    margin-bottom: 10px;
    .animat(0.5s, 0.1s);
  }
  .info {
    font-size: 13px;
    line-height: 21px;
    color: grey;
    margin-bottom: 30px;
    .animat(0.5s, 0.2s);
  }
  .return-home {
    display: inline-block;
    width: 110px;
    height: 36px;
    background: #1482f0;
    border-radius: 100px;
    text-align: center;
    color: #ffffff;
    font-size: 14px;
    line-height: 36px;
    cursor: pointer;
    .animat(0.5s, 0.3s);
  }
}
@keyframes slideUp {
  0% {
    transform: translateY(60px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
