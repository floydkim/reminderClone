import React from 'react';

const Search = (props) => (
    <input type="text" className="form-control" placeholder="검색" id="input-search"
    onChange={e => {
        props.onSearch(e.target.value);
    }}
    onBlur={e => {
        e.target.value = null;
        props.onSearch(null);
    }}
    ></input>
);

export default Search;