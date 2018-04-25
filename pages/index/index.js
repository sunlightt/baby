
const app = getApp();
function fill_date(str) {


    return Number(str) < 10 ? '0' + str : str;

}

function get_unix_time(dateStr) {
    var newstr = dateStr.replace(/-/g, '/');
    var date = new Date(newstr);
    var time_str = date.getTime().toString();
    return time_str.substr(0, 10);
}

Page({
    data: {
        pickerValue: 0,
        pickerRange: ['爸爸', '妈妈', '爷爷', '奶奶', '姥姥', '姥爷'],
        date: '',
        birth_date: null,

        sex_index: 0,
        sex_arr: ['男', '女'],

        loading_status: true,

        show_tip_msg: '',
        showToast: false

    },
    onLoad: function (e) {

        var that = this;
        var date = new Date();
        var timestamp = parseInt(Date.parse(new Date()) / 1000);

        that.setData({
            date: date.getFullYear() + '-' + fill_date((date.getMonth() + 1)) + '-' + fill_date(date.getDate()),
            birth_date: timestamp
        });

        wx.showLoading({
            title: '加载中',
        });

        wx.login({
            success: function (res) {
                if (res.code) {
                    wx.request({
                        //获取openid接口  
                        url: app.globalData.url + 'index.php/api/Api/get_openid_api',
                        header: {
                            'Content-Type': 'application/json'
                        },
                        data: {
                            code: res.code
                        },
                        method: 'GET',
                        success: function (response) {

                            wx.hideLoading();

                            if (response.data.status == 200) {

                                if (response.data.data.is_tj == 1) {

                                    wx.reLaunch({
                                        url: '/pages/loading/index'
                                    });

                                    wx.setStorageSync('login_status', true);

                                } else {

                                    that.setData({

                                        loading_status: false

                                    });
                                }

                            } else {
                                wx.showToast({
                                    title: '获取用户信息失败',
                                    icon: 'loading',
                                    duration: 1000
                                })
                                return;
                            }
                        },
                        fail: function (res) {

                            wx.showToast({
                                title: '获取用户信息失败',
                                icon: 'loading',
                                duration: 1000
                            });

                            return;

                        }
                    })

                } else {
                    console.log('获取用户登录态失败！' + res.errMsg);
                }

            }
        });
    },
    normalPickerBindchange: function (e) {
        this.setData({
            pickerValue: e.detail.value
        })
    },
    skip: function (e) {

        wx.reLaunch({
            url: '/pages/index/index'
        });

        // wx.setStorageSync('login_status', true);
    },
    bindDateChange: function (e) {

        console.log(e);

        var date = e.detail.value;

        var start_time = date + ' ' + '00' + ':' + '00' + ':' + '00';

        var birth_date = get_unix_time(start_time);

        this.setData({

            date: date,
            birth_date: birth_date
        })

    },
    sub_baby_inf: function (e) {

        var that = this;
        var name = e.detail.value.name;
        var gender = Number(that.data.sex_index) + 1;
        var filiation = Number(that.data.pickerValue) + 1;

        var timestamp = parseInt(Date.parse(new Date()) / 1000);

        if (!name || name == '') {

            wx.showToast({
                title: '请填写宝宝昵称',
                icon: 'loading',
                duration: 1000
            });

            return;

        } else if (!gender || gender == '') {

            wx.showToast({
                title: '请填写宝宝性别',
                icon: 'loading',
                duration: 1000
            });

            return;

        } else if (!filiation || filiation == '') {

            wx.showToast({
                title: '选择与宝宝关系',
                icon: 'loading',
                duration: 1000
            });

            return;

        } else if (that.data.birth_date > timestamp) {

            that.setData({

                show_tip_msg: '宝宝生日不能超过当前时间',
                showToast: true

            });

            setTimeout(function () {

                that.setData({

                    showToast: false

                });

            }, 1000);


            return;

        }

        wx.request({
            url: app.globalData.url + 'index.php/api/Index/info_add',
            data: {
                uid: wx.getStorageSync('uid'),
                nickname: name,
                sex: gender,
                birth: that.data.birth_date,
                relationship: filiation
            },
            success: function (res) {

                if (res.data.status == 200) {

                    wx.showToast({
                        title: '提交成功',
                        icon: 'loading',
                        duration: 1000
                    });

                    setTimeout(function () {

                        wx.reLaunch({
                            url: '/pages/index/index'
                        });

                    }, 1000);


                } else {

                    wx.showToast({
                        title: '提交失败',
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