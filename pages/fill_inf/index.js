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

function formatDate(now) {
    var year = now.getYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return "20" + year + "-" + month + "-" + date;
}

function upload(page, path) {
    wx.showToast({
        icon: "loading",
        title: "正在上传"
    }),
        wx.uploadFile({
            url: app.globalData.url + 'index.php/api/User/save_avatar',
            filePath: path[0],
            name: 'file',
            formData: {
                'uid': wx.getStorageSync('uid')
            },
            success: function (res) {

                if (res.statusCode == 200) {

                    wx.showToast({
                        title: '头像修改成功',
                        icon: 'loading',
                        duration: 1000
                    });

                    page.setData({

                        head_img: JSON.parse(res.data).data

                    });

                    wx.setStorageSync('head_img', JSON.parse(res.data).data);

                } else {

                    app.set_status_tip(res.data.status);

                }
            },
            fail: function (e) {
                console.log(e);
                wx.showModal({
                    title: '提示',
                    content: '上传失败',
                    showCancel: false
                })
            }
        });
}


Page({
    data: {
        pickerValue: 0,
        pickerRange: ['爸爸', '妈妈', '爷爷', '奶奶', '姥姥', '姥爷'],
        dateValue: 9,
        dateRange_index: ['31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43'],
        dateRange: ['31周', '32周', '33周', '34周', '35周', '36周', '37周', '38周', '39周', '40周', '41周', '42周', '43周'],
        wayValue: 0,
        wayRange: ['自娩', '自娩(侧切)', '胎吸', '产钳', '臀助产', '剖宫产'],
        familyValue: 0,
        familyRange: ['妈妈', '爸爸', '祖辈', '保姆'],

        head_img: '/img/head.png',

        show_tip_msg: '',
        showToast: false,

        date: '',
        birth_date: null,

        baby_name: null,
        sex_index: 0,
        sex_arr: ['男', '女'],

        relationship_index: null,

        baby_weight: null,
        baby_height: null,
        wx_number: null


    },

    onLoad: function (options) {

        var that = this;
        var date = new Date();
        var timestamp = parseInt(Date.parse(new Date()) / 1000);

        if (wx.getStorageSync('head_img')) {

            // that.setData({

            //     head_img: wx.getStorageSync('head_img')

            // });
        }

        that.get_fill_inf();

    },
    get_fill_inf: function (e) {

        var that = this;

        var baby_weight = parseFloat(that.data.baby_weight);

        var baby_height = parseInt(that.data.baby_height);

        var wx_number = that.data.wx_number;

        var dateValue = that.data.dateValue;

        var dateRange_index = that.data.dateRange_index;

        var familyValue = that.data.familyValue;

        var wayValue = that.data.wayValue;

        wx.request({
            url: app.globalData.url + 'index.php/api/User/get_info',
            data: {

                uid: wx.getStorageSync('uid')

            },
            success: function (res) {

                if (res.data.status == 200) {

                    var fill_inf = res.data.data;

                    var date = new Date(parseInt(fill_inf.birth) * 1000);

                    var birth = date.getFullYear() + '-' + fill_date(date.getMonth() + 1) + '-' + fill_date(date.getDate());

                    if (fill_inf.yun_week != 0) {

                        for (var i = 0; i < dateRange_index.length; i++) {

                            if (fill_inf.yun_week == dateRange_index[i]) {

                                dateValue = i;
                            }
                        }
                    }


                    if (fill_inf.zhu_person != 0) {

                        familyValue = Number(fill_inf.zhu_person) - 1;

                    }

                    if (fill_inf.method != 0) {

                        wayValue = Number(fill_inf.method) - 1;
                    }


                    if (fill_inf.avatar == "") {

                        if (fill_inf.sex==1){

                            that.setData({

                                head_img: '/img/head.jpg'
                            })

                        }else{

                            that.setData({

                                head_img: '/img/head1.jpg'
                            });
                        }

                    } else {

                        that.setData({

                            head_img: fill_inf.avatar
                        });
                    }

                    that.setData({

                        fill_inf: fill_inf,
                        baby_name: fill_inf.nickname,
                        sex_index: fill_inf.sex == 1 ? 0 : 1,
                        relationship_index: fill_inf.relationship,
                        date: birth,
                        baby_weight: fill_inf.chu_weight + 'kg',
                        baby_height: fill_inf.chu_height + 'cm',
                        wx_number: fill_inf.wx_number,
                        dateValue: dateValue,
                        familyValue: familyValue,
                        wayValue: wayValue

                    });

                }

            },
            fail: function (res) {

            }
        })

    },
    onUnload: function (e) {

        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];  //上一个页面

        prevPage.feed_case();

    },
    normalPickerBindchange: function (e) {
        this.setData({
            pickerValue: e.detail.value
        })
    },
    datePickerBindchange: function (e) {
        this.setData({
            dateValue: e.detail.value
        })
    },
    wayPickerBindchange: function (e) {
        this.setData({
            wayValue: e.detail.value
        })
    },
    familyPickerBindchange: function (e) {
        this.setData({
            familyValue: e.detail.value
        })
    },

    skip: function (e) {
        wx.navigateTo({
            url: '/pages/index/index'
        })
    },
    up_head_img: function (e) {

        var that = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
                var tempFilePaths = res.tempFilePaths;
                upload(that, tempFilePaths);
            }
        })

    },
    sub_baby_inf: function (e) {

        var that = this;

        var chu_weight = e.detail.value.weight == '' ? ' ' : parseFloat(e.detail.value.weight);
        var chu_height = e.detail.value.high == '' ? ' ' : parseInt(e.detail.value.high);

        var name = e.detail.value.name;
        var gender = Number(that.data.sex_index) + 1;
        var filiation = that.data.relationship_index;

        var wx_number = e.detail.value.wx_number;

        var dateRange_index = that.data.dateRange_index;

        if (wx_number == '') {

            wx.showToast({
                title: '请填写微信号',
                icon: 'loading',
                duration: 1000
            });

            return;
        }

        wx.request({
            url: app.globalData.url + 'index.php/api/User/com_info',
            data: {

                uid: wx.getStorageSync('uid'),
                yun_week: dateRange_index[Number(that.data.dateValue)],
                method: Number(that.data.wayValue) + 1,
                chu_weight: chu_weight,
                chu_height: chu_height,
                zhu_person: Number(that.data.familyValue) + 1,
                nickname: name,
                sex: gender,
                relationship: filiation,
                wx_number: wx_number

            },
            success: function (res) {

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

    },
    pop_mark_normalPickerBindchange: function (e) {
        this.setData({
            sex_index: e.detail.value
        })
    },
    pop_mark_bindDateChange: function (e) {

        var date = e.detail.value;

        var start_time = date + ' ' + '00' + ':' + '00' + ':' + '00';

        var birth_date = get_unix_time(start_time);

        this.setData({

            date: date,
            birth_date: birth_date
        })

    },
    radioChange: function (e) {

        var that = this;

        that.setData({

            relationship_index: e.detail.value

        });



    }
})