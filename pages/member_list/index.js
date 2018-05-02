
const app = getApp();

Page({

    data: {

        member_list_data: []

    },

    onLoad: function (options) {

        var that=this;

        that.get_member_list_data();

    },
    get_member_list_data:function(e){

        var that=this;
      
        wx.request({
            url: app.globalData.url + 'index.php/api/User/service_lst',
            success: function (res) {

                if (res.data.status == 200) {

                    that.setData({

                        member_list_data:res.data.data

                    });

                } else {

                    wx.showToast({
                        title: '获取数据失败',
                        icon: 'loading',
                        duration: 1000
                    });

                }
            },
            fail: function (res) {

                wx.showToast({
                    title: '请求失败',
                    icon: 'loading',
                    duration: 1000
                });
            }
        });

    },
    go_pay:function(e){

        var that=this;

        wx.request({
            url: app.globalData.url +'index.php/api/Pay/goto_pay',
            data:{
                uid:wx.getStorageSync('uid'),
                data_id:e.currentTarget.dataset.id,
                openid: wx.getStorageSync('openid'),
                price:e.currentTarget.dataset.price
            },
            success: function (reponse){

                if (reponse.data.status==200){

                    var appId = reponse.data.data.appId;
                    var nonceStr = reponse.data.data.nonceStr;
                    var package1 = reponse.data.data.package;
                    var paySign = reponse.data.data.paySign;
                    var signType = reponse.data.data.signType;
                    var timeStamp = reponse.data.data.timeStamp;

                    wx.requestPayment({

                        'nonceStr': nonceStr,
                        'package': package1,
                        'signType': signType,
                        'timeStamp': timeStamp,
                        'paySign': paySign,
                        'success': function (res) {

                            wx.showToast({ title: '支付成功', icon: 'success', duration: 2000 });

                        },
                        'fail': function (res) {

                            wx.showToast({ title: '支付失败', icon: 'loading', duration: 2000 });

                        }
                    })

                }else{

                    wx.showToast({
                        title: '获取数据失败',
                        icon: 'loading',
                        duration: 1000
                    });
                }
            },
            fail: function (res) {

                wx.showToast({
                    title: '请求失败',
                    icon: 'loading',
                    duration: 1000
                });
            }
        })
          

    }

})