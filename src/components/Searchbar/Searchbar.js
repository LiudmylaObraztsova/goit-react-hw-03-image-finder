import React, { Component } from 'react';
import style from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    query: '',
  };

  seachImagesByTags = imgTags => {
    this.setState({ query: imgTags.currentTarget.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <header className={style.searchbar}>
        <form className={style.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={style.searchFormButton}>
            <span className={style.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={style.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={query}
            onChange={this.seachImagesByTags}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;