const md5 = require('blueimp-md5')
/*1. 连接数据库*/
// 1.1. 引入mongoose
const mongoose = require('mongoose')
// 1.2. 连接指定数据库(URL只有数据库是变化的)
mongoose.connect('mongodb://localhost:27017/hzhaopin')
// 1.3. 获取连接对象
const conn = mongoose.connection
// 1.4. 绑定连接完成的监听(用来提示连接成功)
conn.on('connected', function() {
  // 连接成功回调
  console.log('数据库连接成功, YE!!!')
})
/*2.得到对应特定集合的Model*/
//2.1 定义Schema(描述文档结构)
const userSchema = mongoose.Schema({
  username: { type: String, require: true }, //用户名
  password: { type: String, require: true }, //密码
  type: { type: String, require: true } //用户类型 dashen/laoban
})
//2.2 定义Model(与集合对应，可以操作集合)
const UserModel = mongoose.model('user', userSchema) //集合的名字为users

/*3.通过Model或者其势力对集合数据进行CRUD操作*/
//3.1 通过Model实例的save()添加数据
function testSave() {
  //创建UserModel的实例
  const userModel = new UserModel({
    username: 'dashen1',
    password: md5('123'),
    type: 'dashen'
  })
  userModel.save(function(error,user) {
      console.log('save()',error,user)
  })
}
testSave()
//3.2通过Model实例的find()findOne()查询多个或一个数据
function testFind() {
    //查询多个
    UserModel.find({_id:'5e4949f622d02304ccec7c98'},function (error,users) {
        console.log('find()',error,users)
    })
    //查询一个
     UserModel.find({_id:'5e4949f622d02304ccec7c98'},function (error,user) {
        console.log('findOne()',error,user)
    })
}
//testFind()
// 3.3. 通过Model的findByIdAndUpdate()更新某个数据
function testUpdate() {
  UserModel.findByIdAndUpdate({_id:'5ae3d7b7614c613db8abb914'},
    {username:'Jack'}, function (error, oldUser) {
    console.log('findByIdAndUpdate()', error, oldUser)
  })
}
//testUpdate()

// 3.4. 通过Model的remove()删除匹配的数据
function testDelete() {
  UserModel.remove({_id:'5ae3d7b7614c613db8abb914'}, function (error, doc) {
    console.log('remove()', error, doc) // {n: 1/0, ok: 1}
  })
}
//testDelete()