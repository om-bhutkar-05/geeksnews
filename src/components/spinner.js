import React, { Component } from 'react'
import image from '../assets/spinner.gif'
export default class spinner extends Component {
  render() {
    return (
      <>
      <div className='text-center'>
      <img src={image} alt=""/>
      </div>
      </>
    )
  }
}
