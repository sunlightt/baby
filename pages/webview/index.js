
Page({

    data: {

        http_src: null
    },
    onLoad: function (options) {

        var that = this;

        console.log(options);

        // https://www.babyard.net

      

        if (options.type==1){
               
            that.setData({

                http_src: options.url

            });


        }else{

            that.setData({

                http_src: options.http_src

            });

        }


        console.log(that.data.http_src);

        

    }

});