<template>
    <div class="book-seller-list-page">
        <div class="book-seller-list-header">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
                <el-breadcrumb-item >书商管理</el-breadcrumb-item>
                <el-breadcrumb-item >书商列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="book-seller-list-body">
            <el-form ref="stackRoomForm" :model="book_seller_list_condition" :rules="book_seller_list_rules" class="book-seller-list-form" label-width="80px" size="small">
                <el-form-item label="类型" label-width="60px" prop="bookType">
                    <el-select v-model="book_seller_list_condition.bookType" placeholder="请选择类型">
                        <el-option label="全部" value="999"></el-option>
                        <el-option label="收费" value="0"></el-option>
                        <el-option label="免费" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="书籍名称/作者" label-width="110px" prop="author">
                    <el-input v-model="book_seller_list_condition.author"></el-input>
                </el-form-item>
                <el-form-item label="收费方式" prop="charge_ways">
                    <el-select v-model="book_seller_list_condition.charge_ways" placeholder="请选择收费方式">
                        <el-option label="全部" value="999"></el-option>
                        <el-option label="书币" value="0"></el-option>
                        <el-option label="积分" value="1"></el-option>
                        <el-option label="书币/积分" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态" label-width="60px" prop="status">
                    <el-select v-model="book_seller_list_condition.status" placeholder="请选择状态">
                        <el-option label="全部" value="999"></el-option>
                        <el-option label="上架中" value="0"></el-option>
                        <el-option label="下架中" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="最近更新时间" label-width="110px">
                    <el-col :span="11" class="startTime">
                        <el-form-item  prop="update_start_time">
                            <el-date-picker
                                    type="date"
                                    format="yyyy-MM-dd"
                                    placeholder="起始时间"
                                    v-model="book_seller_list_condition.update_start_time"
                                    :picker-options="pickerBeginDateBefore"
                                    style="width: 100%;"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <!--<el-col class="line" :span="2" style="text-align:center">至</el-col>-->
                    <el-col style="width:20px;text-align:center">至</el-col>
                    <el-col :span="11" class="endTime">
                        <el-form-item prop="update_end_time">
                            <el-date-picker
                                    type="date"
                                    format="yyyy-MM-dd"
                                    placeholder="结束时间"
                                    v-model="book_seller_list_condition.update_end_time"
                                    :picker-options="pickerBeginDateAfter"
                                    style="width: 100%;"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="书籍状态" prop="bookStatus">
                    <el-select v-model="book_seller_list_condition.bookStatus" placeholder="请选择书籍状态">
                        <el-option label="全部" value="999"></el-option>
                        <el-option label="完结" value="0"></el-option>
                        <el-option label="连载" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="书籍分类" prop="category">
                    <el-select v-model="book_seller_list_condition.category" placeholder="请选择书籍分类">
                        <el-option label="全部" value="999"></el-option>
                        <el-option label="玄幻" value="0"></el-option>
                        <el-option label="武侠" value="1"></el-option>
                        <el-option label="都市" value="2"></el-option>
                        <el-option label="军事" value="3"></el-option>
                        <el-option label="历史" value="4"></el-option>
                        <el-option label="竞技" value="5"></el-option>
                        <el-option label="科幻" value="6"></el-option>
                        <el-option label="灵异" value="7"></el-option>
                        <el-option label="悬疑" value="8"></el-option>
                        <el-option label="同人" value="9"></el-option>
                        <el-option label="言情" value="10"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="来源/书商" prop="bookman">
                    <el-select v-model="book_seller_list_condition.bookman" placeholder="请选择来源/书商">
                        <el-option label="全部" value="999"></el-option>
                        <el-option label="baike.com" value="0"></el-option>
                        <el-option label="quang.com" value="1"></el-option>
                        <el-option label="hsxx.com" value="2"></el-option>
                        <el-option label="ccom.com" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="float: right;">
                    <el-button type="info" @click="clearData">清空</el-button>
                    <el-button type="primary" @click="getBannerAppLists">查找</el-button>
                    <el-button type="warning" @click="getBannerAppLists">创建书商</el-button>
                    <!--<el-button type="warning" @click="getBannerAppLists">批量上架</el-button>-->
                    <!--<el-button type="danger" @click="getBannerAppLists">批量下架</el-button>-->
                </el-form-item>
            </el-form>
            <el-table :data="tableData" style="width:100%;"
                      :default-sort = "{prop: 'updateTime', order: 'descending'}"
                      stripe border
                      @sort-change='sortChange'>
                <el-table-column
                        type="selection"
                        width="40">
                </el-table-column>
                <el-table-column label="序号" width="40" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.$index+(pageNo - 1) * pageSize + 1}} </span>
                    </template>
                </el-table-column>
                <el-table-column prop="booksellerName" label="书商名称" width="100" align="center"></el-table-column>
                <el-table-column prop="identification" label="标识" width="80" align="center"></el-table-column>
                <el-table-column prop="bookType" label="接入方式" width="80" align="center"></el-table-column>
                <el-table-column prop="bookType" label="书籍总量" width="80" align="center"></el-table-column>
                <el-table-column prop="bookType" label="审核通过" width="80" align="center"></el-table-column>
                <el-table-column prop="bookType" label="审核未通过" width="80" align="center"></el-table-column>
                <el-table-column prop="bookType" label="展示中" width="80" align="center"></el-table-column>
                <el-table-column prop="bookType" label="未展示" width="80" align="center"></el-table-column>
                <el-table-column prop="bookType" label="收费书籍" width="80" align="center"></el-table-column>
                <el-table-column prop="bookType" label="免费书籍" width="50" align="center"></el-table-column>
                <el-table-column prop="bookType" label="书币" width="80" align="center"></el-table-column>


                <el-table-column sortable='custom' :sort-orders="['ascending', 'descending']"
                                 prop="updateTime" label="创建时间" width="180" align="center"></el-table-column>
                <el-table-column prop="bookType" label="创建人" width="180" align="center"></el-table-column>
                <!--<el-table-column label="操作" min-width="250" align="center">-->
                    <!--<template slot-scope="scope">-->
                        <!--<el-button size="mini" type="danger" @click="handleOffLine(scope.$index, scope.row)">下架</el-button>-->
                        <!--<el-button size="mini" type="primary" @click="handleOnLine(scope.$index, scope.row)">上架</el-button>-->
                        <!--<el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                        <!--<el-button size="mini" type="info" @click="handleDetail(scope.$index, scope.row)">详情</el-button>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column label="操作" min-width="150" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" v-if="scope.row.status == '正常'? true:false" type="danger" @click="handleOffLine(scope.$index, scope.row)">停用</el-button>
                        <el-button size="mini" v-if="scope.row.status != '正常'? true:false" type="primary" @click="handleOnLine(scope.$index, scope.row)">启用</el-button>
                        <el-button size="mini" type="success" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10,20, 50, 100]"
                    background
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalSize">
            </el-pagination>
            <div class="dialog-div">
                <el-dialog title="" :visible.sync="offlineDialog" width="500px" center>
                    <span>你确认{{tmpAction}}“{{tmpBookSellerName}}”书商吗？</span>
                    <span slot="footer" class="dialog-footer">
            <el-button @click="offlineDialog = false">取 消</el-button>
            <el-button type="primary" @click="offlineDialog = false">确 认</el-button>
          </span>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
  import {orgModuleApi} from '../../api/main'
  export default {
    name: 'stackRoomList',
    data() {
      return {
        book_seller_list_condition: {
          bookType: '999',
          author: '',
          charge_ways: '999',
          status: '999',
          bookStatus: '999',
          update_start_time: '',
          update_end_time: '',
          category: '999',
          bookman: '999',
        },
        book_seller_list_rules: {
          bookType: '999',
          author: '',
          charge_ways: '999',
          status: '999',
          bookStatus: '999',
          update_start_time: '',
          update_end_time: '',
          category: '999',
          bookman: '999',
        },
        tmpBookSellerName:'xxxx',
        tmpAction:'启用',
        pickerBeginDateBefore:{
          disabledDate: (time) => {
            let beginDateVal = this.book_seller_list_condition.update_end_time;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        pickerBeginDateAfter:{
          disabledDate: (time) => {
            let beginDateVal = this.book_seller_list_condition.update_start_time;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
        tableData: [
          {booksellerName:'tao书商',identification:'yh08',bookType:83,status:'正常'},
          {booksellerName:'jsy书商',identification:'fd21',bookType:83,status:'!正常'},
        ],
        pageNo: 1,
        pageSize: 10,
        currentPage: 1,
        totalSize: 0,
        offlineDialog: false,
        sort_prop: 'updateTime',
        sort_order: 'desc',
      }
    },
    created() {
      this.getStackRoomLists()
    },
    methods: {
     handleOffLine(index, row){
        this.offlineDialog = true
        this.tmpAction = '停用'
        this.tmpBookSellerName = row.booksellerName;
     },
      handleOnLine(index, row){
        this.offlineDialog = true
        this.tmpAction = '启用'
        this.tmpBookSellerName = row.booksellerName;
      },
      handleDetail(index,row){
        this.$router.push({
          path:'/book-seller-detail'
        })
      },
      getStackRoomLists() {

      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getStackRoomLists()
      },
      handleCurrentChange(val) {
        this.pageNo = val
        this.getStackRoomLists()
      },
      clearData() {
        this.$refs.stackRoomForm.resetFields()
      },
      sortChange: function(column, prop, order) {
        this.sort_prop = column.prop
        this.sort_order = column.order.replace('ending','')
        this.getStackRoomLists()
      },
    }
  }
</script>
<style lang="scss">
    .book-seller-list-page{
        .book-seller-list-header{
            height: 50px;
            padding-left: 15px;
            .el-breadcrumb{
                font-size: 16px;
                margin-top: 15px;
            }
        }
        .book-seller-list-body{
            margin-left: 15px;
            margin-right: 15px;
            .book-seller-list-form{
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
            }
        }
        .el-dialog__header{
            padding: 0!important;
        }
        .el-dialog__body{
            span{
                display: block;
                text-align: center;
                margin-bottom: 10px;
            }
        }
    }
</style>
