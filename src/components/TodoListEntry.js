import React from 'react';

// const TodoListEntry = (props) => (
class TodoListEntry extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content: props.contentObj.content
        }

    }

    componentDidUpdate() {
        this.props.contentObj.content = this.state.content;
        // input박스의 onChange에 의해 state.content가 변경되고, 이 함수가 실행된다.
        // DATA의 해당 필드를 직접 수정해 변경한다. 
        // console.log(this.state.content, this.props.contentObj.content)
        console.log("TodoListEntry ) didUPDATED!!!", this.props.contentObj.content)
        localStorage.setItem("floydReminderApp", JSON.stringify(this.props.DATA));
    }

    render() {
        // if (typeof this.props.contentObj !== 'object') {
        if (Object.keys(this.props.contentObj).length === 0) {
            // console.log("TodoListEntry ) THIS ENTRY IS EMPTY");
            return <li className="list-group-item p-1"></li>
        } else if (this.props.contentObj.content.length === 0){
            console.log("TodoListEntry ) THIS ENTRY IS ADDER");
            var newObj = {
                id: this.props.nextID,
                content: this.state.content,
                group: this.props.currentGroup,
                isDone: false,
                remindAt: null,
                createdAt: new Date()
            }
            this.props.DATA.push(newObj);
            return (<li className="list-group-item p-1">
                <input type="text" value={this.state.content}
                onChange={ e => {
                    this.setState({content: e.target.value})
                }}
                style={{
                    width: this.state.content.length === 0 ? "100%" : this.state.content.length*15,
                    maxWidth: "100%"
                }}
                ></input>
            </li>
            )
        } else {
            console.log("TodoListEntry ) THIS ENTRY IS NORMAL")
            return (<li className="list-group-item p-1">
                <input type="text" value={this.state.content}
                onChange={ e => {
                    this.setState({content: e.target.value}) // 현재 컴포넌트의 상태만 변경해서 value만 새로 렌더된다
                }}
                onKeyDown={ e => {
                    // console.log(e.keyCode)
                    if (e.keyCode === 13) {
                        e.target.blur(); // 엔터 입력시 포커스 빼줌
                        // if (e.target.value === "") this.props.removeEntry(this.props.contentObj.id);
                    } else if (e.keyCode === 9) {
                        e.preventDefault();
                    }
                }}
                onBlur={e => {
                    // if (e.target.value === "") this.props.DATA.splice(this.props.contentObj.id-1, 1);
                    if (e.target.value === "") this.props.removeEntry(this.props.contentObj.id);
                }}
                style={{
                    width: this.state.content.length === 0 ? "100%" : this.state.content.length*15,
                    maxWidth: "100%"
                }}
                />
            </li>)
        }
    }
}

export default TodoListEntry;