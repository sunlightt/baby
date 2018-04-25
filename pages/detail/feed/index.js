
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
        pickerRange: ['母乳', '配方奶'],
        timeValue: '12:20',
        dateValue: '2018-4-17',

        time_long_index: 0,
        time_long: [5, 10, 15, 20, 25, 30],

        //显示配方奶 
        milk_onoff: false,

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
            timeValue: date.getHours() + ':' + fill_date(date.getMinutes()),
            dateValue: date.getFullYear() + '-' + fill_date((date.getMonth() + 1)) + '-' + fill_date(date.getDate()),
            time_long_index: 0

        })

    },
    time_long: function (e) {

        this.setData({
            time_long_index: e.detail.value
        });
    },


    normalPickerBindchange: function (e) {
        if (e.detail.value == 1) {

            this.setData({
                pickerValue: e.detail.value,
                milk_onoff: true
            });

        } else {

            this.setData({
                pickerValue: e.detail.value,
                milk_onoff: false
            });
        }

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


    submit: function (e) {

        var that = this;

        var timestamp = parseInt(Date.parse(new Date()) / 1000);

        var feed_type = Number(that.data.pickerValue) + 1;

        var feed_time = that.data.dateValue + ' ' + that.data.timeValue;

        var feed_time_str = get_unix_time(feed_time);

        var feed_long = that.data.time_long[that.data.time_long_index];

        var feed_amount = e.detail.value.feed_amount;

        if (feed_type == 2 && feed_amount == '') {

            wx.showToast({
                title: '请输入配方奶量',
                icon: 'loading',
                duration: 1000
            });

            return;
        }

        if (feed_time_str > timestamp) {

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

        var data = {};

        if (that.data.milk_onoff){

            data = {
                uid: wx.getStorageSync('uid'),
                feed_type: feed_type,
                feed_time: feed_time_str,
                feed_l: feed_amount
            };


        }else{

            data = {
                uid: wx.getStorageSync('uid'),
                feed_type: feed_type,
                feed_time: feed_time_str,
                feed_long: feed_long
            };

            
        }

        wx.showLoading({
            title: '提交中',
            icon:'loading',
            duration:1000
        });

        wx.request({
            url: app.globalData.url + 'index.php/api/Index/feed_add',
            data: data,
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