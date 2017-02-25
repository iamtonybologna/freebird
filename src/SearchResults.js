class Users extends Component {
  constructor(props) {
  this.state = {
    view: 'noResults'
  }
}

  this.renderView = () => {
    switch(this.state.view) {

      case 'searchResults'
      return <SearchResults />
      case 'search'
      return <Search />
      case 'userVoteList'
      return <UserVoteList />
      case 'welcome'
      return <Welcome />
      default
    }
  }


  render() {
    return (
        { this.renderView() }
    )
  }

}
