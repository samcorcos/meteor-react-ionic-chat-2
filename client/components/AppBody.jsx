AppBody = React.createClass({
  render() {
    let subheader = window.location.pathname == "/other" ? "has-subheader" : ""
    let classes = "content overflow-scroll has-header "+ subheader
    return (
      <div className="ionic-body">
        <div className="bar bar-header bar-light">
          <ReactRouter.Link className="button button-icon icon ion-gear-a" to={"/settings"}></ReactRouter.Link>
          <ReactRouter.Link className="h1 title" to={"/"}>App Name</ReactRouter.Link>
          <ReactRouter.Link className="button button-icon icon ion-heart" to={"/other"}></ReactRouter.Link>
        </div>

        {window.location.pathname == "/other" ? <ChatSubheader /> : false}

        <div className="view">
          <div className="scroll-content ionic-scroll">
            <div className={classes}>
              <ReactRouter.RouteHandler />
            </div>
          </div>
        </div>
      </div>
    )
  }
})
