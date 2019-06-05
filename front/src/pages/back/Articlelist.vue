<template>
  <div class="fillContainer">
    <div>
      <el-form :inline="true" ref="add_data">
        <el-form-item class="btn_right">
          <router-link to="/addarticle">
            <el-button type="primary" size="small" icon="view">添加</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
    <div class="tableContainer">
      <el-table v-if="tableData.length > 0" :data="tableData" style="width: 100%">
        <el-table-column prop="date" align="center" label="创建时间" width="250">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date.slice(0,10) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" align="center" label="标题" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="category" align="center" label="分类" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.category }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="operation" align="center" fixed="right" width="250" label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="success" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页功能 -->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="paginations.page_index"
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Articlelist",
  data() {
    return {
      paginations: {
        page_index: 1, // 默认为第一页
        total: 0, // 总数
        page_size: 5, // 一页显示多少条
        page_sizes: [5, 10], // 条数选择
        layout: "total, sizes, prev, pager, next, jumper"
      },
      tableData: [],
      allTableData: []
    };
  },
  created() {
    this.getArticle();
  },
  methods: {
        getArticle() {
      // 获取表格数据
      this.$axios
        .get("/api/articles")
        .then(res => {
          this.allTableData = res.data;
          // 同时将此数据存入vuex
          // 设置分页数据
          this.setpaginations();
        })
        .catch(err => console.log(err));
    },
    setpaginations() {
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_siaz = 5;
      // 设置分页默认数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_siaz;
      });
    },
    handleEdit(row) {
      this.$router.push({name:'Addarticle', params: {article: row}})
    },
    handleDelete(id) {
      let context = this
      this.$axios.delete(`api/articles/delete/${id}`).then(function(res) {
        if (res.status === 200) {
          context.getArticle();
        }
      });
    },
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_siaz = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    handleCurrentChange(page) {
      // 获取当前页
      let index = this.paginations.page_size * (page - 1);
      // 数据总数
      let nums = this.paginations.page_size * page;
      // 容器
      let tables = [];
      for (let i = index; i < nums; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i]);
        }
        this.tableData = tables;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.fillContainer {
  width: 100%;
  height: 753px;
  padding: 16px;
  box-sizing: border-box;
}

.btn_right {
  float: right;
}

.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>