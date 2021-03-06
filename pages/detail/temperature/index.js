
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
        // text:"这是一个页面"
        pickerValue: 0,
        dbValue: 0,
        pickerRange: ['母乳', '奶粉', '小米粥', '玉米糊'],
        dbRange: ["正常", "不正常"],
        timeValue: '12:20',
        dateValue: '2018-4-17',

        multiArray: [['36', '37', '38', '39', '40', '41', '42'], ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']],
        multiIndex: [0, 0],

        show_tip_msg: '',
        showToast: false
    },
    onLoad: function (e) {

        var date = new Date();
        var that = this;
        var date = new Date();

        console.log(date.getMinutes());

        that.setData({

            pickerValue: 0,
            timeValue: date.getHours() + ':' + fill_date(date.getMinutes()),
            dateValue: date.getFullYear() + '-' + fill_date((date.getMonth() + 1)) + '-' + fill_date(date.getDate())

        })

    },

    reset: function (e) {

        var that = this;
        var date = new Date();

        that.setData({

            pickerValue: 0,
            timeValue: date.getHours() + ':' + date.getMinutes(),
            dateValue: date.getFullYear() + '-' + fill_date((date.getMonth() + 1)) + '-' + fill_date(date.getDate()),
            multiIndex: [0, 0]
        })

    },
    bindMultiPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            multiIndex: e.detail.value
        })
    },



    normalPickerBindchange: function (e) {
        this.setData({
            pickerValue: e.detail.value
        })
    },
    timePickerBindchange: function (e) {
        this.setData({
            timeValue: e.detail.value
        })
    },
    datePickerBindchange: function (e) {
        this.setData({
            dateValue: e.detail.value
        })
    },
    dbPickerBindchange: function (e) {
        this.setData({
            dbValue: e.detail.value
        })
    },

    submit: function (e) {

        var that = this;

        var timestamp = parseInt(Date.parse(new Date()) / 1000);

        var start_time = that.data.dateValue + ' ' + that.data.timeValue;

        var start_time_str = get_unix_time(start_time);

        var temper = that.data.multiArray[0][that.data.multiIndex[0]] + '.' + that.data.multiArray[1][that.data.multiIndex[1]];

        if (start_time_str > timestamp) {

            that.setData({

                show_tip_msg: '记录时间不能大于当前时间',
                showToast: true

            });

            setTimeout(function () {

                that.setData({

                    showToast: false

                });

            }, 1000);

            return;

        }

        wx.showLoading({
            title: '提交中',
            icon: 'loading',
            duration: 1000
        });

        wx.request({
            url: app.globalData.url + 'index.php/api/Index/temperature_add',
            data: {
                uid: wx.getStorageSync('uid'),
                stime: start_time_str,
                temper: temper
            },
            success: function (res) {

                wx.hideLoading();

                if (res.data.status == 200) {

                    wx.showToast({
                        title: '提交成功',
                        icon: 'loading',
                        duration: 1000
                    });

                    setTimeout(function () {

                        wx.navigateBack({
                            delta: 1
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