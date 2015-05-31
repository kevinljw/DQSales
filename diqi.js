_diqi = {'token': null, color: 20, address: null }

function diqiLogin(username, password, callback, errorCallback) {
    var param = {'username': username, 'password': password}
    jQuery.ajax('https://api.diqi.us/api/v0/accounts/token', {
        method: 'POST',
        data: param,
        success: function(data) {
            console.log(data)
            _diqi.token = data.token
            if (callback) callback(data)
        },
        error: errorCallback
    })
}

function diqiCreateAddress(address, callback) {
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
            diqiGetBalance(addr, function(balance) {
                if (_diqi.address == null || _diqi.address.received <= balance.received) {
                    _diqi.address = addr
                    callback(_diqi.address)
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
            if (callback) callback(data.balances.length > 0 ? data.balances[0] : {"balance": 0, "received": 0, "sent": 0})
        }
    })
}
