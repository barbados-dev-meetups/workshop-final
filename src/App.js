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
      user: {
        name: "Deku Bakugo",
        photo: "https://api.adorable.io/avatars/285/avatar_user_3.png"
      }
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.setState({ comment: ""})
  }

  handleSubmit = () => {
    //alert(this.state.comment);
   // this.setState({messages: this.state.messages.concat(this.state.comment)})
    let comment_messages = this.state.messages;
    let submission_comment = this.state.comment;
    const submission_date = new Date();

    comment_messages.push({
      name: this.state.user.name,
      content : submission_comment,
     //date : submission_date.getHours()+" : "+ submission_date.getMinutes()+" : "+ submission_date.getSeconds(),
      date: submission_date.toLocaleString(),
      photo: this.state.user.photo
    })

    this.setState({messages : comment_messages})
    console.log(this.state.comment)
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
    const messageList = messages.map((item) =>
  

    //List mapping for comment submission
    <li className="comment author-comment">
    <div className="info">
      <a href="#">{item.name}</a>
      <span>{item.date}</span>
    </div>

    <a className="avatar" href="#">
      <img src={item.photo} width="35" alt="Profile Avatar" title="Jack Smith" />
    </a>

    <p>{item.content}</p>
  </li>

    )
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
         
            {messageList}

         
          <li className="write-new">
            <form>

              <textarea placeholder="Write your comment here" name="comment" value={this.state.comment} onChange={this.handleInputChange}></textarea>

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
