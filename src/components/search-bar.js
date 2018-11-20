import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTerm: ''
        };
    }

    onInputChange(searchTermValue) {
        this.setState({ searchTerm: searchTermValue });
    }

    handleKeyPress = event => {
        if (event.key === 'Enter' && this.state.searchTerm.length > 0) {
            this.props.onSearchButtonClick(this.state.searchTerm);
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3 search-bar">
                    <div className="input-group">
                        <input
                            className="form-control input-lg"
                            placeholder="Arama kriteri giriniz..."
                            value={this.state.searchTerm}
                            onChange={event => this.onInputChange(event.target.value)}
                            onKeyPress={this.handleKeyPress}
                        />
                        <span className="input-group-btn">
                            <button
                                className="btn btn-info input-lg"
                                onClick={() => this.props.onSearchButtonClick(this.state.searchTerm)}>
                                <i className="glyphicon glyphicon-search" />
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBar;