<template>
  <div class="layout">
    <div class="menu-wrapper">
      <left-menu :isCollapse="isFold"></left-menu>
    </div>
    <div class="content">
      <header>
        <i
          :class="['el-icon-s-fold', { active: isFold }]"
          @click="isFold = !isFold"
        ></i>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item, index) in routerItems" :key="index">
            {{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="right">
          <div class="user-msg">
            <span class="user-name">（id：{{ userId }}）</span>
          </div>
          <div class="quit-system">
            <i class="iconfont icon-quit"></i>
            <el-dropdown trigger="click" placement="top" @command="loginOut">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </header>
      <div class="main-wrapper">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import leftMenu from './leftMenu'
import api from '@/server/home'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isFold: false, //导航菜单面板是否折叠
      userId: 0
    }
  },
  created() {
    this.initData()
  },
  components: {
    leftMenu
  },
  methods: {
    initData() {},
    loginOut() {}
  },
  computed: {
    ...mapState(['user']),
    routerItems() {
      let resultArr = []
      let routeNow = this.$route
      let RootName = routeNow.matched[0].name //当前路由的根路由name
      resultArr.push({
        name: RootName,
        path: ''
      })
      if (routeNow.matched[0].path !== '' && RootName !== routeNow.name) {
        if (RootName !== routeNow.name) {
          resultArr.push({
            name: routeNow.matched[1].name,
            path: routeNow.matched[1].path
          })
        }
      }
      return resultArr
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../../../style/root.less);
.layout {
  height: 100vh;
  display: flex;
}
.menu-wrapper {
  height: 100%;
  text-align: center;
  overflow: auto;
  background-color: #304156;
  .el-menu {
    background-color: #304156;
    .el-menu-item {
      color: #eee;
    }
  }
}
.content {
  background-color: #fff;
  flex: 1;
  overflow: hidden;
  header {
    line-height: 50px;
    font-size: 16px;
    color: #409eff;
    padding: 0 20px 0 60px;
    border-bottom: 1px solid #e5e5e5;
    position: relative;
    .el-icon-s-fold {
      position: absolute;
      left: 16px;
      top: 10px;
      font-size: 30px;
      cursor: pointer;
      transition: all 0.2s;
      &.active {
        transform: rotateY(180deg);
      }
    }
    .el-breadcrumb {
      display: inline-block;
    }
    .right {
      float: right;
      > div {
        position: relative;
        display: inline-block;
        text-align: center;
        vertical-align: middle;
        margin-left: 10px;
        padding: 0 5px;
        cursor: pointer;
        &:hover::after {
          transform-origin: 0 0;
          transform: scaleX(1);
        }
        &:first-child:before {
          border: none;
        }
        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background: #ef4747;
          transform: scaleX(0);
          transform-origin: right 0;
          transition: transform 0.5s;
        }
        &::before {
          content: '';
          position: absolute;
          height: 20px;
          top: 50%;
          left: -8px;
          margin-top: -10px;
          border-left: 1px solid #ccc;
        }
        &.user-msg {
          .user-name {
            color: #409eff;
            padding: 0 4px;
          }
        }
        .icon-quit {
          position: relative;
          font-size: 24px;
          color: #409eff;
        }
      }
    }
  }
  .main-wrapper {
    height: calc(100% - 51px);
    width: 100%;
    overflow: auto;
    padding: 20px;
  }
}
</style>
