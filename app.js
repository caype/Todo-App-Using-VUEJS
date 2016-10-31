Vue.component('todo',{
  template:'#todoCard',
  props:['todo-Data','index'],
  methods:{
    removeTodo:function(){
        var toRemove = JSON.parse(localStorage.getItem('todoList'));
        var tempData = this.todoData;
        var todoUpdated = toRemove.filter(function(val){
            if(tempData!=undefined || tempData != null){
              return val.text!=tempData.text
            }
        	});
        if (todoUpdated.length >= 0) {
          localStorage.setItem('todoList',JSON.stringify(todoUpdated));
          this.$parent.getTodosFromLocalStorage();
        }
        //this.$parent.resetFields();
      }
  }
});

var todoVM = new Vue({
  el:'#todoList',
  created:function(){
    this.getTodosList();
  	},
  methods:{
    resetFields:function(){
        this.enteredText='';this.enteredType='';
    },
    getTodosFromLocalStorage:function(){
      this.todoArray = JSON.parse(localStorage.getItem('todoList'));
      this.resetFields();
    },
    getTodosList:function(){
      if (typeof(storage)!== 'undefined') {
        Materialize.toast('Oops ! there was an error saving your todo. Please try again.', 4000);
      }else{
        if (localStorage.getItem('todoList') == undefined || localStorage.getItem('todoList') == null || localStorage.getItem('todoList')=="[]") {
        Materialize.toast('Nothing to do. Add new Items to work!',4000);
        }else{
         this.getTodosFromLocalStorage();
        }
      }
    },
    addNewTodo:function(){
      if (typeof(storage)!== 'undefined') {
        Materialize.toast('Oops ! there was an error saving your todo. Please try again.', 4000);
      }else{
        if (localStorage.getItem('todoList') == undefined || localStorage.getItem('todoList') == null || localStorage.getItem('todoList')=="[]") {
          var targetTodo=[];
          targetTodo.push({text:this.enteredText,type:this.enteredType});
          localStorage.setItem('todoList',JSON.stringify(targetTodo));
          this.getTodosFromLocalStorage();
        }else{
          var existingTodoArray = JSON.parse(localStorage.getItem('todoList'));
          existingTodoArray.unshift({text:this.enteredText,type:this.enteredType});
          localStorage.setItem('todoList',JSON.stringify(existingTodoArray));
          this.todoArray = JSON.parse(localStorage.getItem('todoList'));
          this.resetFields();
        }
      }
    }
  },
  data:{
    todoArray:[],
    enteredText:'',
    enteredType:''
  }
});
