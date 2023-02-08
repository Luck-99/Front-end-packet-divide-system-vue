<template>
  <div class="task-list-detail">
    <div class="task-list-detail-search">
      <el-form
        :inline="true"
        :model="searchForm"
        :rules="searchFormRules"
        ref="taskListDetailSearchForm"
      >
        <el-form-item label="用户：" prop="userKey">
          <el-select
            v-model="searchForm.userKey"
            placeholder="请选择用户"
            :clearable="true"
            style="width: 120px"
            ><el-option
              v-for="item in allMembers"
              :key="item.username"
              :label="item.name"
              :value="item.username"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="环境：" prop="envKey">
          <el-select
            v-model="searchForm.envKey"
            placeholder="请选择环境"
            :clearable="true"
            style="width: 150px"
            ><el-option
              v-for="item in allProjects"
              :key="item.key"
              :label="item.description"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间：" prop="startTime">
          <el-date-picker
            v-model="searchForm.startTime"
            type="datetime"
            placeholder="请选择开始时间"
            value-format="timestamp"
            style="width: 185px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：" prop="endTime">
          <el-date-picker
            v-model="searchForm.endTime"
            type="datetime"
            placeholder="请选择结束时间"
            value-format="timestamp"
            style="width: 185px"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleSearch('taskListDetailSearchForm')"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="task-list-detail-table">
      <el-table :data="taskTrendListTableData" :max-height="tableHeight">
        <el-table-column prop="userName" label="用户"> </el-table-column>
        <el-table-column prop="envName" label="环境"> </el-table-column
        ><el-table-column prop="action" label="状态"> </el-table-column
        ><el-table-column prop="time" label="时间"
          ><template slot-scope="scope">
            <span>{{ new Date(scope.row.time).toLocaleString() }}</span>
          </template></el-table-column
        ></el-table
      >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="taskTrendListData.length"
        style="padding-top: 14px; text-align: end"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getActionRecordList, getProjects } from "@/services/file"
import { getMembers } from "@/services/user"
export default {
  data() {
    const validateStartTime = (rule, value, callback) => {
      if (this.searchForm.endTime && value && this.searchForm.endTime < value) {
        callback(new Error("开始时间不能大于结束时间"))
      }
    }
    const validateEndTime = (rule, value, callback) => {
      if (
        this.searchForm.startTime &&
        value &&
        this.searchForm.startTime > value
      ) {
        callback(new Error("结束时间不能小于开始时间"))
      }
    }
    return {
      searchForm: {
        userKey: "", //用户key
        envKey: "", //环境key
        startTime: null, //开始时间
        endTime: null, //结束时间
      },
      allProjects: [],
      allMembers: [],
      taskTrendListData: [],
      taskTrendListTableData: [],
      tableHeight: 500,
      page: {
        currentPage: 1,
        pageSize: 20,
      },
      searchFormRules: {
        startTime: [
          {
            validator: validateStartTime,
            trigger: "blur",
          },
        ],
        endTime: [
          {
            validator: validateEndTime,
            trigger: "blur",
          },
        ],
      },
    }
  },
  methods: {
    async getProjects() {
      const res = await getProjects()
      if (res.code > 0) {
        this.allProjects = res.data
      }
    },
    async getMembers() {
      const res = await getMembers()
      if (res.code > 0) {
        this.allMembers = res.data
      }
    },
    async getTaskTrendList() {
      const res = await getActionRecordList(this.searchForm)
      if (res.code > 0) {
        this.taskTrendListData = res.data
        this.resetPage()
        this.sliceTableData()
      }
    },
    handleSearch(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getTaskTrendList()
        } else {
          return false
        }
      })
    },
    sliceTableData() {
      const { currentPage, pageSize } = this.page
      this.taskTrendListTableData = this.taskTrendListData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      )
    },
    handleSizeChange(val) {
      this.page.pageSize = val
      this.sliceTableData()
    },
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.sliceTableData()
    },
    resetPage() {
      this.page.currentPage = 1
    },
  },
  created() {
    this.getProjects()
    this.getMembers()
    this.getTaskTrendList()
    this.tableHeight = window.innerHeight - 50 - 44 - 28 - 65 - 28
  },
}
</script>

<style lang="less" scoped>
.task-list-detail {
  padding: 14px;
  background: #f0f2f5;
  .task-list-detail-search {
    display: flex;
    background: #fff;
    text-align: start;
    padding: 14px 14px 0;
  }
  .task-list-detail-table {
    background: #fff;
    padding: 14px;
  }
}
</style>
