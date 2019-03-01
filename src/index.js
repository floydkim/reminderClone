import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();


/* 명세
///// 필요 기능 /////
0. App이 마운트될 때, data.js의 내용을 가져와 화면에 뿌릴 것.
  1-1. 이후 추가되는 부분은 내부 데이터에서 조작한다.
  1-2. Advanced) 조작할 때 마다 localStroage에 저장한다.
    1-2-1. App의 state.data에서 조작중일텐데, state.dataLength가 변할 떄 마다 data를 stringify해서 localStroage에 저장한다.

1. 메모를 작성하면 데이터 오브젝트를 생성할것
    1-1. {
            // memoId: "각 메모의 아이디",
            content: "입력한 메모 내용",
            group: "메모를 작성한 그룹",
            isDone: Boolean(완료했는지 여부),
            remindAt: "알림설정된 날짜,시각". 설정안된경우 초기값 null,
            createdAt: "생성된 날짜,시각" // 형식 "2019-03-01 12:00:01" 이거면 Date.parse(" .. ")로 해석가능
        }
    1-2. 작성을 시작할땐 저장안함. 변화시 실시간으로 오브젝트에 들어갈 내용을 변경할것. (onChange -> obj.content = input.value)
      1-2-1. input에서 포커스가 떠나면 obj를 추가한다. 내용이 빈 스트링이면 push하지 않을 것.

1. 작성된 메모를 App.state.DATA 어레이에 업데이트 할 것

1. 작성한 메모를 삭제할 수 있을 것.
  1-1. App.state.DATA에서 해당 메모 id를 삭제할 것

1. 그룹명을 누르면 그룹에 해당하는 메모를 리스트에 띄울 것. (그룹명도 리스트 제목에 넘겨줄것)

1. 그룹 추가를 누르면 그룹명을 입력받고, 비어있는 그룹이 만들어져아 한다.   << 이거 나중으로 미루자
  1-0. 누른순간 빈 TodoList로 바뀌고, 입력하는 내용이 TodoList의 타이틀에 실시간으로 입력되며, state에 반영된다
  1-1. 모든 필드가 null이고, 그룹명만 들어있는 {}를 만들어 저장한다.

10. 매 분마다 체크해서, remindAt과 같은 시간이 되면 alert을 띄운다.
  10-1. sweetAlert2 를 이용해보자



///// Components /////
- App
  - Search
  - Groups
    - GroupsEntry
  - TodoList
    - DoneList
    - TodoListEntry



///// state가 필요한 Components /////
- App
  .DATA : data.js에서 가져온 메모 오브젝트 어레이. 추가 삭제가 이루어지는 메모 데이터임 [ {}, {}, .. ]
  //필요없을듯>>.nextId : 새 메모가 추가될 id를 기억함
  .currentGroup : 선택한 그룹 이름을 기억해둔다. 그룹선택이 변경되면 관련 VDOM이 업데이트 되길..

- TodoList
  // ?? .listLength : 실제 데이터보다 + 5개 만큼 더미 EntryList를 렌더해야 한다.
                content는 비어있고, 엔트리 컴포넌트는 빈 content에 대해서는 입력받을 준비가 되어있어야 한다.
  .

// ? - TodoListEntry : 가져온(혹은 입력된) 내용을 각자의 상태로 가져야 한다. 완료했는지도 받아와 상태에 반영해야한다.

- Groups
  .groups : props.DATA에서 긁어서 그룹명들을 모은 어레이. 이걸 기반으로 GroupsEntry들을 map한다. (App.DATA에 의존해야함)





*/