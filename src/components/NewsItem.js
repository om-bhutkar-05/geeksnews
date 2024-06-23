import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,desc,Url,newsid}=this.props;
    return (
      <>
      <div className="card my-4" style={{width:"18rem"}}>
  <img src={Url} className="card-img-top" alt='/' />
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{desc}</p>
    <a href={newsid} className="btn btn-primary">Go somewhere</a>
  </div>
</div>
      </>
    )
  }
}

export default NewsItem
