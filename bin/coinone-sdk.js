const ENDPOINT = {
  'production': 'https://api.coinone.co.kr',
  'staging': 'https://api.coinone.co.kr',
  'development': 'https://api.coinone.co.kr',
}[process.env.NODE_ENV] || 'https://api.coinone.co.kr'

const request = require('request-promise')
const crypto = require('crypto')

class Coinone {
  constructor(config) {
    this.endpoint = ENDPOINT
    this.config = config
    this.secret_key_uppercase = String(this.config.secret_key).toUpperCase()
    this.request = request.defaults({
      timeout: 5000,
      json: true,
    })
  }

  _validate(key, value) {
    // TODO: validate currency = BTC, ETH ...
    return true
  }

  _payload(payload = {}) {
    payload.access_token = this.config.access_token
    payload.nonce = Date.now()

    const encoded = new Buffer(JSON.stringify(payload)).toString('base64')
    const signature = crypto
      .createHmac('sha512', this.secret_key_uppercase)
      .update(encoded).digest('hex')

    return {
      encoded,
      signature,
    }
  }

  async orderbook(opt) {
    const {currency} = opt

    this._validate('currency', currency)

    return this.request({
      url: this.endpoint + '/orderbook',
      qs: opt,
    })
  }
  
  async my_complete_orders(opt) {
    const payload = this._payload(opt)
    
    return this.request({
      url: this.endpoint + '/v2/order/complete_orders',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-COINONE-PAYLOAD': payload.encoded,
        'X-COINONE-SIGNATURE': payload.signature,
      },
      body: payload.encoded,
    })
  }
  
  async user_information(opt) {
    const payload = this._payload(opt)
    
    return this.request({
      url: this.endpoint + '/v2/account/user_info',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-COINONE-PAYLOAD': payload.encoded,
        'X-COINONE-SIGNATURE': payload.signature,
      },
      body: payload.encoded,
    })
  }
  
  async limit_buy(opt) {
    const payload = this._payload(opt)
    
    return this.request({
      url: this.endpoint + '/v2/order/limit_buy',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-COINONE-PAYLOAD': payload.encoded,
        'X-COINONE-SIGNATURE': payload.signature,
      },
      body: payload.encoded,
    })
  }

  get_message_from_code(code) {
    return require('./coinone-sdk-codes')[code] || '미지정 오류'
  }
}
module.exports = Coinone;