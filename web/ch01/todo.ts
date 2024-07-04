(()=>{
  // TODO: 에러나 경고가 발생하는 부분에 적절한 타입 선언

  let todoItems: TodoItem[];

  // api
  // 객체를 정의할 때 타입을 명시하는게 좋다.(유지보수 고려)
  function fetchTodoItems() {
    const todos: TodoItem[] = [
      { id: 1, title: '안녕', done: false },
      { id: 2, title: '타입', done: false },
      { id: 3, title: '스크립트', done: false },
    ];
    return todos;
  }
  
  // TODO: Todo Type 지정
  interface TodoItem {
    id: number;
    title: string;
    done: boolean;
  }

  // crud methods
  // 할일 목록 조회
  function fetchTodos() {
    const todos = fetchTodoItems();
    return todos;
  }
  
  // 할일 등록
  function addTodo(todo: TodoItem) {
    todoItems.push(todo);
  }
  
  // 할일 삭제
  function deleteTodo(index: number) {
    todoItems.splice(index, 1);
  }
  
  // 할일 완료 처리
  function completeTodo(index: number, todo: TodoItem) {
    todo.done = true;
    todoItems.splice(index, 1, todo);
  }
  
  // business logic
  function logFirstTodo() {
    return todoItems[0];
  }
  
  function showCompleted() {
    return todoItems.filter(item => item.done);
  }
  
  function addTwoTodoItems() {
    // TODO: addTodo() 함수를 두 번 호출하여 todoItems에 할일 2개 추가
    addTodo({ id: 4, title: 'todo1', done: true });
    addTodo({ id: 5, title: 'todo2', done: true });
  }
  
  // 1. Todo 목록을 가져온다.
  todoItems = fetchTodos();
  // 2. 2개의 Todo를 등록한다.
  addTwoTodoItems();
  
  console.log('todoItems : ', todoItems);
  
  console.log('logFirstTodo : ', logFirstTodo());
  
  completeTodo(0, todoItems[0]);
  console.log('completeTodo(0, todoItems[0]) : ', todoItems);
  
  console.log('showCompleted : ', showCompleted());
  
  deleteTodo(4);
  console.log('deleteTodo(4) : ', todoItems);

})();

