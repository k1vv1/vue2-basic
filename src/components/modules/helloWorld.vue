<template>
  <div class="hello">
    <h1>{{ msg }}，样式由less书写</h1>
    <input type="text" class="common" />
    <button @click="test()">点击</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {}
  },
  mounted: function () {},
  created: function () {},
  methods: {
    test() {
      console.log('点击了')
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../../style/root.less);
h1 {
  .hei(60px);
  &:hover {
    color: #696;
  }
}
</style>
