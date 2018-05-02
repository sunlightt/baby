
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

        participation_degree_index: 0,
        participation_degree: [['几乎不', '偶尔', '一般', '经常', '总是']],
        spit_milk_index: 0,
        spit_milk: [['从不', '轻微', '一般', '频繁']],
        allergy_status_index: 0,
        allergy_status: [['无', '有']],
        sleep_type_index: 0,
        sleep_type: [['自然入睡', '抱睡', '奶睡', '推车哄睡', '开车哄睡', '其他']],
        is_independent_sleep_index: 0,
        is_independent_sleep: [['是', '否']],


        checkboxChange_motion_inf: [],
        checkboxChange_movement_inf: [],

        show_tip_msg: '',
        showToast: false
    },
    checkboxChange_motion: function (e) {

        var that = this;

        that.setData({

            checkboxChange_motion_inf: e.detail.value

        });

    },
    checkboxChange_movement: function (e) {

        var that = this;

        that.setData({

            checkboxChange_movement_inf: e.detail.value

        });

    },

    participation_degree: function (e) {
        this.setData({
            participation_degree_index: e.detail.value
        })
    },

    spit_milk: function (e) {
        this.setData({
            spit_milk_index: e.detail.value
        })
    },

    allergy_status: function (e) {
        this.setData({
            allergy_status_index: e.detail.value
        })
    },

    sleep_type: function (e) {
        this.setData({
            sleep_type_index: e.detail.value
        })
    },

    is_independent_sleep: function (e) {
        this.setData({
            is_independent_sleep_index: e.detail.value
        })
    },



    submit_report: function (e) {

        var that = this;

        var timestamp = parseInt(Date.parse(new Date()) / 1000);

        // var aim_time_show_report = Number(timestamp) + (60 * 60 * 3);

        var aim_time_show_report = Number(timestamp) + (60 * 3);


        wx.setStorageSync('aim_time_show_report', aim_time_show_report);

        // 过敏源
        var allergen = e.detail.value.allergen;

        var checkboxChange_motion_inf = that.data.checkboxChange_motion_inf;

        var checkboxChange_movement_inf = that.data.checkboxChange_movement_inf;

        if (allergen == '') {

            wx.showToast({
                title: '请输入过敏源',
                icon: 'loading',
                duration: 1000
            });

            return;
        } else if (checkboxChange_motion_inf.length == 0) {

            that.setData({

                show_tip_msg: '请选择宝宝大运动能力',
                showToast: true

            });
            setTimeout(function () {

                that.setData({

                    showToast: false

                });

            }, 1000);

            return;


        } else if (checkboxChange_motion_inf.length == 0) {

            that.setData({

                show_tip_msg: '请选择宝宝精细运动能力',
                showToast: true

            });
            setTimeout(function () {

                that.setData({

                    showToast: false

                });

            }, 1000);


            return;

        }


        var checkboxChange_motion_inf_str = null;

        var checkboxChange_movement_inf_str = null;


        for (var i = 0; i < checkboxChange_motion_inf.length; i++) {

            if (i == 0) {

                checkboxChange_motion_inf_str = checkboxChange_motion_inf[i];

            } else {

                checkboxChange_motion_inf_str += ',' + checkboxChange_motion_inf[i];

            }

        }

        for (var i = 0; i < checkboxChange_movement_inf.length; i++) {

            if (i == 0) {

                checkboxChange_movement_inf_str = checkboxChange_movement_inf[i];

            } else {

                checkboxChange_movement_inf_str += ',' + checkboxChange_movement_inf[i];

            }

        }

        wx.request({
            url: app.globalData.url + 'index.php/api/User/ti_report',
            data: {

                uid: wx.getStorageSync('uid'),
                baba_canyu: Number(that.data.participation_degree_index) + 1,
                fanliu_chengdu: Number(that.data.spit_milk_index) + 1,
                food_guomin: Number(that.data.allergy_status_index) + 1,
                guomin_source: allergen,
                sleep_method: Number(that.data.sleep_type_index) + 1,
                is_alone: Number(that.data.is_independent_sleep_index) + 1,
                big_yundong: checkboxChange_motion_inf_str,
                xi_yundong: checkboxChange_movement_inf_str
            },
            success: function (res) {

                var date = new Date();

                var dateValue = date.getFullYear() + '-' + fill_date((date.getMonth() + 1)) + '-' + fill_date(date.getDate()) + ' ' + '00' + ':' + '00' + ':' + '00'

                var current_month = date.getMonth() + 1;

                var current_day = date.getDate();

                if (res.data.status == 200) {

                    wx.showToast({
                        title: '提交成功',
                        icon: 'loading',
                        duration: 1000
                    });

                    var new_date = new Date();

                    new_date.setMonth(current_month);

                    new_date.setDate(current_day);

                    var clear_month_rport_submit_num_status_time_str= parseInt(Date.parse(new_date) / 1000);

                    // 一月提交一次
                    wx.setStorageSync('month_rport_submit_num_status', true);

                    // 清除一个月提交状态
                    wx.setStorageSync('clear_month_rport_submit_num_status_time_str', clear_month_rport_submit_num_status_time_str);

                    wx.setStorageSync('month_rport_submit_num_user_id', wx.getStorageSync('uid'));


                    setTimeout(function () {

                        wx.navigateBack({
                            delta: 2
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
                    title: '提交失败',
                    icon: 'loading',
                    duration: 1000
                });

            }
        })



    }

})