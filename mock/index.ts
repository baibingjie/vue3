export default [
  //   {
  //     type: 'get',
  //     url: '/user/login',
  //     response: () => {
  //       return { isAuth: true }
  //     }
  //   },
  {
    type: 'get',
    url: '/user/list',
    response: () => {
      return {
        'data|4': [
          {
            'id|+1': 1,
            name: '螃蟹',
            age: 42,
            address: '西湖区湖底公园1号'
          }
        ],
        statusCode: 200
      }
    }
  },
  {
    type: 'get',
    url: '/user/info',
    response: () => {
      return {
        items: {
          name: '螃蟹',
          age: 42,
          tel: 13900000000
        },
        statusCode: 200
      }
    }
  }
]
