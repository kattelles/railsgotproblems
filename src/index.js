import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import IssuesList from './IssuesList'
import IssueDetails from './IssueDetails'

document.addEventListener('DOMContentLoaded', function() {
  console.log('Hi folks from Twitter. Please pardon any errors. :)');
  let root = document.getElementById('root');
  ReactDOM.render(
    <Router history={browserHistory}>
      <Route path='/' component={IssuesList}>
        <IndexRoute component={IssuesList}/>
      </Route>
      <Route path='/issue/:number' component={IssueDetails}/>
    </Router>,
    root);
});
