<template>
  <div>
    <a-page-header
      title="返回"
      sub-title="| 权限分配"
      @back="gohome()"
      style="padding: 5px"
      backIcon="<"
    />
    <div class="box_card">
      <a-card
        title="角色选择"
        style="
          width: 300px;
          height: 400px;
          margin: 40px;
          display: inline-block;
          vertical-align: top;
        "
        :headStyle="headStyle"
      >
        <a-radio-group @change="onChange">
          <a-radio :style="radioStyle"
            v-for="(item, index) in checkModel"
            :key="index"
            :value="item.role"
          >{{ item.name }}</a-radio>
        </a-radio-group>
      </a-card>

      <a-card
        title="权限分配"
        style="
          width: 300px;
          height: 400px;
          margin-top: 40px;
          display: inline-block;
        "
        :headStyle="headStyle"
      >
        <div v-if="role == ''">请先选择角色！</div>
        <div v-else>
          <a-spin :spinning="spinning">
            <a-tree
              v-model="checkedKeys"
              checkable
              :auto-expand-parent="autoExpandParent"
              :tree-data="treeData"
              @select="onSelect"
              class="tree"
              @check="onCheck"
            />
          </a-spin>
        </div>
      </a-card>
    </div>
    <a-button type="primary" @click="addEmploy()" :loading="loading">
      保存
    </a-button>
  </div>
</template>
<script>
const treeData = [];
import { mapGetters } from "vuex";
export default {
  data() {
    return {
       radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      },
      autoExpandParent: true,
      spinning: false,
      checkedKeys: [],
      onCheckedKeys: [],
      treeData,
      headStyle: {},
      checkModel: [
        { name: "admin", role: "0" },
        { name: "editor", role: "1" },
        { name: "reader", role: "2" },
      ],
      role: "",
      checkVal: {},
      loading: false,
      treeRouters: [],
      delayTime: 500,
    };
  },
  created() {
    var str = '{"background":"#1890FF","font-size":"18px","font-weight":"800"}';
    let style = JSON.parse(str);
    this.headStyle = style;
    this.checkModel.name = this.getname;
    this.treeRouters = this.getrouters;
    this.treeData = this.renderTreeNodes(this.treeRouters);
  },
  computed: {
    ...mapGetters(["getrouters", "getname", "getroles"]),
  },
  watch: {
    checkedKeys(val, event) {
    },
  },
  methods: {
    onCheck(val, event) {
      val = val.concat(event.halfCheckedKeys);
      this.onCheckedKeys = val;
      console.log(this.onCheckedKeys);
    },
    renderTreeNodes(treeRouters) {
      let tree = [];
      treeRouters.forEach((item) => {
        let data = {
          title: item.name,
          key: item.path,
        };
        if (item.meta) {
          if (item.meta.btnPermissions) {
            let arr = [];
            let permission = item.meta.btnPermissions;
            for (const key of permission) {
              arr.push({ title: key, key: permission[key] });
            }
            data.children = arr;
          } else {
            if (item.children) {
              data.children = this.renderTreeNodes(item.children);
            }
          }
        }
        tree.push(data);
      });
      return tree;
    },
    gohome() {
      this.$router.push({ path: "/home" });
    },
    addEmploy() {
      this.loading = true;
      console.log(this.role);
      this.$store.dispatch("setPermission", this.onCheckedKeys);
      this.loading = false;
      this.$message.success("保存成功");
    },
    onChange(e) {
      this.spinning = true;
      let check = [];
      console.log("checkbox", e);
      this.role = e.target.value;
      this.getrouters.forEach((item) => {
        if (item.meta) {
          if (item.meta.role && item.meta.role.indexOf(this.role) != -1) {
            check.push(item.path);
          }
          if (item.meta && item.children) {
            item.children.forEach((it) => {
              if (it.meta.role.indexOf(this.role) != -1) {
                check.push(it.path);
              }
            });
          }
        }
      });
      setTimeout(() => {
        this.spinning = false;
      }, 1000);
      this.checkedKeys = check;
    },
    onSelect(selectedKeys, info) {
      console.log("onSelect", info);
      this.selectedKeys = selectedKeys;
    },
  },
};
</script>
<style scoped>
.body {
  min-width: 1024px;
}
.checkboxgroup {
  display: flex;
}
.tree {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>