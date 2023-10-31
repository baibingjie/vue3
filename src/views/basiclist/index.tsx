import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {},
  emits: [],
  components: {},
  setup(props, ctx) {
    const tableData = [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ]
    const dataSource = [
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号'
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号'
      }
    ]
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age'
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address'
      }
    ]

    const ActionBtn = () => (
      <>
        <el-button link type="primary" size="small">
          Detail
        </el-button>
        <el-button link type="primary" size="small">
          Edit
        </el-button>
      </>
    )

    return () => (
      <div>
        <h3 style="margin-bottom: 20px">列表展示</h3>
        <h4>这是elementUI-plus</h4>
        <el-table data={tableData} border style={{ width: '100%' }}>
          <el-table-column prop="date" label="Date" />
          <el-table-column prop="name" label="Name" />
          <el-table-column prop="address" label="Address" />
          <el-table-column
            label="Operations"
            width="200"
            v-slots={{
              default: ActionBtn
            }}
          ></el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            total={50}
            small
            background
            currentpage={1}
            pagesize={20}
          />
        </div>
        <h4 style="margin-top: 20px">这是ant-design-vue</h4>
        <a-table dataSource={dataSource} columns={columns} />
      </div>
    )
  }
})
