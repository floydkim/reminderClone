import React from 'react';

// const TodoListEntry = (props) => (
class TodoListEntry extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentObj: props.contentObj,
            content: props.contentObj.content
        }

    }

    componentDidUpdate() {
        this.props.contentObj.content = this.state.content;
        // this.state.currentObj.content = this.state.content;
        // input박스의 onChange에 의해 state.content가 변경되고, 이 함수가 실행된다.
        // DATA의 해당 필드를 직접 수정해 변경한다. 
        // console.log(this.state.content, this.props.contentObj.content)
        console.log("TodoListEntry ) didUPDATED!!!", this.props.contentObj.content)
        localStorage.setItem("floydReminderApp", JSON.stringify(this.props.entireDATA));
    }

    render() {
        // if (typeof this.props.contentObj !== 'object') {
        if (Object.keys(this.props.contentObj).length === 0 || this.props.contentObj.group === null) {
            // console.log("TodoListEntry ) THIS ENTRY IS EMPTY");
            return <li className="list-group-item p-1"></li>
        } else if (this.props.contentObj.content === null){
            console.log("TodoListEntry ) THIS ENTRY IS ADDER");
            this.props.contentObj.content = "";
            this.state.content = "";
            // this.props.entireDATA.push(this.props.contentObj);//빈어레이만드는건 인풋 클릭했을때 해야한다..
            console.log(this.props.DATA)
            return (<li className="list-group-item p-1">
                <input type="text" value={this.state.content} id="newAddInput"
                onChange={ e => {
                    this.setState({content: e.target.value})
                }}
                onFocus={ e => {
                    this.props.entireDATA.push(this.props.contentObj);//빈어레이만드는건 인풋 클릭했을때 해야한다..
                }}
                style={{
                    width: "100%",
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
                    // 값이 비어있지 않다면, DATA에 변경이 일어남을 알려야함
                    else this.props.updateDATA(this.props.entireDATA);
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