
var app = getApp();
const ctx = wx.createCanvasContext('myCanvas');

Page({

    data: {
        img_src: null,
        src: null,
        width: 0,

        // 是否为ios,
        model: null
    },
    onLoad: function (option) {

        var that = this;

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

        wx.showLoading({
            title: '绘制中',
        });

        that.draw_img(context);

        that.draw_head_img(context);

        that.draw_nickname_and_gender(context);

        that.draw_table_content(context);

        // wx.request({
        //     url: app.globalData.url + 'index.php?g=&m=api&a=activity_details_api',
        //     data: {
        //         user_openid: wx.getStorageSync('openid'),
        //         id: option.id
        //     },
        //     success: function (res) {

        //         if (res.data.status == 1) {

        //             that.setData({

        //                 cover: res.data.data.cover,
        //                 founder_user_img: res.data.data.founder_user_img,
        //                 code_src_img: wx.getStorageSync('code_src_img'),
        //                 founder_user_nickname: res.data.data.founder_user_nickname,
        //                 title: res.data.data.title,
        //                 slogan: res.data.data.slogan

        //             });
        //             wx.showLoading({
        //                 title: '加载中',
        //             });

        //         }
        //     }
        // });

    },
    draw_img: function (context) {

        var that = this;

        var qrcodeUrl = '../../img/draw_img.png';

        console.log('ceshi');

        var width = 290;
        var height = 155;

        var set_height = height + (that.data.width - 290);

        context.save();

        context.drawImage(qrcodeUrl, 0, 0, 320, 568);

        context.draw(true);

        // setTimeout(function () {

        //     context.draw(true, function () {


        //     });

        // }, 200);

    },

    draw_head_img: function (context) {

        var that = this;

        var path = '../../img/head.jpg';

        // var path = res.path;

        context.save();
        context.beginPath();

        context.arc(66, 315, 25, 0, 2 * Math.PI)
        // context.fill();
        context.clip()
        context.drawImage(path, 41, 289, 50, 50);

        context.closePath();

        context.restore();

        context.draw(true);

        // context.draw(true, function (e) {

        //     // that.setTitle(context);

        // })
    },

    // 绘制昵称
    draw_nickname_and_gender: function (context){

        var that = this;

        var title = '微信昵称';

        var introduce='我家萌宝叫X，是个男宝宝';

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

        // setTimeout(function () {

        //     context.draw(true, function () {

        //         // that.setMsg(context);

        //     });

        // }, 200);



    },

    // 绘制表格内容
    draw_table_content: function (context){

        var that = this;

        var age_month= '4个月';

        var age_day = '10天';

        var height = '50';

        var small_font='%小伙伴'

        var weight = '50';

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


        context.setFontSize(10);

        context.setTextAlign('left');

        context.setTextBaseline('top');

        context.setFillStyle('#323232');

        context.fillText(overstep, 128, 417);
        

        context.setFontSize(18);

        context.setTextAlign('left');

        context.setTextBaseline('top');

        context.setFillStyle('#323232');

        context.fillText(height, 128, 431);


        context.setFontSize(10);

        context.setTextAlign('left');

        context.setTextBaseline('top');

        context.setFillStyle('#323232');

        context.fillText(small_font, 154, 441);


        context.setFontSize(10);

        context.setTextAlign('left');

        context.setTextBaseline('top');

        context.setFillStyle('#323232');

        context.fillText(overstep, 218, 417);


        context.setFontSize(18);

        context.setTextAlign('left');

        context.setTextBaseline('top');

        context.setFillStyle('#323232');

        context.fillText(weight, 218, 431);


        context.setFontSize(10);

        context.setTextAlign('left');

        context.setTextBaseline('top');

        context.setFillStyle('#323232');

        context.fillText(small_font, 244, 441);

        console.log('绘图');

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
                    }
                });

            });

        }, 200);


    },

    setBg: function (context) {

        var that = this;

        var qrcodeUrl = that.data.cover;

        var width = 290;
        var height = 155;

        var set_height = height + (that.data.width - 290);

        wx.getImageInfo({

            src: qrcodeUrl,

            success: function (res) {
                var path = res.path;

                context.save();

                context.drawImage(path, 15, 156, 290, 170);

                setTimeout(function () {

                    context.draw(true, function () {

                        that.setQrcode(context);

                    });

                }, 200);

            },

            file: function (res) {

                console.log(res);

            }
        })
    },
    setTitle: function (context) {

        var that = this;

        var title = this.data.founder_user_nickname;

        context.save();

        context.setFontSize(18);

        context.setTextAlign('left');

        context.setTextBaseline('top');

        context.setFillStyle('#2A2A2A');

        context.fillText(title, 96, 19);

        setTimeout(function () {

            context.draw(true, function () {

                that.setMsg(context);

            });

        }, 200);

    },
    setMsg: function (context) {

        var that = this;

        context.save();

        context.setFontSize(16);

        context.setTextAlign('left');

        context.setTextBaseline('bottom');

        context.setFillStyle('#2A2A2A');

        context.fillText('发布了一个组队活动', 96, 77);

        setTimeout(function () {

            context.draw(true, function () {

                that.setTitles(context);

            });

        }, 200);


    },
    setTitles: function (context) {

        var that = this;
        var title = this.data.title;

        context.save();

        context.setFontSize(20);

        context.setTextAlign('left');

        context.setTextBaseline('top');

        context.setFillStyle('#2A2A2A');

        context.fillText(title, 15, 93);

        setTimeout(function () {

            context.draw(true, function () {

                that.setslogan(context);

            });

        }, 200);
    },
    setTip: function (context) {

        var that = this;

        context.save();

        context.setFontSize(12);

        context.setTextAlign('center');

        context.setTextBaseline('top');

        context.setFillStyle('#000000');

        context.fillText('长按扫码 参加活动', 160, 426);

        setTimeout(function () {

            context.draw(true, function () {

                setTimeout(function () {

                    wx.hideLoading();

                    wx.canvasToTempFilePath({
                        x: 0,
                        y: 0,
                        canvasId: 'myCanvas',
                        fileType: 'png',
                        quality: 1,
                        success: function (res) {

                            

                            
                            that.setData({

                                img_src: res.tempFilePath

                            });
                        }
                    });

                }, 300);


            });

        }, 200);
    },
    setslogan: function (context) {

        var that = this;

        var title = this.data.slogan;

        context.save();

        context.setFontSize(18);

        context.setTextAlign('left');

        context.setTextBaseline('top');

        context.setTextBaseline('#2A2A2A');

        context.setFillStyle('#000000');

        if (that.data.model) {

            context.fillText(title, 15, 142);

        } else {

            context.fillText(title, 15, 126);

        }

        setTimeout(function () {

            context.draw(true, function () {

                that.setBg(context);

            });

        }, 200);

    },
    setQrcode: function (context) {

        var that = this;

        var HandleUrl = this.data.code_src_img;

        console.log(HandleUrl);

        wx.getImageInfo({

            src: HandleUrl,

            success: function (res) {

                var path = res.path;

                context.save();

                context.drawImage(path, 125, 341, 70, 70);

                context.draw(true, function () {

                    that.setTip(context);

                });

            },

            file: function (res) {

                console.log(res);

            }

        })

    },
    setHandle: function (context) {

        var that = this;

        var path = that.data.founder_user_img

        wx.getImageInfo({

            src: path,

            success: function (res) {

                context.save();
                context.beginPath();
                context.rect(0, -5, that.data.width, 910);
                context.setFillStyle('white');
                context.closePath();
                context.fill();
                context.restore();

                var path = res.path;

                context.save();
                context.beginPath();

                context.arc(48, 48, 28, 0, 2 * Math.PI)
                context.fill();
                context.clip()
                context.drawImage(path, 20, 20, 56, 56);

                context.closePath();

                context.restore();

                context.draw(true, function (e) {

                    that.setTitle(context);

                })

            },

            file: function (res) {

                console.log(res);

            }

        });

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
    }

});