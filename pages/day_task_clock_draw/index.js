
var app = getApp();
const ctx = wx.createCanvasContext('myCanvas');

var userinf = null;

Page({

    data: {
        img_src: null,
        src: null,
        width: 0,

        // 是否为ios,
        model: null,

        baby_inf: null

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

            baby_inf: app.globalData.userinf

        });

        wx.showLoading({
            title: '绘制中',
        });

        that.draw_img(context);

    },
    draw_img: function (context) {

        var that = this;

        var path = '../../img/draw_img1.png';

        context.save();

        context.drawImage(path, 0, 0, 320, 568);

        context.draw(true, function (res) {

            that.draw_head_img(context);

        });

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

                    var pos_y = 315 - (scale_height/2);

                    console.log(pos_x);

                    console.log(pos_y);

                    var path = res.path;

                    context.save();
                    context.beginPath();

                    context.arc(66, 315, 25, 0, 2 * Math.PI)
                    // context.fill();
                    context.clip();

                    // context.drawImage(path, 0, 0, img_width, img_height, 41, 289, 50, 50);

                    // context.drawImage(path, 41, 289, 50, 50, pos_x, pos_y, img_width, img_height);

                    // 66

                    // 315

                    // context.drawImage(path, 41, 289, 100, scale_height);
                    context.drawImage(path, pos_x, pos_y, 100, scale_height);

                    context.closePath();

                    context.restore();


                    context.draw(true, function (res) {

                        that.draw_nickname_and_gender(context);

                        that.draw_table_content(context);

                    });


                },

                file: function (res) {

                    console.log(res);

                }
            })

        } else {

            console.log('头像链接为空');

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

        context.draw(true);

    },

    // 绘制表格内容
    draw_table_content: function (context) {

        var that = this;

        var title = userinf.nickname;

        // var sex = userinf.sex == 1 ? '男' : '女';

        var gender = userinf.sex == 1 ? '男' : '女';

        var age = userinf.month + '月' + userinf.day + '天';;

        var small_font = '%小伙伴'

        var complete_status = '100%';

        var overstep = '已超越';

        context.save();

        context.setFontSize(18);

        context.setTextAlign('left');

        context.setTextBaseline('top');

        context.setFillStyle('#323232');

        context.fillText(gender, 40, 431);



        context.setFontSize(18);

        context.setTextAlign('left');

        context.setTextBaseline('top');

        context.setFillStyle('#323232');

        context.fillText(age, 128, 431);



        context.setFontSize(18);

        context.setTextAlign('left');

        context.setTextBaseline('top');

        context.setFillStyle('#323232');

        context.fillText(complete_status, 218, 431);


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