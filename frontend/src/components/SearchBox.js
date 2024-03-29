import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function SearchBox(props) {
  const [name, setname] = useState('all');
  const { category = 'all' } = useParams();

  const navigate = useNavigate();

  if (!props.show) {
    return null;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    props.setShow(false);
    navigate(getFilterUrl({ name: name }));
    // console.log(e);
  };

  const getFilterUrl = (filter) => {
    const filterCategory = category;
    const filterName = filter.name || 'all';
    // console.log(
    //   `/search/category/${filterCategory}/name/${filterName}/min/0/max/99999`
    // );
    // setname("");
    return `/search/category/${filterCategory}/name/${filterName}/min/0/max/99999/rating/0/order/newest`;
  };

  return (
    <div className="search-modal " onClick={props.onClose}>
      <div
        className="search-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <form className="search" onSubmit={submitHandler}>
          <div className="row search">
            <span>
              <input
                autoFocus="true"
                type="text"
                name="q"
                id="q"
                placeholder="Type here to Search..."
                onChange={(e) => setname(e.target.value)}
              ></input>
            </span>
            <button className="primary" type="submit">
              <div className="row">
                <i className="fa fa-search" onClick={props.onClose}>
                  {' '}
                  Search
                </i>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchBox;
