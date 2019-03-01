import React from 'react';
import GroupsEntry from './GroupsEntry';

class Groups extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className="p-2">
                {this.props.grouplist.map((cur, i) => {
                    return (
                        <GroupsEntry groupname={cur} key={i+cur} onGroupChange={this.props.onGroupChange}/>
                    );
                })}
            </div>
        );
    }
}

export default Groups;