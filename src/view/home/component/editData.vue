<template>
    <div class="add-contanier">
        <Card  class="add-content">
            <p slot="title">{{editType.message}}</p>
            <div class="search-item" v-for="(item, index) in newData" :key="index">
                <label for="">{{item.title}}：</label>
                <i-input v-model="item.val" placeholder="请输入..." class="search-input"></i-input>
            </div>
            <div class="btn-group">
                <Button  type="success"><Icon type="search"/>确定</Button>
                <Button @click="$emit('addCancel');"  type="error"><Icon type="search"/>取消</Button>
            </div>
        </Card>
    </div>
</template>
<script>
export default {
    props: ['editType'],
    data(){
        return{
            newData:[
                {
                    title:'名字',
                    key:'name',
                    val:""
                },{
                    title:'年龄',
                    key:'age',
                    val:""
                },{
                    title:'地址',
                    key:'address',
                    val:""
                }
            ]
        }
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


