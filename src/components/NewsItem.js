import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,desc,Url,newsid,author,date,source}=this.props;
    return (
      <>
      <div className="card my-4" style={{width:"18rem"}}>
      <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'95%',zIndex:'1'}}>
    {source}
  </span>

  <img src={Url}  className="card-img-top" alt="" />
  <div className="card-body">
  <h6> <span class="badge text-bg-secondary">New</span></h6>
    <h5 className="card-title">{title}....</h5>
    <p className="card-text">{desc}....</p>
    <p className='card-text'><small className='text-muted'>By {author} on {new Date(date).toGMTString()}</small></p>
    <a href={newsid}  rel="noreferrer" target="_blank" className="btn btn-primary">open news</a>
  </div>
</div>
      </>
    )
  }
}

export default NewsItem
