import React, { Component } from 'react';
import './App.css';
import Search from './components/Search'
import Groups from './components/Groups'
import TodoList from './components/TodoList'
import datajs from './data'

class App extends Component {
  constructor() {
    super();
    
    var data = datajs;
    // 기존 DATA가 localStoraged에 있는지 여부에 따라 localStorage에 저장 또는 불러오기
    if (localStorage.floydReminderApp) {
      data = JSON.parse(localStorage.getItem("floydReminderApp"));
    } else {
      // console.log(data);
      localStorage.setItem("floydReminderApp", JSON.stringify(data));
    }

    this.state = {
      DATA: data,
      currentGroup: null,
      update: false,
      nextID: data.length,
      query: null
    };

    this.onGroupChange = this.onGroupChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.appRender = this.appRender.bind(this);
    this.removeEntry = this.removeEntry.bind(this);
  }

  // modifyMemo(targetObj, content) { // 이거 필요없다. 핸들러 안부르고 바로 주소에 꽂았다.
  //   // console.log("modifyMemo!!!", targetObj, targetObj.id)
  //   targetObj.content = content; // 인자로 들어온 주소targetObj 의 content 속성을 두번째 인자로 재할당한다
  //   this.setState({ // App.js에서 업데이트를 감지하도록 
  //     // DATA: data // 이러면 전체 어레이가 재할당되니까
  //     update: !this.state.update // 더미값을 변경해준다.. 근데 DATA의 변경을 감지할수 없게 되지 않나?
  //   });
  // }

  componentDidMount() {

  }

  componentDidUpdate() {
    console.log("UPDATE OCCURRED in App.js!!!!!!")
    localStorage.setItem("floydReminderApp", JSON.stringify(this.state.DATA));
  }

  onGroupChange(g) {
    console.log("onGroupChange CALLEDD!!! : ", g)
    this.setState({ // setState시 에러발생. 보류.
      currentGroup: g
    })
  }

  onSearch(q) {
    console.log("onSearch CALLEDD!!! : ", q)
    this.setState({ // setState시 에러발생. 보류.
      query: q
    })
  }

  removeEntry(id) {
    console.log("removeEntry OCCURRED!!!", id)
    // console.log(this.state.DATA[index])
    // var newData = this.state.DATA.splice(index, 1);
    for (var i = 0; i < this.state.DATA.length; i++) {
      if (this.state.DATA[i].id === id) this.state.DATA.splice(i, 1);
    }
    // this.state.DATA.splice(index, 1);
    // console.log(this.state.DATA)
    this.appRender(); // 약간 강제업데이트긴한데.. 효과가 확실하다. state를 내가 잘 못쓰는거겠지
    // this.setState({
    //   DATA: newData
    // })
  }

  appRender() {
    this.setState({
      update: !this.state.update,
      nextID: this.state.DATA.length
    })
    localStorage.setItem("floydReminderApp", JSON.stringify(this.state.DATA));
  }

  render() {
    var groupArr = this.state.DATA.reduce((acc, cur) => {
      if (!acc.includes(cur.group)) acc.push(cur.group);
      return acc;
    }, []).sort();

    var listArr = this.state.DATA.reduce((acc, cur) => {
      if (this.state.currentGroup === null) {
        // null이면 필터하지않고 모두 모음.   for문이 괜히 돌아야 해서 비효율적이긴 하다.
        acc.push(cur);
      } else {
        // null이 아니면 currentGroup으로 필터링해서 모음
        if (cur.group === this.state.currentGroup) {
          acc.push(cur);
        }
      }
      return acc;
    }, []).sort((a, b) => a.id - b.id); // id에 따라 정렬시킴

    var searchArr = this.state.DATA.reduce((acc, cur) => {
      if (this.state.query === null) {
        // 검색하지 않았으면 모든 메모 모아둠
        acc.push(cur);
      } else {
        if (cur.content.indexOf(this.state.query) > -1) {
          acc.push(cur);
        }
      }
      return acc;
    }, []).sort((a, b) => a.id - b.id);

    return (
      <div className="container border rounded m-2">
        <div className="row">
          <div className="col-4 div-sidebar-light border-right">
            <div className="row mb-2" id="div-search"><Search onSearch={this.onSearch} /></div>
            <div className="h6 " style={{cursor: "pointer", margin: 2, color: "#555", fontSize: 14}}>예정됨</div>
            <hr className="m-0 mt-2" />
            <div className="row" id="div-groups"><Groups grouplist={groupArr} onGroupChange={this.onGroupChange} /></div>
          </div>
          <div className="col-8 p-1" id="div-outer-todolist">
            <TodoList
              DATA={this.state.query === null ? listArr : searchArr}//{this.state.DATA}
              currentGroup={this.state.query === null ? this.state.currentGroup : `"${this.state.query}" 검색 결과`}
              modifyMemo={this.modifyMemo}
              nextID={this.state.nextID}
              appRender={this.appRender}
              removeEntry={this.removeEntry}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
