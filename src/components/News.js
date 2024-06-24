import React, { Component } from 'react'
import NewsItem from './NewsItem'
export class News extends Component {
  articles = [
    
  ]
  constructor(){
    super();
    this.state={
      articles:this.articles
    }

  }
  async componentDidMount(){
   let url="https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=0ad1f4f07da0443b8f18d3f6f4b34058"
   let data= await fetch(url)
   let parsedata=await data.json();
   this.setState(this.articles=parsedata)
  }

  render() {
    return (
      <>
        <div className="container my-3">
          <center><h1>GEEKSNEWS</h1></center>
          <div className="row">
      {this.state.articles.map((elements)=>{
        return (
          <div className="col-md-3" key={elements.url}>
          <NewsItem  title={(elements.title)?elements.title.slice(0,45):" "} desc={(elements.description)?elements.description.slice(0,88):""} Url={(elements.urlToImage)} newsid={elements.url} />
        </div>

        )
      })}
           

          </div>
        </div>
      </>
    )
  }
}

export default News
