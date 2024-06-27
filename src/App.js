import NavBar from './components/Navbar'

import React, { Component } from 'react'
import News from './components/News'
import Spinner from './components/spinner'

export default class App extends Component {
  render() {
    return (
      <>
      <NavBar/>
      <News pageSize={2}/>
      </>
    )
  }
}
