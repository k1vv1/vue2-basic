<template>
  <el-menu
    :collapse="isCollapse"
    :collapse-transition="true"
    background-color="#304156"
    text-color="#eee"
    active-text-color="#4dbcff"
    :default-active="$route.path"
    router
  >
    <div v-for="(item, index1) in menu" :key="index1">
      <el-submenu
        :index="index1 + 'a'"
        v-if="item.children && item.children.length > 0"
      >
        <template slot="title">
          <i :class="item.icon"></i>
          <span v-show="!isCollapse" slot="title">{{ item.name }}</span>
        </template>
        <div v-for="(child, index2) in item.children" :key="'second' + index2">
          <el-menu-item :index="child.path">
            <i :class="child.icon"></i>
            <span slot="title">{{ child.name }}</span>
          </el-menu-item>
        </div>
      </el-submenu>
      <el-menu-item v-else :index="item.path">
        <i :class="item.icon"></i><span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </div>
  </el-menu>
</template>

<script>
// import memberLogic from '@/server/memberLogic.js'
export default {
  props: ['isCollapse'],
  data() {
    return {
      menu: [
        {
          name: '首页',
          path: '/home',
          icon: 'el-icon-s-home'
        },
        {
          name: '企业运动',
          path: '/sport',
          icon: 'el-icon-office-building',
          children: [
            {
              name: '每日步数',
              path: '/sport/day',
              icon: 'el-icon-medal-1'
            },
            {
              name: '活动数据',
              path: '/sport/data',
              icon: 'el-icon-trophy'
            }
          ]
        },
        {
          name: '导出列表',
          path: '/excel',
          icon: 'el-icon-download'
        }
      ]
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped></style>
