import {observable, action, computed, makeObservable, toJS} from 'mobx';


class Todostore{

    constructor(){
        makeObservable(this);
    }

    @observable
    _todo = {} // id, title, date

    @observable
    _todos = [];

    @observable
    _searchText = '';

    get todo(){
        return this._todo;
    }

    @computed
    get todos(){
        //return this._todos;
        return toJS(this._todos); // @observable 로 관리하는 데이터는 mobx 가 정의한 observable 데이터로 랩핑이 되지만 그렇지 않게 하기위함
    }

    get searchText(){
        return this._searchText;
    }

    @action
    setTodoProps(name, value){
        this._todo = {
            ...this._todo,
            [name] : value
        }
    }

    @action
    addTodo(todo){
        this._todos.push(todo);
    }

    @action
    selectedTodo(todo){
        this._todo = todo;
    }

    @action
    updateTodo(){
        let foundTodo = this._todos.find( (todo) => todo.id === this._todo.id);
        foundTodo.title = this._todo.title;
        foundTodo.date = this._todo.date;

        this._todo = {};
    }

    @action
    removeTodo(){
        let index = this._todos.findIndex( (todo) => todo.id === this._todo.id);
        
        if(index > -1){
            this._todos.splice(index, 1);
        }

        this._todo = {};
    }

    @action
    setSearchText(searchText){
        this._searchText = searchText;
    }

}

export default new Todostore(); // 싱글 인스턴스 되도록?