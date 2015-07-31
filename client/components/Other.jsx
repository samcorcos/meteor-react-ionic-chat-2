Other = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    if (Meteor.loggingIn()) {
      var messages = null
    } else if (Meteor.user()){
      var allUsers = Meteor.users.find().fetch()
      var currentUser = Meteor.user()
      // This gets us all messages that include the current user
      var messages = MessagesData.find({ participants: { $in: [currentUser.username]}})
    }
    return {
      messages,
      allUsers,
      currentUser
    }
  },
  render() {
    // First we need to check to make sure the data is loaded.
    if (!this.data.messages) {
      var list = null
    } else {
    // If we don't set currentUser and allUsers out here, we
    // will run into a context problem in our map function.
    let currentUser = this.data.currentUser
    let allUsers = this.data.allUsers
      var list = this.data.messages.map((message) => {
        // We are now filtering out the username of the currently
        // logged in user, so we are left with the other username.
        let otherUsername = _.filter(message.participants, function(name) { return name !== currentUser.username})
        // Now we search through all users to get the profile
        // of the user we want.
        let otherUser = _.findWhere(allUsers, { username: otherUsername[0] })
        let chatRoute = "/other/" + message._id
        return (
          <ReactRouter.Link className="item item-avatar" key={message} to={chatRoute} query={{ chatId: message._id }}>
            <img src={otherUser.profile.image} />
            <h2>{otherUser.username}</h2>
            <p>{message.messages[0].content}</p>
          </ReactRouter.Link>
        )
      })
    }
    return (
      <div className="list">
        {this.data.messages ? list : false}
      </div>
    )
  }
});

ChatSubheader = React.createClass({
  render() {
    return (
      <div className="bar bar-subheader">
        <button className="button button-clear button-positive">Edit</button>
        <h2 className="title"></h2>
        <button className="button button-icon icon ion-compose"></button>
      </div>
    )
  }
})

Chat = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    let chat = MessagesData.find(this.props.params.chatId)
    return {
      chat
    }
  },
  render() {
    return (
      <div className="bar bar-footer item-input-inset">
        <label className="item-input-wrapper">
          <input type="text" placeholder="" />
        </label>
        <button className="button button-small">
          Send
        </button>
      </div>
    )
  }
})
