import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)

    // Use these state variables to save the user comment and store a list of previously added comments
    this.state = {
      comment: '',
      messages: [],
    }
  }

  componentDidMount() {
    this.setState({ comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisee gravida sem sit amet molestie porttitor." })
  }

  handleSubmit = () => {

    var myDate = new Date();

    const {messages} = this.state;

    var myDate = myDate.toLocaleDateString();

    messages.push({
      message_value: this.state.comment,
      message_author: "Jack Smith",
      message_photo: "https://api.adorable.io/avatars/285/avatar_user_3.png",
      message_timestamp: myDate
    })

    this.setState({messages:messages})
    console.log(this.state.comment)
    // Modify this function to handle user submissions and update state
  }

  handleInputChange(e) {
    e.persist()

    var name = e.target.name
    var value = e.target.value
    this.setState((prevState) => {
      return {
        [name]: value,
      }
    })

  }

  render() {
    const {messages} = this.state;

    const messagesTable = messages.map(function (item) {
      return (
        <li className="comment author-comment">

        <div className="info">
          <a href="#">Jack Smith</a>
          <span>{item.message_timestamp}</span>
        </div>

        <a className="avatar" href="#">
          <img src="https://api.adorable.io/avatars/285/avatar_user_3.png" width="35" alt="Profile Avatar" title="Jack Smith" />
        </a>

        <p>{item.message_value}</p>
      

      </li>

      )
    })
    return (
      <div classNameName="App">
        <ul className="comment-section">

          {/* Replace the contents of comment-section with the appended list of user comments */}


          <li className="comment author-comment">

            <div className="info">
              <a href="#">Jack Smith</a>
              <span>1 hour ago</span>
            </div>

            <a className="avatar" href="#">
              <img src="https://api.adorable.io/avatars/285/avatar_user_3.png" width="35" alt="Profile Avatar" title="Jack Smith" />
            </a>

            <p>Random comment goes here</p>

          </li>
{messagesTable}
          <li className="write-new">

            <form>

              <textarea placeholder="Write your comment here" name="comment" onChange={evt => this.handleInputChange(evt)}></textarea>

              <div>
                <img src="https://api.adorable.io/avatars/285/avatar_user_4.png" width="35" alt="Profile of Bradley Jones" title="Bradley Jones" />
                <button type="button" onClick={this.handleSubmit}>Submit</button>
              </div>

            </form>

          </li>

        </ul>

        <footer>
          <a href="http://tutorialzine.com/2015/11/using-flexbox-to-create-a-responsive-comment-section/">Inspired by this tutorial</a>
        </footer>
      </div>
    );
  }
}

export default App;
