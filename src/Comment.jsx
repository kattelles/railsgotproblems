import React, { Component } from 'react'
import Markdown from 'react-markdown'
import { AddLinkstoAtSymbols } from './utils/utils'

class Comment extends Component {
  constructor() {
    super();
    this.state = {
      userUrl: '',
      userName: '',
      userAvatar: '',
      body: ''
    };
  }

  componentDidMount() {
    let comment = this.props;
    let body = AddLinkstoAtSymbols(comment.body);
    this.setState({
      userUrl: comment.userUrl,
      userName: comment.userName,
      userAvatar: comment.userAvatar,
      body: body
    });
  }

  render() {
    return (
      <div className='comment'>
        <div className='avatar'>
          <a href={this.state.userUrl} target='_blank'>
            <img alt='avatar' src={this.state.userAvatar}/>
          </a>
          <a href={this.state.userUrl} target='_blank'>
            @{this.state.userName}
          </a>
        </div>
        <Markdown className='markdown comment-body' source={this.state.body}/>
      </div>
    );
  }
}

export default Comment;
