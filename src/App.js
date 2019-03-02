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
    this.onSearch = this.debounce(this.onSearch.bind(this), 500);
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
    this.setState({
      currentGroup: g
    })
  }

  debounce(func, wait) {
    var timerID;
    return function(...args) {
      clearTimeout(timerID);

      timerID = setTimeout(() => {func(...args)}, wait);
    }
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

    // 그룹 선택시 그룹명으로 필터된 어레이
    var listArr = this.state.currentGroup === null ?
                    this.state.DATA // 그룹 미선택시 전체어레이
                    : this.state.DATA.filter(cur => { // 그룹 선택시 선택한 그룹에 속한 것들만 모음
                      return cur.group === this.state.currentGroup;
                    }).sort((a, b) => a.id - b.id); // id에 따라 정렬시킴

    // 검색어 입력시 검색어 포함한 메모들만 모은 어레이
    var searchArr = this.state.query === null ?
                      this.state.DATA // 검색어 입력전에는 전체어레이
                      : this.state.DATA.filter(cur => { // 검색어 입력시 검색어 포함한 것만 모음
                        return cur.content.indexOf(this.state.query) > -1;
                      }).sort((a, b) => a.id - b.id); // id에 따라 정렬시킴

    return (
      <div className="container border rounded m-2 p-0 h-100">
        <div className="row h-100 no-gutters">
          <div className="col-4 div-sidebar-light border-right">
            <div className="row mb-2 no-gutters" id="div-search">
              <Search
                onSearch={this.onSearch}
              />
            </div>
            <div className="h6 p-2"
              style={{
                cursor: "pointer",
                margin: 2,
                color: "#555",
                fontSize: 14
                }}
            >
            예정됨
            </div>
            <hr className="mt-2 mb-0 ml-2 mr-2" />
            <div className="row h-100 no-gutters" id="div-groups">
              <Groups
                grouplist={groupArr}
                onGroupChange={this.onGroupChange}
              />
            </div>
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
