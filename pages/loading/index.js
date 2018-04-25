
const app = getApp()

var check_arr_status = [0, 0, 0, 0, 0];

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
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),

        mark_off: false,
        day_work_onoff: false,

        check_arr_status: check_arr_status,
        current_index: 0,

        task_list_data: [],

        item_type: 1,

        // 养育报告提交状态
        submit_report_status: false,
        report_time: '2018-04-20',

        mark_code_show_code: false,
        code_src: '/img/code.jpg',



        pickerValue: 0,
        pickerRange: ['爸爸', '妈妈', '爷爷', '奶奶', '姥姥', '姥爷'],
        date: '',
        birth_date: null,

        sex_index: 0,
        sex_arr: ['男', '女'],

        relationship_index: null,

        content_show_status:false,
        loading_status:true,

        show_tip_msg: '',
        showToast: false,

        pop_mark_swiper_current_view_index:0

    },
    draw_img: function (e) {

        wx.navigateTo({

            url: '/pages/draw_img/index'

        });

    },
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function () {

        var that = this;

        var date = new Date();
        var that = this;
        var date1 = new Date(date);
        date1.setDate(date1.getDate() + 1);
        //  提交信息
        var timestamp = parseInt(Date.parse(new Date()) / 1000);

        that.setData({
            date: date.getFullYear() + '-' + fill_date((date.getMonth() + 1)) + '-' + fill_date(date.getDate()),
            birth_date: timestamp
        });


        var dateValue = date.getFullYear() + '-' + fill_date((date.getMonth() + 1)) + '-' + fill_date(date.getDate()) + ' ' + '00' + ':' + '00' + ':' + '00'

        var timestamp = parseInt(Date.parse(new Date()) / 1000);

        if (!wx.getStorageSync('check_arr_status')) {

            that.setData({

                check_arr_status: check_arr_status

            });

            wx.setStorageSync('clear_check_arr_status', true);

        } else if (wx.getStorageSync('check_arr_status')) {

            if (timestamp >= wx.getStorageSync('clear_check_arr_time') && !wx.getStorageSync('clear_check_arr_status')) {

                wx.clearStorageSync('check_arr_status');

                wx.setStorageSync('clear_check_arr_status', true);

                that.setData({

                    check_arr_status: check_arr_status

                });

            } else {

                that.setData({

                    check_arr_status: wx.getStorageSync('check_arr_status')

                });

            }

        }

        wx.showLoading({
            title: '加载中'
        });

    //  获取登录状态
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

                                console.log(response.data.data.is_tj);

                                if (response.data.data.is_tj == 1) {

                                    wx.setStorageSync('login_status', true);

                                    that.setData({
                                        loading_status: true,
                                        content_show_status: true,
                                    });
                                    
                                } else {

                                    that.setData({

                                        loading_status: true,
                                        content_show_status: false,

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

        that.get_task_list();

    },

    onShow: function (e) {

        var that = this;

        that.is_up_report_status();

    },

    //获取任务列表
    get_task_list: function (e) {

        var that = this;

        if (!wx.getStorageSync('uid')) {

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
                                if (response.data.status == 200) {


                                    wx.setStorageSync('uid', response.data.data.uid);

                                    that.feed_case();

                                    wx.request({
                                        url: app.globalData.url + 'index.php/api/Index/daily_task',
                                        data: {
                                            uid: response.data.data.uid
                                        },
                                        success: function (res) {

                                            if (res.data.status == 200) {

                                                var task_list_data = null;

                                                console.log(res.data.data);

                                                that.setData({

                                                    task_list_data: res.data.data

                                                });

                                            } else {

                                                wx.showToast({
                                                    title: '获取任务数据失败',
                                                    icon: 'loading',
                                                    duration: 1000
                                                });
                                            }

                                        },
                                        fail: function (res) {

                                            wx.showToast({
                                                title: '获取任务请求失败',
                                                icon: 'loading',
                                                duration: 1000
                                            });

                                        }
                                    })




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

        } else {

            that.feed_case();

            wx.request({
                url: app.globalData.url + 'index.php/api/Index/daily_task',
                data: {
                    uid: wx.getStorageSync('uid')
                },
                success: function (res) {

                    if (res.data.status == 200) {

                        var task_list_data = null;

                        that.setData({

                            task_list_data: res.data.data

                        });

                    } else {

                        wx.showToast({
                            title: '获取任务数据失败',
                            icon: 'loading',
                            duration: 1000
                        });
                    }

                },
                fail: function (res) {

                    wx.showToast({
                        title: '获取任务请求失败',
                        icon: 'loading',
                        duration: 1000
                    });

                }
            })
        }
    },

    getUserInfo: function (e) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },

    //养育方案
    feed_case: function (e) {

        var that = this;

        wx.request({
            url: app.globalData.url + 'index.php/api/User/user_info',
            data: {

                uid: wx.getStorageSync('uid')

            },
            success: function (res) {

                if (res.data.status == 200) {

                    that.setData({

                        feed_case_inf: res.data.data
                    });

                } else {

                    wx.showToast({
                        title: '获取宝宝信息失败',
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

    show_mark: function (e) {

        var that = this;

        var type = e.currentTarget.dataset.type;

        var index = e.currentTarget.dataset.index;

        var check_arr_status = that.data.check_arr_status;

        var item_type = e.currentTarget.dataset.item_type;

        var task_list_data = that.data.task_list_data;

        var check_arr_status = that.data.check_arr_status;

        var progress_num = 0;

        for (var i = 0; i < check_arr_status.length; i++) {

            console.log(check_arr_status[i]);

            if (check_arr_status[i] == 1) {

                progress_num += 1;

            }
        }

        if (type == 2 && check_arr_status[index] == 1) {

            wx.showToast({
                title: '您已完成任务',
                icon: 'loading',
                duration: 1000
            });

            return;
        }

        if (type != 1) {

            that.setData({

                mark_off: true,
                day_work_onoff: true,
                current_index: index,
                item_type: item_type,
                task_inf: task_list_data[index]
            });

        } else {

            that.setData({

                mark_off: true,
                day_work_onoff: false,
                progress_num: (progress_num * 20)

            });

        }

    },
    close_mark: function (e) {

        var that = this;

        that.setData({

            mark_off: false,
            day_work_onoff: false

        });


    },
    confirm_btn: function (e) {

        var that = this;

        var date = new Date();

        var dateValue = date.getFullYear() + '-' + fill_date((date.getMonth() + 1)) + '-' + fill_date(date.getDate()) + ' ' + '00' + ':' + '00' + ':' + '00'

        var clear_check_arr_time = Number(get_unix_time(dateValue)) + (60 * 60 * 24);

        var current_index = that.data.current_index;

        var check_arr_status = that.data.check_arr_status;

        check_arr_status[current_index] = 1;

        that.setData({

            mark_off: false,
            day_work_onoff: false,
            check_arr_status: check_arr_status

        });

        wx.setStorageSync('check_arr_status', check_arr_status);

        if (wx.getStorageSync('clear_check_arr_status')) {

            wx.setStorageSync('clear_check_arr_time', clear_check_arr_time);

            wx.setStorageSync('clear_check_arr_status', false);

        }

    },

    star_num: function (e) {

        wx.navigateTo({
            url: '/pages/wether/index'
        })
    },
    record_detail: function (e) {

        wx.navigateTo({
            url: '/pages/detail/record_detail/index'
        })

    },

    report_detail: function (e) {

        var that = this;

        wx.navigateTo({
            url: '/pages/report_detail/index?index=' + e.currentTarget.dataset.index + '&report_time=' + that.data.report_time
        })
    },

    fill_inf: function (e) {

        wx.navigateTo({
            url: '/pages/fill_inf/index?head_img=' + e.currentTarget.dataset.head_img
        })


    },
    change_view: function (e) {

        var that = this;

        if (e.detail.current == 1) {

            wx.setNavigationBarTitle({
                title: '养育方案'
            });

        } else {

            wx.setNavigationBarTitle({
                title: '日常功能'
            });
        }

    },
    submit_report: function (e) {

        wx.navigateTo({
            url: '/pages/detail/record_detail/index'
        })

    },

    // 是否提交报告
    is_up_report_status: function (e) {

        var that = this;

        wx.request({
            url: app.globalData.url + 'index.php/api/User/is_already_report',
            data: {

                uid: wx.getStorageSync('uid')

            },
            success: function (res) {

                if (res.data.status == 200) {

                    if (res.data.data == 1) {

                        that.setData({

                            submit_report_status: true

                        });

                    }

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

    show_code: function (e) {

        var that = this;

        var code_src = '/img/code.jpg';

        var sex = e.currentTarget.dataset.sex;

        if (sex != 1) {

            code_src = '/img/code1.jpg'
        }

        that.setData({

            mark_code_show_code: true,
            code_src: code_src

        })

    },
    close_show_code: function (e) {

        var that = this;

        that.setData({

            mark_code_show_code: false

        })

    },

    radioChange: function (e) {

        var that = this;

        console.log(e.detail.value);

        that.setData({

            relationship_index: e.detail.value

        });



    },
    // 宝宝信息提交
    sub_baby_inf: function (e) {

        var that = this;
        var name = e.detail.value.name;
        var gender = Number(that.data.sex_index) + 1;
        var filiation = that.data.relationship_index;

        var timestamp = parseInt(Date.parse(new Date()) / 1000);

        console.log('ceshi');

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

        } else if (!filiation) {

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

                    that.setData({
                        loading_status: true,
                        content_show_status: true,
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

    },
    pop_mark_swiper_bindchange:function(e){

        var that=this;

        that.setData({

            pop_mark_swiper_current_view_index: e.detail.current

        });

    },
    pop_mark_swiper_pre_step:function(e){

        var that=this;

        var pop_mark_swiper_current_view_index = that.data.pop_mark_swiper_current_view_index;

        if (pop_mark_swiper_current_view_index>0){

            pop_mark_swiper_current_view_index = pop_mark_swiper_current_view_index-1;
        }

        that.setData({

            pop_mark_swiper_current_view_index: pop_mark_swiper_current_view_index

        });

    },
    pop_mark_swiper_next_step: function (e) {

        var that = this;

        var pop_mark_swiper_current_view_index = that.data.pop_mark_swiper_current_view_index;

        pop_mark_swiper_current_view_index = pop_mark_swiper_current_view_index + 1;

        that.setData({

            pop_mark_swiper_current_view_index: pop_mark_swiper_current_view_index

        });

    },
  
    // -------------------------------------

    feed: function (e) {
        console.log(e);
        wx.navigateTo({
            url: '/pages/detail/feed/index',
        })
    },
    sleep: function (e) {
        wx.navigateTo({
            url: '/pages/detail/sleep/index',
        })
    },
    db: function (e) {
        wx.navigateTo({
            url: '/pages/detail/db/index',
        })
    },
    temperature: function (e) {
        wx.navigateTo({
            url: '/pages/detail/temperature/index',
        })
    },
    exercise: function (e) {
        wx.navigateTo({
            url: '/pages/detail/exercise/index',
        })
    },
    height: function (e) {
        wx.navigateTo({
            url: '/pages/detail/height/index',
        })
    }
})
