import React, { Component } from 'react'
import styles from './Invoice.module.scss'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import LineItems from './LineItems'
import AppBar from 'material-ui/AppBar';
import Mountains from '../../videos/mountains.mp4';

// import { v4 as uuidv4 } from 'uuid';

class Invoice extends Component {
  
  locale = 'en-US'
  currency = 'USD'

  state = {
    taxRate: 0.00,
    lineItems: [
      {
        id: 'initial',      // react-beautiful-dnd unique key
        name: '',
        description: '',
        quantity: 0,
        price: 0.00,
      },
    ]
  }

  handleInvoiceChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleLineItemChange = (elementIndex) => (event) => {
    let lineItems = this.state.lineItems.map((item, i) => {
      if (elementIndex !== i) return item
      return {...item, [event.target.name]: event.target.value}
    })
    this.setState({lineItems})
  }

  handleAddLineItem = (event) => {
    this.setState({
      // use optimistic uuid for drag drop; in a production app this could be a database id
      lineItems: this.state.lineItems.concat(
        [{ id: '', name: '', description: '', quantity: 0, price: 0.00 }]
      )
    })
  }

  handleRemoveLineItem = (elementIndex) => (event) => {
    this.setState({
      lineItems: this.state.lineItems.filter((item, i) => {
        return elementIndex !== i
      })
    })
  }

  handleReorderLineItems = (newLineItems) => {
    this.setState({
      lineItems: newLineItems,
    })
  }

  handleFocusSelect = (event) => {
    event.target.select()
  }

  handlePayButtonClick = () => {
    alert('Not implemented')
  }

  formatCurrency = (amount) => {
    return (new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: this.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount))
  }

  calcTaxAmount = (c) => {
    return c * (this.state.taxRate / 100)
  }

  calcLineItemsTotal = () => {
    return this.state.lineItems.reduce((prev, cur) => (prev + (cur.quantity * cur.price)), 0)
  }

  calcTaxTotal = () => {
    return this.calcLineItemsTotal() * (this.state.taxRate / 100)
  }

  calcGrandTotal = () => {
    return this.calcLineItemsTotal() + this.calcTaxTotal()
  }

  render = () => {
    return (
      <MuiThemeProvider>
      <React.Fragment>
       <AppBar style={{background: "#333"}}title="INVOICE"/>
       <video autoPlay loop muted
      style={{
        position: "absolute",
        width: "100%",
        left: "50%",
        top: "50%",
        height: "190%",
        objectFit: "cover",
        transform: "translate(-50%, -50%)",
        zIndex: "-1"
      }}
      >
        <source src={Mountains} type="video/mp4"/>
      </video>
      <div className={styles.invoice}>
        <div className={styles.brand}>
          <img src="https://via.placeholder.com/150x50.png?text=logo" alt="Logo" className={styles.logo} />
        </div>
        <div className={styles.addresses}>
          <div className={styles.from}>
            <strong>AYUSH PRADHAN</strong><br />
              123 Residency Road<br />
              Jammu, J&K, India &nbsp;A1B2C3<br />
              416-555-1234
          </div>
          <div>
            <div className={`${styles.valueTable} ${styles.to}`}>
              <div className={styles.row}>
                <div className={styles.label}>Customer #</div>
                <div className={styles.value}>123456</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Invoice #</div>
                <div className={styles.value}>123456</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Date</div>
                <div className={`${styles.value} ${styles.date}`}>2019-01-01</div>
              </div>
            </div>
          </div>
        </div>
        <h2>Invoice</h2>

          <LineItems
            items={this.state.lineItems}
            currencyFormatter={this.formatCurrency}
            addHandler={this.handleAddLineItem}
            changeHandler={this.handleLineItemChange}
            focusHandler={this.handleFocusSelect}
            deleteHandler={this.handleRemoveLineItem}
            reorderHandler={this.handleReorderLineItems}
          />

        <div className={styles.totalContainer}>
          <form>
            <div className={styles.valueTable}>
              <div className={styles.row}>
                <div className={styles.label}>Tax Rate (%)</div>
                <div className={styles.value}><input name="taxRate" type="number" step="0.01" value={this.state.taxRate} onChange={this.handleInvoiceChange} onFocus={this.handleFocusSelect} /></div>
              </div>
            </div>
          </form>
          <form>
            <div className={styles.valueTable}>
              <div className={styles.row}>
                <div className={styles.label}>Subtotal</div>
                <div className={`${styles.value} ${styles.currency}`}>{this.formatCurrency(this.calcLineItemsTotal())}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Tax ({this.state.taxRate}%)</div>
                <div className={`${styles.value} ${styles.currency}`}>{this.formatCurrency(this.calcTaxTotal())}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Total Due</div>
                <div className={`${styles.value} ${styles.currency}`}>{this.formatCurrency(this.calcGrandTotal())}</div>
              </div>
            </div>
          </form>
        </div>

        <div className={styles.pay}>
          <button className={styles.payNow} onClick={this.handlePayButtonClick}>Pay Now</button>
        </div>

        <div className={styles.footer}>
          <div className={styles.comments}>
            <h4>Notes</h4>
            <p>Made By Ayush Pradhan</p>
            <p>Contact me at <a target="_blank" href="https://www.linkedin.com/in/ayu-sh/">LinkedIn</a> </p>
            <p>Find the <a href="https://github.com/ayush-pradhan/invoice-app">code on Github</a>.</p>
          </div>
          <div className={styles.closing}>
            {/* <div>Thank-you for your business</div> */}
          </div>
        </div>

      </div>
      </React.Fragment>
      </MuiThemeProvider>
    )
  }

}

export default Invoice
