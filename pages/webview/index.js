
Page({

    data: {

        http_src: null
    },
    onLoad: function (options) {

        var that = this;

        // console.log(options.http_src);

        that.setData({

            http_src: options.http_src

        });

    }

});