
const app = getApp();

var body_src_arr = [

    'http://p6v1wjzjz.bkt.clouddn.com/0_10.png',
    'http://p6v1wjzjz.bkt.clouddn.com/10_15.png',
    'http://p6v1wjzjz.bkt.clouddn.com/15_20.png',
    'http://p6v1wjzjz.bkt.clouddn.com/20_25.png',
    'http://p6v1wjzjz.bkt.clouddn.com/25_30.png'

];

var close_arr = [
    // 0——5
    {
        guide: {
            yf:[
                {
                    yf_name: '1件厚羽绒服',
                    yf_img: '/img/hyrf.png'
                },
                {
                    yf_name: '1件羊毛衫',
                    yf_img: '/img/mms.png'
                }, 
                {
                    yf_name: '1件棉背心',
                    yf_img: '/img/mbx.png'
                }, 
                {
                    yf_name: '1件棉毛衫',
                    yf_img: '/img/mms.png'
                },
                {
                    yf_name: '1件棉内衣',
                    yf_img: '/img/mny.png'
                }  
            ],
            kz:[
                {
                    kz_name: '1条羽绒裤',
                    kz_img:'/img/yrk.png'
                },
                {
                    kz_name: '1条棉毛裤',
                    kz_img: '/img/mmk.png'
                },
                {
                    kz_name: '1条棉秋裤',
                    kz_img: '/img/mqk.png'
                },
            ]
        }
    },
    // 5——10
    {
        guide: {
            yf: [
                {
                    yf_name: '1件厚羽绒服',
                    yf_img: '/img/hyrf.png'
                },
                {
                    yf_name: '1件羊毛衫',
                    yf_img: '/img/mms.png'
                },
                {
                    yf_name: '1件棉毛衫',
                    yf_img: '/img/mms.png'
                },
                {
                    yf_name: '1件棉内衣',
                    yf_img: '/img/mny.png'
                }
            ],
            kz: [
                {
                    kz_name: '1条羽绒裤',
                    kz_img: '/img/yrk.png'
                },
                {
                    kz_name: '1条棉毛裤',
                    kz_img: '/img/mmk.png'
                },
                {
                    kz_name: '1条棉秋裤',
                    kz_img: '/img/mqk.png'
                },
            ]
        }
    },
    // 10——15
    {
        guide: {

            yf: [
                {
                    yf_name: '1件薄羽绒服',
                    yf_img: '/img/byrf.png'
                },
                {
                    yf_name: '1件毛衣',
                    yf_img: '/img/my.png'
                },
                {
                    yf_name: '1件棉内衣',
                    yf_img: '/img/mny.png'
                }
               
            ],
            kz: [
                {
                    kz_name: '1件棉绒裤',
                    kz_img: '/img/mrk.png'
                },
                {
                    kz_name: '1条棉秋裤',
                    kz_img: '/img/mqk.png'
                }
            ]
        }
    },
    //15_20
    {
        guide: {

            yf: [
                {
                    yf_name: '1件加绒外套',
                    yf_img: '/img/jrwt.png'
                },
                {
                    yf_name: '1件毛衣',
                    yf_img: '/img/my.png'
                },
                {
                    yf_name: '1件棉内衣',
                    yf_img: '/img/mny.png'
                }
               
            ],
            kz: [
                {
                    kz_name: '棉毛裤',
                    kz_img: '/img/mmk.png'
                },
                {
                    kz_name: '1条棉秋裤',
                    kz_img: '/img/mqk.png'
                }
            ]
        }
    },
    //20_25
    {
        guide: {

            yf: [
                {
                    yf_name: '1件薄外套',
                    yf_img: '/img/bwt.png'
                },
                {
                    yf_name: '1件短袖',
                    yf_img: '/img/dx.png'
                }

            ],
            kz: [
                {
                    kz_name: '1条外裤',
                    kz_img: '/img/wk.png'
                },
                {
                    kz_name: '1条秋裤',
                    kz_img: '/img/qk.png'
                }
            ]
        }
    },
    //25_30
    {
        guide: {

            yf: [
                {
                    yf_name: '1件短袖',
                    yf_img: '/img/dx.png'
                }
            ],
            kz: [
                {
                    kz_name: '1条薄外裤',
                    kz_img: '/img/bwk.png'
                }
            ]
        }
    }
]

Page({

    data: {

        weather_data: null,
        body_src_index:2,
        body_src: body_src_arr,
        guide_data_index:3,
        guide_data: close_arr,
        show_page_status:false

    },
    onReady:function(){

        var that = this;

        that.get_weather_data();

    },

    onLoad: function (e) {

        
    },
    get_weather_data: function (e) {


        var that = this;

        var date = new Date();

        var current_hour = date.getHours();

        var body_src_index=0;

        var guide_data_index=0;


        wx.showLoading({
            title: '获取数据中'
        });

        wx.getLocation({
            altitude: false,
            success: function (res) {

                var latitude = res.latitude;
                var longitude = res.longitude;


                wx.request({
                    url: app.globalData.url + 'index.php/api/Index/wea',
                    data: {

                        lat: latitude,

                        lgt: longitude

                    },
                    success: function (res) {

                        wx.hideLoading();

                        if (res.data.status == 200) {


                            var weather_data = res.data.data;

                            var new_weather_data = [];

                            for (var i = 0; i < weather_data.hourly.length; i++) {


                                weather_data.hourly[i].time = parseInt(weather_data.hourly[i].time);

                            }

                            // for (var i = 0; i < 24; i++) {

                            //     for (var j = 0; j < weather_data.hourly.length; j++) {

                            //         if (i == weather_data.hourly[j].time) {

                            //             new_weather_data[i] = weather_data.hourly[j]

                            //         }

                            //     }
                            // }

                            if (weather_data.temp<10){

                                if (weather_data.temp<5){

                                    guide_data_index=0;

                                }else{

                                    guide_data_index = 1;

                                }
                                
                                body_src_index=0;


                            } else if (weather_data.temp >= 10 && weather_data.temp <15){

                                body_src_index = 1;
                                guide_data_index=2;

                            } else if (weather_data.temp >= 15 && weather_data.temp < 20) {

                                body_src_index = 2;
                                guide_data_index = 3;

                            } else if (weather_data.temp >= 20 && weather_data.temp < 25) {

                                body_src_index = 3;
                                guide_data_index = 4;

                            } else if (weather_data.temp >= 25) {

                                body_src_index = 4;
                                guide_data_index = 5;

                            }

                            that.setData({

                                weather_data: weather_data,

                                weather_list_data: new_weather_data,

                                body_src_index: body_src_index,

                                guide_data_index: guide_data_index,

                                show_page_status:true

                            });


                        } else {

                            wx.showToast({
                                title: '天气获取失败',
                                icon: 'loading',
                                duration: 1000
                            });

                        }

                    },
                    fail: function (res) {

                        wx.hideLoading();

                        wx.showToast({
                            title: '天气获取失败',
                            icon: 'loading',
                            duration: 1000
                        });
                    }
                })

                return;
                // app.globalData.qqmapsdk.reverseGeocoder({

                //     location: {

                //         latitude: latitude,
                //         longitude: longitude
                //     },
                //     success: function (res) {

                //         var city = res.result.ad_info.city;

                //         wx.setStorageSync('city', res.result.ad_info.city);


                //     }
                // })

            }
        })
        // if (!wx.getStorageSync('city')) {


        // }


    }

})