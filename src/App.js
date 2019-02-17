import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

import { setInterval } from 'timers';

// Import contract
import TutorialToken from "./contracts/TutorialToken.json";


class App extends Component {

  constructor(props) {
    super(props)

    // Use these state variables to save the user comment and store a list of previously added comments
    this.state = {
      comment: '',
      messages: [],
      count: 0,
      account: null,
      web3: null,
      errorMsg: '',
      transferForm: {
        amount: 0,
        address: ''
      },
      user: {
        name : "Joel Moore",
        photo : "https://api.adorable.io/avatars/285/avatar_user_4.png",
      }
    }
  }

  componentDidMount = async () => {

    setInterval(async () => {

      try {
        //Does the browser provide access to web3? (this is provided via Metamask in my case)
        if (typeof window.web3 !== undefined) {
          //Access Metamask wallet and information
          const web3 = new Web3(Web3.givenProvider)

          const accounts = await web3.eth.getAccounts() //account[0] is default

          if (accounts.length < 1) {
            // console.log('Could not connect to Metamask. Please unlock your metamask')
            this.setState({ errorMsg: 'Could not connect to Metamask. Please unlock your metamask' })
          } else {

            this.setState({ account: accounts[0] })
            this.initContract(web3)
          }

        } else {
          // console.log('web3 not detected')
          this.setState({ errorMsg: 'web3 not detected' })
        }
      } catch (error) {
        this.setState({ errorMsg: 'Could not detect web3' })
      }

    }, 1000)


  }

  initContract = async (web3) => {

    //Get logged in MetaMask ETH address
    const accounts = await web3.eth.getAccounts()
    //Instantiate the polyToken smart contract
    //***TODO: Grab deployed contract address from commandline */
    const tutorialInstance = new web3.eth.Contract(TutorialToken.abi, '0x7aa77209196c6ea244c36c0351d448110a39e07d')

    console.log(tutorialInstance)
    //We use web3.utils.fromWei to display the units of the balance from wei to ether
    this.setState({ contractInstance: tutorialInstance })
    this.setState({web3})
  }

  handleSubmit = () => {
    console.log(this.state.comment)
    // Modify this function to handle user submissions and update state
    let msges = this.state.messages;
    let commentText = this.state.comment;
    let commentDate = new Date();
    
    msges.push({
      name : this.state.user.name,
      content : commentText,
      date : commentDate.toLocaleString(),
      photo : this.state.user.photo,
    })

    this.setState({messages : msges })

   
  }

  handleTransfer = (e)=>{
    e.preventDefault()
    const {account,balance, errorMsg, transferForm, contractInstance, decimals, web3} = this.state

    if(transferForm.account < 1){
      return
    }

    this.setState({transferForm:{
      amount: 10,
      address:'0x1Ac1341B1b23be518dE153c3F97e5a3440D0acC5'
    },})
    // console.log(transferForm)
    // console.log(contractInstance)

    contractInstance.methods.transfer(transferForm.address, web3.utils.toWei(transferForm.amount.toString(), 'ether')).send({ from: account, gas: 1000000 })
      .then((result) => {

        console.log(result)

      

      })

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

  displayMsg() {
   
  }

  render() {
    const {messages} = this.state;
    const messagesList = messages.map((item) =>
      
       <li className="comment user-comment">

       <div className="info">
         <a href="#">{item.name}</a>
         <span>{item.date}</span>
       </div>

       <a className="avatar" href="#">
         <img src= {item.photo} width="35" alt="Profile Avatar" title="Jack Smith" />
       </a>

       <p>{item.content}</p>
       <button className="donate" onClick={(e) => this.handleTransfer(e)}>Donate</button>
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
      
         {messagesList}          
          

          <li className="write-new">

            <form>

              <textarea placeholder="Write your comment here" name="comment" onChange={evt => this.handleInputChange(evt)} value={this.state.comment}></textarea>

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
