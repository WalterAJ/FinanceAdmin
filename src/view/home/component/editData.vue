<template>
    <div class="add-contanier">
        <Card  class="add-content">
            <p slot="title">{{editType.message}}</p>
             <Form refs="addForm" :model="newData" label-position="left" :label-width="100" :rules="ruleValidate">
                <FormItem  label = "姓名" prop='name'>
                    <Input v-model="newData.name"></Input>
                </FormItem>
                <FormItem  label = "年龄" prop='age'>
                    <Input v-model="newData.age"></Input>
                </FormItem>
                <FormItem  label = "地址" prop='address'>
                    <Input v-model="newData.address"></Input>
                </FormItem>
                <FormItem label = '日期' prop='date'>
                    <Date-picker v-model="newData.date" format="yyyy-MM-dd" type="date" placeholder="选择日期" class="search-input"></Date-picker>
                </FormItem>
                <FormItem class="btn-group">
                    <Button  type="primary"  @click="handleSubmit"><Icon type="search"/>确定</Button>
                    <Button @click="$emit('addCancel');"  type="error"><Icon type="search"/>取消</Button>
                </FormItem>
            </Form>
          
            
        </Card>
    </div>
</template>
<script>
export default {
    props: ['editType'],
    mounted(){
        this.newData.date = new Date;
    },
    data(){
        return{
            newData:{
                name:'',
                age:'0',
                address:'',
                date:''
            },
            ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    age: [
                        { required: true, message: 'age cannot be empty', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: 'address cannot be empty', trigger: 'blur' }
                    ]
                }
        }
    },
    methods:{
        handleSubmit () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
    }
}
</script>
<style lang="less" scoped>
.add-contanier{
    position: absolute;
    top:0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    .add-content{
        width: 500px;
        margin: 100px auto;
    }
    .search-item{
        display: flex;
        margin-bottom: 20px;
        .search-input{
            width: 400px;
        }
        label{
            line-height: 32px;
        }
    }
    .btn-group{
        text-align: center;
        button{
            margin-right: 10px;
        }
    }
   
}
</style>


