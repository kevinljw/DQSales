_diqi = {'token': null, color: 20, address: null, balance: null }

function diqiLogin(username, password, callback, errorCallback) {
    var param = {'username': username, 'password': password}
    jQuery.ajax('https://api.diqi.us/api/v0/accounts/token', {
        method: 'POST',
        data: param,
        success: function(data) {
            console.log(data)
            _diqi.token = data.token

            diqiGetPrimaryAddress()
            if (callback) callback(data)
        },
        error: errorCallback
    })
}

function diqiCreateAddress(callback) {
    jQuery.ajax('https://api.diqi.us/api/v0/accounts/addresses', {
        method: 'POST',
        headers: {
            'Authorization': ('Token '+_diqi.token)
        },
        success: function(data) {
            console.log(data)
            if (callback) callback(data)
        }
    })
}

function diqiGetAddresses(callback) {
    jQuery.ajax('https://api.diqi.us/api/v0/accounts/addresses', {
        method: 'GET',
        headers: {
            'Authorization': ('Token '+_diqi.token)
        },
        success: function(data) {
            console.log(data)
            if (callback) callback(data.addresses)
        }
    })
}

function diqiGetPrimaryAddress(callback) {
    diqiGetAddresses(function(addresses) {
        for (i = 0; i<addresses.length; i++) {
            var addr = addresses[i]
            console.log(addr)
            diqiGetBalance(addr, function(addr, balance) {
                if (_diqi.address == null || balance.received > _diqi.balance.received) {
                    _diqi.address = addr
                    _diqi.balance = balance
                    if (callback) callback(addr, balance)
                }
            })
        }
    })
}

function diqiGetBalance(address, callback) {
    jQuery.ajax('https://api.diqi.us/api/v0/analytics/addresses/'+address+'/color/'+_diqi.color, {
        method: 'GET',
        success: function(data) {
            console.log(data)
            if (callback) callback(address, data.balances.length > 0 ? data.balances[0] : {"balance": 0, "received": 0, "sent": 0})
        }
    })
}

function diqiGetPrimaryBalance(callback) {
    diqiGetBalance(_diqi.address, callback)
}

function diqiPay(to_address, amount, callback, errorCallback) {
    var param = {'from_address': _diqi.address, 'to_address': to_address, 'color_id': _diqi.color, 'amount': amount}
    jQuery.ajax('https://api.diqi.us/api/v0/payments', {
        method: 'POST',
        headers: {
            'Authorization': ('Token '+_diqi.token)
        },
        data: param,
        success: function(data) {
            console.log(data)
            if (callback) callback(data)
        },
        error: errorCallback
    })
}
