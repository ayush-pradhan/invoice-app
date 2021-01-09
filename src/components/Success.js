import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton'


export class Confirm extends Component {
    continue = e => {
        e.preventDefault();
        // Process form : Sewnd data to api
        this.props.nextStep();
    }
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    url = e => {
        e.preventDefault();

    }
    render() {

        return (
           
            <MuiThemeProvider>
                <React.Fragment>
                    <AppBar style={{background: "#333"}}title="Success"/>
                    <h1>Thank You for your submission</h1>
                    <RaisedButton
                        href="/Invoice"
                        label="Dashboard"
                        primary={true}
                        style={styles.button}
                    />
                    <RaisedButton
                        label="Back"
                        primary={false}
                        style={styles.button}
                        onClick={this.back}
                    />
                </React.Fragment>
            </MuiThemeProvider>
            
        )
    }
}

const styles = {
    button: {
        margin: 15
    }
}
export default Confirm;
