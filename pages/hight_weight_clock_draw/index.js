
var app = getApp();
const ctx = wx.createCanvasContext('myCanvas');

var userinf = null;

var height_present = [

    {
        weight: 5.1,

    }

];


Page({

    data: {
        img_src: null,
        src: null,
        width: 0,

        // 是否为ios,
        model: null,

        baby_inf: null,
        height_rate: null,
        weight_rate: null

    },
    onLoad: function (option) {

        var that = this;

        userinf = wx.getStorageSync('userinf_data');

        var context = ctx;

        wx.getSystemInfo({
            success: function (res) {

                console.log(res.model);

                var model = res.model.indexOf('iPhone ') == -1 ? false : true;

                console.log(model);

                that.setData({

                    width: res.windowWidth,
                    model: model

                });
            },
        });

        that.setData({

            height_rate: option.height_rate,
            weight_rate: option.weight_rate,

            baby_inf: app.globalData.userinf

        });

        wx.showLoading({
            title: '绘制中',
        });

        that.draw_img(context);

        // that.draw_head_img(context);

        // that.draw_nickname_and_gender(context);

        // that.draw_table_content(context);

    },
    draw_img: function (context) {

        var that = this;

        var qrcodeUrl = '../../img/draw_img.png';

        var width = 290;
        var height = 155;

        var set_height = height + (that.data.width - 290);

        context.save();

        context.drawImage(qrcodeUrl, 0, 0, 320, 568);

        context.draw(true, function (res) {

            that.draw_head_img(context);

        });

        // setTimeout(function () {

        //     context.draw(true, function () {


        //     });

        // }, 200);

    },

    draw_head_img: function (context) {

        var that = this;

        var head_img_src = '../../img/head.jpg';

        if (userinf.avatar != '') {

            wx.getImageInfo({

                src: userinf.avatar,

                success: function (res) {

                    var img_width = res.width;

                    var img_height = res.height;

                    var scale_rate = img_width / 100;

                    var scale_height = img_height / scale_rate;

                    var pos_x = 60 - 50;

                    var pos_y = 315 - (scale_height / 2);

                    var path = res.path;

                    context.save();
                    context.beginPath();

                    context.arc(66, 315, 25, 0, 2 * Math.PI)
                    // context.fill();
                    context.clip();

                    context.drawImage(path, pos_x, pos_y, 100, scale_height);

                    context.closePath();

                    context.restore();

                    // context.draw(true, function (res) {

                    //     that.draw_table_content(context);

                    // });

                    setTimeout(function () {

                        context.draw(true, function () {

                            that.draw_nickname_and_gender(context);

                        });

                    }, 200);
                },

                file: function (res) {

                    console.log(res);

                }
            })

        } else {

            context.save();
            context.beginPath();

            context.arc(66, 315, 25, 0, 2 * Math.PI);
            // context.fill();
            context.clip();

            context.drawImage(head_img_src, 41, 289, 50, 50);

            context.closePath();

            context.restore();

            context.draw(true);

            that.draw_nickname_and_gender(context);

            that.draw_table_content(context);

        }

    },

    // 绘制昵称
    draw_nickname_and_gender: function (context) {

        var that = this;

        var title = userinf.nickname;

        var sex = userinf.sex == 1 ? '男' : '女';

        var introduce = '我家萌宝叫' + userinf.nickname + '，是个' + sex + '宝宝';

        context.save();

        context.setFontSize(14);

        context.setTextAlign('left');

        context.setTextBaseline('top');

        context.setFillStyle('#323232');

        context.fillText(title, 40, 350);

        context.setFontSize(11);

        context.setTextAlign('left');

        context.setTextBaseline('top');

        context.setFillStyle('#787878');

        context.fillText(introduce, 40, 371);

        setTimeout(function () {

            context.draw(true, function () {

                that.draw_small_font(context);

            });

        }, 200);

    },

    // 绘制超越小字
    draw_small_font: function (context) {

        var that = this;

        var overstep = '已超越';

        context.setFontSize(10);

        context.setTextAlign('left');

        context.setTextBaseline('top');

        context.setFillStyle('#323232');

        context.fillText(overstep, 128, 417);


        context.setFontSize(10);

        context.setTextAlign('left');

        context.setTextBaseline('top');

        context.setFillStyle('#323232');

        context.fillText(overstep, 218, 417);

        setTimeout(function () {

            context.draw(true, function () {

                that.draw_table_content(context);

            });

        }, 200);


    },

    // 绘制表格内容
    draw_table_content: function (context) {

        var that = this;

        var age_month = userinf.month + '个月';

        var age_day = userinf.day + '天';

        var height = that.data.height_rate;

        var small_font = '%小伙伴'

        var weight = that.data.weight_rate;

        var overstep = '已超越';

        context.save();

        context.setFontSize(18);

        context.setTextAlign('left');

        context.setTextBaseline('top');

        context.setFillStyle('#323232');

        context.fillText(age_month, 40, 431);



        context.setFontSize(10);

        context.setTextAlign('left');

        context.setTextBaseline('top');

        context.setFillStyle('#323232');

        context.fillText(age_day, 90, 441);


        // context.setFontSize(10);

        // context.setTextAlign('left');

        // context.setTextBaseline('top');

        // context.setFillStyle('#323232');

        // context.fillText(overstep, 128, 417);


        context.setFontSize(18);

        context.setTextAlign('right');

        context.setTextBaseline('top');

        context.setFillStyle('#323232');

        context.fillText(height, 152, 431);


        context.setFontSize(10);

        context.setTextAlign('left');

        context.setTextBaseline('top');

        context.setFillStyle('#323232');

        context.fillText(small_font, 155, 441);


        // context.setFontSize(10);

        // context.setTextAlign('left');

        // context.setTextBaseline('top');

        // context.setFillStyle('#323232');

        // context.fillText(overstep, 218, 417);


        context.setFontSize(18);

        context.setTextAlign('right');

        context.setTextBaseline('top');

        context.setFillStyle('#323232');

        context.fillText(weight, 243, 431);


        context.setFontSize(10);

        context.setTextAlign('left');

        context.setTextBaseline('top');

        context.setFillStyle('#323232');

        context.fillText(small_font, 245, 441);

        setTimeout(function () {

            context.draw(true, function () {

                wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    canvasId: 'myCanvas',
                    fileType: 'png',
                    quality: 1,
                    success: function (res) {

                        wx.hideLoading();

                        that.setData({

                            img_src: res.tempFilePath

                        });

                        setTimeout(function () {

                            wx.showToast({
                                title: '长按保存',
                                icon: 'loading',
                                duration: 2000
                            });

                        }, 2000);
                    }
                });

            });

        }, 200);

    },

    save_img: function (e) {

        var that = this;

        wx.saveImageToPhotosAlbum({
            filePath: that.data.img_src,
            success: function (res) {

                wx.showToast({
                    title: '保存成功',
                    icon: 'loading',
                    duration: 1000
                });
            },
            fail: function () {

                wx.getSetting({
                    success: (res) => {

                        if (!res.authSetting['scope.writePhotosAlbum']) {

                            wx.openSetting({
                                success: (response) => {

                                    return;

                                }
                            })

                        }
                    }
                })
            }
        })
    },
    longtap: function (e) {

        var that = this;

        wx.saveImageToPhotosAlbum({
            filePath: that.data.img_src,
            success: function (res) {

                wx.showToast({
                    title: '保存成功',
                    icon: 'loading',
                    duration: 1000
                });
            },
            fail: function () {

                wx.getSetting({
                    success: (res) => {

                        if (!res.authSetting['scope.writePhotosAlbum']) {

                            wx.openSetting({
                                success: (response) => {

                                    return;

                                }
                            })

                        }
                    }
                })
            }
        })

    }

});