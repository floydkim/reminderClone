import React from 'react';

class TodoListAdd extends React.Component {
    constructor(props) {
        super(props);
        console.log("PROPS in TodoListAdd : ",props)
        this.state = {
            content: "",
            firstCall: true
        }
        this.newObj = {};
    }

    componentDidUpdate() {
        
        console.log("TodoListAdd) UPDATED!!" , this.state.content)

        // 첫글자 입력시 DATA에 넣을 오브젝트 만든다.
        // 두번째 글자부터는 만든 오브젝트의 내용 수정.
        // 포커스가 blur되면 리스트 전체를 다시 렌더해서 새리스트+Add+dummy 가 되도록 한다.
        if (this.state.firstCall) {
            console.log("firstCall flag : ", this.state.firstCall)
            this.newObj = {
                id: this.props.nextID,
                content: this.state.content,
                group: this.props.currentGroup,
                isDone: false,
                remindAt: null,
                createdAt: new Date()
            }
            if (this.state.content.length !== 0) {
                this.props.DATA.push(this.newObj);
                localStorage.setItem("floydReminderApp", JSON.stringify(this.props.DATA));
                // console.log(this.props.DATA)
                this.setState({
                    firstCall : false
                })
            }
        } else {
            console.log("firstCall flag : ", this.state.firstCall)
            this.props.DATA[this.props.nextID].content = this.state.content;
        }
    }

    render() {
        return (<li className="list-group-item p-1">
            <input type="text" id="newAddInput"
            onChange={ e => {
                this.setState({content: e.target.value}) // 현재 컴포넌트의 상태만 변경해서 value만 새로 렌더된다
                }}
            onKeyDown={ e => {
                if (e.keyCode === 13) {
                    e.target.blur(); // 엔터 입력시 포커스 빼줌
                    document.getElementById('newAddInput').focus()
                }
            }}
            onBlur={(e) => {
                this.setState({content: this.state.content, firstCall: true});
                this.setState({content: ""});
                e.target.value = "";
                this.props.appRender();
            }}
            style={{
                width: this.state.content.length === 0 ? "100%" : this.state.content.length*15,
                maxWidth: "100%"
            }}
            />
        </li>)
    }
}

export default TodoListAdd;