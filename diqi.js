    _diqi = {'token': null, color: 20 }

    function diqiLogin(username, password, callback) {
        var param = {'username': username, 'password': password}
        jQuery.ajax('https://api.diqi.us/api/v0/accounts/token', {
            method: 'POST',
            data: param,
            success: function(data) {
                console.log(data)
                _diqi.token = data.token
                if (callback) callback(data)
            }
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

    function diqiGetBalance(address, callback) {
        jQuery.ajax('https://api.diqi.us/api/v0/analytics/addresses/'+address+'/color/'+_diqi.color, {
            method: 'GET',
            success: function(data) {
                console.log(data)
                if (callback) callback(data.balances.length > 0 ? data.balances[0] : {"balance": 0})
            }
        })
    }