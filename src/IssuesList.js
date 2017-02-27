import React, { Component } from 'react'
import Parse from 'parse-link-header'
import Issue from './Issue'
import Loader from 'react-loader'

class IssuesList extends Component {
  constructor() {
    super();
    this.state = {
      issues: [],
      headers: {},
      lastPageReached: false,
      loaded: false
    };

    this.getMoreResults = this.getMoreResults.bind(this);
    this.makeApiCall = this.makeApiCall.bind(this);
  }

  componentDidMount() {
    // initial api call
    this.makeApiCall(`https://api.github.com/repos/rails/rails/issues?&per_page=25&page=1`);
  }

  makeApiCall(url) {
    fetch(url)
      .then(response => {
        let headers = response.headers.get('Link');
        let parsedHeaders = Parse(headers);
        this.setState({headers: parsedHeaders});
        return response.json();
      }).then(results =>  {
        this.setState({
          issues: this.state.issues.concat(results),
          loaded: true
        });
      });
  }

  getMoreResults() {
    let lastPage = this.state.headers.last;
    let nextPage = this.state.headers.next;
    if (nextPage.page === lastPage.page ) {
      this.setState({lastPageReached: true});
    }
    this.makeApiCall(nextPage.url);
  };

  render() {
    let issues = this.state.issues.map(issue => {
      return (<Issue key={issue.id} issue={issue}/>);
    });

    let getMoreResults = '';
    if (this.state.lastPageReached) {
      getMoreResults =
        (<img
          alt='party-parrot'
          className='party-parrot'
          src={require('./../public/img/parrot.gif')}/>);
    } else {
      getMoreResults = (
        <div
          className='show-more-results button'
          onClick={this.getMoreResults}>
          Show more results
        </div>);
    }

    return (
      <Loader className='app' color='#ff3b3f' loaded={this.state.loaded}>
        {issues}
        {getMoreResults}
      </Loader>
    );
  }
}

export default IssuesList;
