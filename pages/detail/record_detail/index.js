

const app=getApp();

var now = new Date();//今天
var n = 0;
var week = ['日', '一', '二', '三', '四', '五', '六'];

function fill_date(str) {


    return Number(str) < 10 ? '0' + str : str;

}

Page({

    data: {

        date_list: [],
        current_date: null,
        record_data: [],

        current_time_str:null

    },

    onLoad: function (e) {

        var that = this;

        that.week(now);

        that.get_record_history();

    },

    get_record_history: function (time){

        var that=this;

        if (!time){

            time = that.data.current_time_str;

        }

        var data_ob = new Date(time);

        var currentdate = data_ob.getFullYear() + '-' + fill_date(data_ob.getMonth() + 1) + '-' + fill_date(data_ob.getDate());

        wx.request({
            url: app.globalData.url +'index.php/api/Index/record_detail',
            data:{
                uid:wx.getStorageSync('uid'),
                time: currentdate
            },
            success:function(res){

                
                if(res.data.status==200){

                    console.log(res.data.data);

                    var  record_data= res.data.data;

                    record_data.total3 = (record_data.total3).toFixed(1);

                    that.setData({

                        record_data: res.data.data

                    });

                }else{

                    wx.showToast({
                        title: '获取数据失败',
                        icon: 'loading',
                        duration: 1000
                    });   

                }
            },
            fail:function(res){
 
                wx.showToast({
                    title: '请求失败',
                    icon:'loading',
                    duration:1000
                });

            }
        })



    },

    week: function (now) {

        var that = this;

        var date_list = [];

        var nowTime = now.getTime();
        var day = now.getDay();

        var oneDayLong = 24 * 60 * 60 * 1000;
        //获取本周所在周一
        var MondayTime = nowTime - (day - 1) * oneDayLong;
        //
        //获取本周所在周末                    
        var SundayTime = nowTime + (7 - day) * oneDayLong;
        //转化日期
        var monday = new Date(MondayTime);
        var sunday = new Date(SundayTime);
        var month = monday.getMonth() + 1;
        var strDate = monday.getDate();
        var month1 = sunday.getMonth() + 1;
        var strDate1 = sunday.getDate();

        var test_date_str = nowTime + (7 - day) * oneDayLong;

        var currentdate =null;

        for (var i = 0; i < 7; i++) {

            var new_test_date_str = test_date_str - (i * oneDayLong);

            var data_ob = new Date(new_test_date_str);

            var current_day = data_ob.getDay();

            if (current_day == day) {


                that.setData({

                    current_time_str: new_test_date_str

                });


                currentdate = data_ob.getFullYear() + '-' + fill_date(data_ob.getMonth()+1) + '-' + fill_date(data_ob.getDate());

            }

            date_list.unshift({
                'time_str': new_test_date_str,
                'week': week[current_day],
                'date': data_ob.getDate()
            })

        }
        that.setData({

            current_date: currentdate,

            date_list: date_list

        });
    },
    addWeek: function (e) {

        var that = this;
        n++;
        var date = new Date(now.getTime() + n * 7 * 24 * 3600 * 1000);

        that.week(date);
    },
    next_week: function (e) {

        var that = this;
        n--;
        var date = new Date(now.getTime() + n * 7 * 24 * 3600 * 1000);
        that.week(date);
    },
    filter_date:function(e){

        var that=this;

        var time_str = e.currentTarget.dataset.time_str;

        var data_ob = new Date(time_str);

        var currentdate = data_ob.getFullYear() + '-' + fill_date(data_ob.getMonth() + 1) + '-' + fill_date(data_ob.getDate());

        that.get_record_history(time_str);

        that.setData({

            current_date: currentdate

        });
    },
    submit_report:function(e){

        var that=this;

        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];  //上一个页面

        prevPage.setData({

            report_time: that.data.current_date
            
    
        });

        wx.navigateTo({
            url: '/pages/supplementray_inf/index'
        })
    }
})