import React from 'react';

class GroupsEntry extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {

        return (
            <div style={{cursor: "pointer", margin: 2, color: "#555", fontSize: 14}}
            className="font-weight-bold"
            onClick={(e)=>{
                console.log("CLICKED GROUP: ", e.target.innerHTML);
                this.props.onGroupChange(e.target.innerHTML);
            }}
            >
            {this.props.groupname}
            </div>
        )
    }
}

export default GroupsEntry;