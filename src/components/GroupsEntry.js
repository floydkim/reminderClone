import React from 'react';

class GroupsEntry extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {

        return (
            <div style={{cursor: "pointer", margin: 2, color: "#555", fontSize: 14}}
            className="col-12 m-1 p-0 font-weight-bold"
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