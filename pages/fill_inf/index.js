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

                })

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
        dateValue: 0,
        dateRange: ['（0~6）天', '（25~43）周'],
        wayValue: 0,
        wayRange: ['自娩', '自娩(侧切)', '胎吸', '产钳', '臀助产', '剖宫产'],
        familyValue: 0,
        familyRange: ['妈妈', '爸爸', '祖辈','保姆'],
        date: '',
        birth_date: null,
        sex_index: 0,
        sex_arr: ['男', '女'],

        head_img: '/img/icon.png',

        show_tip_msg: '',
        showToast: false
    },

    onLoad: function (options) {

        var that = this;
        var date = new Date();
        var timestamp = parseInt(Date.parse(new Date()) / 1000);


        if (options.head_img){

            that.setData({
                date: date.getFullYear() + '-' + fill_date((date.getMonth() + 1)) + '-' + fill_date(date.getDate()),
                birth_date: timestamp,
                head_img: options.head_img

            });

        }else{

            that.setData({
                date: date.getFullYear() + '-' + fill_date((date.getMonth() + 1)) + '-' + fill_date(date.getDate()),
                birth_date: timestamp
            });

        }

    },
    onUnload:function(e){

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
    sub_baby_inf:function(e){

        var that=this;

        var chu_weight = e.detail.value.weight;
        var chu_height = e.detail.value.high;

        wx.request({
            url: app.globalData.url +'index.php/api/User/com_info',
            data:{

                 uid:wx.getStorageSync('uid'),
                 yun_week: Number(that.data.dateValue)+1,
                 method: Number(that.data.wayValue)+1,
                 chu_weight: chu_weight,
                 chu_height: chu_height,
                 zhu_person: Number(that.data.familyValue)+1

            },
            success: function (res) {

                if (res.data.status == 200) {

                    wx.showToast({
                        title: '提交成功',
                        icon: 'loading',
                        duration: 1000
                    });

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