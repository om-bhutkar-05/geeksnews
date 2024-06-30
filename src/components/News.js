import React, { Component } from 'react';
import NewsItem from './NewsItem';
import defaultImage from '../assets/default.png';
import Spinner from './spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor(props) {
    super(props);
    document.title = `${props.category}-GeeksNews`;
    this.state = {
      articles: [],
      page: 1,
      totalResults: 0,
      loading: false
    };
  }

  async componentDidMount() {
    this.updateNews();
  }

  async updateNews() {
    this.props.setProgress(10)
    const { country, category, pageSize } = this.props;
    const { page } = this.state;
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${this.props.api_key}&page=${page}&pageSize=${pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    }
  );
  this.props.setProgress(100)
  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 }, async () => {
      const { country, category, pageSize } = this.props;
      const { page, articles } = this.state;
      let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${this.props.api_key}&page=${page}&pageSize=${pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults
      });
    });
  }

  render() {
    return (
      <>
        <div className="container my-3">
          {this.state.loading && <Spinner></Spinner>}
          <center><h1>GEEKSNEWS - {'TOP ' + this.props.category.toUpperCase() + ' HEADLINES'}</h1></center>
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="row">
              {this.state.articles.map((element, index) => {
                return (
                  <div className="col-md-3" key={element.url || index}>
                    <NewsItem
                      title={element.title ? element.title : " "}
                      desc={element.description ? element.description : ""}
                      Url={element.urlToImage ? element.urlToImage : defaultImage}
                      newsid={element.url}
                      author={element.author ? element.author : "UNKNOWN"}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
      </>
    );
  }
}

export default News;
