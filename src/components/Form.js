import React, { Component } from "react";

class Form extends Component {
    state = {
        start: null,
        end: null,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.start != null && this.state.end != null) {
            this.props.handleTime(this.state);
        } else {
            alert("The time must not be null");
        }
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    render() {
        return this.props.loading ? null : (
            <div>
                <form action="" id="form" onSubmit={this.handleSubmit}>
                    <div className="form-item mb-3">
                        <label htmlFor="start">Start</label>
                        <input
                            type="date"
                            id="start"
                            className="form-control"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-item mb-3">
                        <label htmlFor="end">End</label>
                        <input
                            type="date"
                            id="end"
                            className="form-control"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-item">
                        <button className="btn btn-primary" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Form;
