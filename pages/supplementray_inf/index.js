
const app=getApp();


Page({

    data:{

        participation_degree_index:0,
        participation_degree: [['几乎不', '偶尔','一般', '经常', '总是']],
        spit_milk_index:0,
        spit_milk:[['从不','轻微','一般','频繁']],
        allergy_status_index: 0,
        allergy_status:[['无','有']],
        sleep_type_index:0,
        sleep_type: [['自然入睡', '抱睡', '奶睡', '推车哄睡','开车哄睡','其他']],
        is_independent_sleep_index:0,
        is_independent_sleep:[['是','否']],


        checkboxChange_motion_inf:[],
        checkboxChange_movement_inf:[],

        show_tip_msg: '',
        showToast: false
    },
    checkboxChange_motion:function(e){

       var that=this;

       that.setData({
           
           checkboxChange_motion_inf: e.detail.value

       });

    },
    checkboxChange_movement:function(e){
              
        var that=this;

        that.setData({

            checkboxChange_movement_inf: e.detail.value

        });    

    },
    submit_report:function(e){

        var that=this;

        // 过敏源
        var allergen = e.detail.value.allergen;

        var checkboxChange_motion_inf = that.data.checkboxChange_motion_inf;

        var checkboxChange_movement_inf = that.data.checkboxChange_movement_inf;

        if (allergen==''){

            wx.showToast({
                title: '请输入过敏源',
                icon: 'loading',
                duration: 1000
            });

            return;
        } else if (checkboxChange_motion_inf.length==0){

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


        var checkboxChange_motion_inf_str =null;

        var checkboxChange_movement_inf_str = null;


        for (var i = 0; i < checkboxChange_motion_inf.length;i++){

            if (i ==0){

                checkboxChange_motion_inf_str = checkboxChange_motion_inf[i];

            }else{

                checkboxChange_motion_inf_str += ','+checkboxChange_motion_inf[i];

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
            url: app.globalData.url +'index.php/api/User/ti_report',
            data:{
           
                uid:wx.getStorageSync('uid'),
                baba_canyu: Number(that.data.participation_degree_index)+1,
                fanliu_chengdu: Number(that.data.spit_milk_index) + 1,
                food_guomin: Number(that.data.allergy_status_index) + 1,
                guomin_source: allergen,
                sleep_method: Number(that.data.sleep_type_index) + 1,
                is_alone: Number(that.data.is_independent_sleep_index) + 1,
                big_yundong: checkboxChange_motion_inf_str,
                xi_yundong: checkboxChange_movement_inf_str
            },
            success:function(res){

                if(res.data.status==200){

                    wx.showToast({
                        title: '提交成功',
                        icon: 'loading',
                        duration: 1000
                    });

                    setTimeout(function(){

                        wx.navigateBack({
                            delta:2
                        });

                    },1000);

                }else{

                    wx.showToast({
                        title: '提交失败',
                        icon:'loading',
                        duration:1000
                    });
                }
            },
            fail:function(res){

                wx.showToast({
                    title: '提交失败',
                    icon: 'loading',
                    duration: 1000
                });

            }
        })

       

    }
  
})