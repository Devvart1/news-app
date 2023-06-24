import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import '../style.css';
import apikey from './apikey';

function APIDATA() {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [datas, setData1] = useState([]);
  const [category, setCategory] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const fetchData = async () => {
    const dataURL =
      `https://gnews.io/api/v4/search?q=example&apikey=${apikey}`;
    const res = await axios.get(dataURL);
    setData(res.data.articles);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showNextHeadline = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const submitSearch = async (e) => {
    e.preventDefault();

    const url = `https://gnews.io/api/v4/search?q=${searchKeyword}&apikey=${apikey}`;

    const response = await axios.get(url);
    setData1(response.data.articles);
  };

  return (
    <div>
      <div className='display-3 card-header  '>
        <h1>News Headlines</h1>
      </div>

      {data.length > 0 && (
        <div className='box'>
          <h3>Title: {data[currentIndex].title}</h3>
          <p>Description: {data[currentIndex].description}</p>
        </div>
      )}

      <button className='btn btn-primary' onClick={showNextHeadline}>
        Next Headline
      </button>
<br/>
<br/>
<div className='bg-danger border-2 border-top border-danger'>

</div>
      <div>
        <p className='display-3 card-header'>Search News Category</p>
        <p className='lead font-weight-bold h2'>Search keyword</p>
 <div className='card-body'>
        <form className='form-inline' onSubmit={submitSearch}>
          <input
            style={{ fontWeight: 'bold' }}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            size='30'
            type='text'
            className='form-control'
            placeholder='Search keyword'
          />

          <input
            type='submit'
            value='Search'
            className='btn btn-secondary btn-sm'
          />
        </form>
      </div>
</div>

      {datas.length > 0 && (
        <div className='search-results '>

          <h2>Search Results</h2>
          <ul className='list-group'>
          {datas.map((article, index) => (
            <div key={index} className='box'>
             <li className='  list-group-item '> <h3>Title: {article.title}</h3>
              <p className='listxx'>Description: {article.description}</p>
              </li>
            </div>
            
          ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default APIDATA;
