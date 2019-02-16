import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)

    // Use these state variables to save the user comment and store a list of previously added comments
    this.state = {
      comment: '',
      author: 'Sha',
      image: "https://api.adorable.io/avatars/285/avatar_user_4.png",
      messages: [],
    }
  }

  componentDidMount() {
    this.setState({ comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisee gravida sem sit amet molestie porttitor." })
  }

  handleSubmit = () => {

    var date = new Date()

    var messagetime = date.toLocaleString()

    console.log(this.state.comment)
    console.log(this.state.author)

    const {messages} = this.state

    messages.push({
      messages_value: this.state.comment,
      messages_author: this.state.author,
      messages_image: this.state.image,
      messages_time: messagetime
    });

    this.setState({messages:messages})

    //var input = document.getElementById("comment").value;
    //console.log(input)

    //var inputNode = document.createElement("p");
    //inputNode.innerHTML = input 

    //input.appendChild(inputNode)


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

    const {messages} = this.state

    const messageTable = messages.map(function (value){

        return(
      <li className="comment user-comment">

            <div className="info">
              <a href="#">{value.messages_author}</a>
              <span>{value.messages_time}</span>
            </div>

            <a className="avatar" href="#">
              <img src={value.messages_image} width="35"/>
            </a>

            <p>{value.messages_value}</p>

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
{messageTable}
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
