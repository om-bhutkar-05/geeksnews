import React, { Component } from 'react';
import NewsItem from './NewsItem';
import defaultImage from '../assets/default.png';
import Spinner from './spinner'
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps={
    country:"in",
    pageSize:8,
    category:"general"
  }
  static propTypes={
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      page: 1,
      totalResults: 0,
      loading:false
    };
  }

  async componentDidMount() {
  
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0ad1f4f07da0443b8f18d3f6f4b34058&page=1&pagesize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({ articles: parsedata.articles, totalResults: parsedata.totalResults ,loading:false});
  }

  handlenext = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) return;
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0ad1f4f07da0443b8f18d3f6f4b34058&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: parsedata.articles,
      loading:false
    });
  }

  handleprev = async () => {
    if (this.state.page <= 1) return;
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0ad1f4f07da0443b8f18d3f6f4b34058&page=${this.state.page - 1}&${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedata.articles,
      loading:false
    });
  }

  render() {
    return (
      <>
        <div className="container my-3">
          <center><h1>GEEKSNEWS</h1></center>
           {this.state.loading && <Spinner/>}
          <div className="row">
            {this.state.articles.map((elements, index) => {
              return (
                <div className="col-md-3" key={elements.url || index}>
                  <NewsItem 
                    title={elements.title ? elements.title : " "} 
                    desc={elements.description ? elements.description : ""} 
                    Url={elements.urlToImage ? elements.urlToImage : defaultImage} 
                    newsid={elements.url} 
                    author={elements.author?elements.author:"UNKNOWN"}
                    date={elements.publishedAt}
                    source={elements.source.name}
                  />
                </div>
              );
            })}
            <div className='d-flex justify-content-between container'>
              <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handleprev}>&larr; previous</button>
              <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handlenext}>next &rarr;</button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default News;
