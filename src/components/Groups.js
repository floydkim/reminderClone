import React from 'react';
import GroupsEntry from './GroupsEntry';

class Groups extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className="row p-2 no-gutters w-100" style={{height:275}}>
                <div className="col-12">
                    {this.props.grouplist.map((cur, i) => {
                        return (
                            <GroupsEntry
                            groupname={cur}
                            key={i+cur}
                            onGroupChange={this.props.onGroupChange}
                            />
                        );
                    })}
                </div>
                <div className="col-12 align-self-end">
                    <div className="row no-gutters ml-1"
                    style={{fontSize:12, fontWeight:"bold"}}>+ 그룹추가</div>
                </div>
            </div>
        );
    }
}

export default Groups;