import React from 'react';
import TodoListEntry from './TodoListEntry';
import TodoListAdd from './TodoListAdd';

const TodoList = (props) => (
    <div>
        <div id="div-title-todolist">
            <div className="row no-gutters justify-content-between">
                <div className="col-9 p-1 h4 font-weight-bolder">
                    <span>{props.currentGroup === null ? "모든 메모" : props.currentGroup}</span>
                </div>
                <div className="col-2 text-right">
                    <button className="btn btn-dark btn-sm"
                    onClick={() => {document.getElementById('newAddInput').focus()}}
                    >+</button>
                </div>
            </div>
        </div>
        <div id="div-todolist">
            <ul className="list-group list-group-flush" id="ul-todolist">
                {/* 기존 데이터 필드 */
                props.DATA.map((obj, i) => {
                    return <TodoListEntry
                    contentObj={obj}
                    id={obj.id}
                    key={`!M/${i}/${obj.content[0]}`}
                    removeEntry={props.removeEntry}
                    DATA={props.DATA}
                    />
                })}
                {/* 신규입력필드 */}
                {/* <TodoListAdd */}
                <TodoListEntry
                contentObj={{
                    id: props.nextID,
                    content: null,
                    group: props.currentGroup,
                    isDone: false,
                    remindAt: null,
                    createdAt: new Date()
                }}
                // nextID={props.nextID}
                key={`!EntryAdder`}
                removeEntry={props.removeEntry}
                DATA={props.DATA}
                currentGroup={props.currentGroup}
                appRender={props.appRender}
                />
                {/* 더미 필드 */
                // [1,2,3,4,5,6,7,8,9].map((obj, i) => {
                [{},{},{},{},{},{},{}].map((obj, i) => {
                    return <TodoListEntry
                    contentObj={obj}
                    id={"dummy"+i}
                    key={`!Dummy/${i}`}
                    />
                })}
            </ul>
        </div>
    </div>
);

export default TodoList;