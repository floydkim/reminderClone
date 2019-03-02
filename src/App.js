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

    var largestID = 0;
    for (var i = 0; i < data.length; i++) {
      if (data[i].id > largestID) largestID = data[i].id;
    }

    this.state = {
      DATA: data,
      currentGroup: null,
      update: false,
      nextID: largestID + 1,
      query: null
    };

    this.onGroupChange = this.onGroupChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.appRender = this.appRender.bind(this);
    this.removeEntry = this.removeEntry.bind(this);
    this.updateDATA = this.updateDATA.bind(this);
  }

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

  updateDATA(data) {
    var largestID = 0;
    for (var i = 0; i < data.length; i++) {
      if (data[i].id > largestID) largestID = data[i].id;
    }
    
    this.setState({
      DATA: data,
      nextID: largestID + 1
    })
  }

  removeEntry(id) {
    console.log("removeEntry OCCURRED!!!", id)
    // console.log(this.state.DATA[index])
    // var newData = this.state.DATA.splice(index, 1);
    for (var i = 0; i < this.state.DATA.length; i++) {
      if (this.state.DATA[i].id === id) {
        console.log("removeEntry will remove id",id,"i",i)
        this.state.DATA.splice(i, 1);
      }
    }
    // this.setState({nextID: })
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
      nextID: this.state.nextID + 1
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
              updateDATA={this.updateDATA}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
