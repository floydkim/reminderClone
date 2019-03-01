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
        console.log("TodoListEntry ) UPDATED!!!", this.props.contentObj.content)
        localStorage.setItem("floydReminderApp", JSON.stringify(this.props.DATA));
    }

    render() {
        if (Object.keys(this.props.contentObj).length === 0) {
        // if (typeof this.props.contentObj !== 'object') {
            return <li className="list-group-item p-1"></li>
        } else {
            return (<li className="list-group-item p-1">
            {/* value는 props로 App에서부터 받아오고,
            값 변경은 콜백이 App.setState해서 현재 번경 일어난 오브젝트의 내용 바꾸는게 좋겠다.
            근데 정확히 그 오브젝트를 가리키는게 어렵다. */}

            {/* 일단은 아래처럼 했을때 TodoListEntry는 자신의 변화를 알아차린다.
            이게 App까지 타고올라가지 못해서 문제지..
            어떻게하면 이벤트가 발생한 곳의 변화를 알릴 수 있을까?
            onClick시 App에서 내려온 핸들러함수로, 선택된 오브젝트 주소를 App의 state 혹은 핸들러의 변수로 기억한다.
            아니 이렇게 해도 DATA의 내용 중 어떤 오브젝트의 .content가 바뀌었는지는 알아차릴 수 없다.
            DATA의 변화를 알아채려면 전체를 재할당해서 통으로 변화시켜야 하는걸까? */}
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