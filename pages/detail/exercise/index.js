

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
        pickerRange: ['俯卧抬头', '肘撑俯卧', '拉坐练习', '翻身练习', '靠坐练习'],
        timeValue: '12:20',
        dateValue: '2018-4-17',

        time_long_index: 0,
        time_long: [5, 10, 15, 20, 25, 30],

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
            time_long_index: 0

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
    time_long: function (e) {

        this.setData({
            time_long_index: e.detail.value
        });
    },


    submit: function (e) {

        var that = this;

        var timestamp = parseInt(Date.parse(new Date()) / 1000);

        var start_time = that.data.dateValue + ' ' + that.data.timeValue;

        var start_time_str = get_unix_time(start_time);

        var content = that.data.pickerRange[that.data.pickerValue];

        var longtime = that.data.time_long[that.data.time_long_index];

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
            url: app.globalData.url + 'index.php/api/Index/activity_add',
            data: {
                uid: wx.getStorageSync('uid'),
                stime: start_time_str,
                content: content,
                longtime: longtime
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