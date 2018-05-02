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
        pickerRange: ['母乳', '奶粉', '小米粥', '玉米糊'],
        timeValue: '12:20',
        dateValue: '2018-4-17',

        heightArray: [['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40'], ['1', '2', '3', '4', '5', '6', '7', '8', '9']],
        heightIndex: [0, 0],

        weightArray: [['1', '2', '3', '4', '5', '6', '7', '8', '9'], ['1', '2', '3', '4', '5', '6', '7', '8', '9']],
        weightIndex: [0, 0],

        height: '',
        weight: '',

        customItem: '全部',

        show_tip_msg: '',
        showToast: false,

        reset_status: false
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
            weightIndex: [0, 0],
            heightIndex: [0, 0],
            height: '',
            weight: ''

        });
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
    bindMultiPickerChange: function (e) {
        this.setData({
            heightIndex: e.detail.value
        })
    },
    bindMultiPicker2Change: function (e) {
        this.setData({
            weightIndex: e.detail.value
        })
    },

    submit: function (e) {

        var that = this;

        var timestamp = parseInt(Date.parse(new Date()) / 1000);

        var start_time = that.data.dateValue + ' ' + that.data.timeValue;

        var start_time_str = get_unix_time(start_time);

        var height = e.detail.value.height;

        var weight = e.detail.value.weight;

        if (height == '') {

            wx.showToast({
                title: '请填写身高',
                icon: 'loading',
                duration: 1000
            });

            return;

        } else if (weight == '') {

            wx.showToast({
                title: '请填写体重',
                icon: 'loading',
                duration: 1000
            });

            return;

        }

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

        that.setData({
            height:e.detail.value.height,
            weight:e.detail.value.weight
        });

        wx.showLoading({
            title: '提交中',
            icon: 'loading',
            duration: 1000
        });

        wx.request({
            url: app.globalData.url + 'index.php/api/Index/h_weight_add',
            data: {
                uid: wx.getStorageSync('uid'),
                stime: start_time_str,
                height: height,
                weight: weight
            },
            success: function (res) {

                wx.hideLoading();

                if (res.data.status == 200) {

                    // wx.showToast({
                    //     title: '提交成功',
                    //     icon: 'loading',
                    //     duration: 1000
                    // });

                    that.get_draw_img_data();

                    // setTimeout(function () {

                    //     wx.navigateTo({
                    //         url: '/pages/hight_weight_clock_draw/index'
                    //     });


                    // }, 1000);

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

    },

    //获取提交后 返回的绘图数据

    get_draw_img_data: function (e) {

        var that = this;

        var userinf = wx.getStorageSync('userinf_data');

        wx.request({
            url: app.globalData.url + 'index.php/api/Report/get_rate',
            data: {
                sex: userinf.sex,
                month: userinf.month,
                height: that.data.height,
                weight: that.data.weight
            },
            success: function (res) {

                if (res.data.status == 200) {

                    var height_rate = res.data.data.height;

                    var weight_rate = res.data.data.weight;

                    wx.navigateTo({
                        url: '/pages/hight_weight_clock_draw/index?height_rate=' + height_rate + '&weight_rate=' + weight_rate
                    });

                    // console.log(res);

                }else{

                    wx.showToast({
                        title: '获取数据失败',
                        icon: 'loading',
                        duration: 1000
                    });
                }
            }
        })


    }
})