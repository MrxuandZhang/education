/**
 * 日期处理工具
 */
+(function(window){

    var DateUtils = function(){

        /**
         * 格式化时间 yyyy-MM-dd hh:mm:ss
         * @param timestamp
         * @returns {string}
         */
        this.format = function(timestamp){
            var date = new Date(timestamp);
            return date.getFullYear() + '-' + paddingZero((date.getMonth() + 1)) + '-' + paddingZero(date.getDate()) + '  '
                + paddingZero(date.getHours()) + ':' + paddingZero(date.getMinutes()) + ':' + paddingZero(date.getSeconds());
        };

        /**
         * 格式化时间 yyyy-MM-dd hh:mm
         * @param timestamp
         * @returns {string}
         */
        this.formatyyyyMMddHHmm = function(timestamp){
            var date = new Date(timestamp);
            return date.getFullYear() + '-' + paddingZero((date.getMonth() + 1)) + '-' + paddingZero(date.getDate()) + '  '
                + paddingZero(date.getHours()) + ':' + paddingZero(date.getMinutes());
        };

        /**
         * 格式化时间 MM月dd日
         * @param timestamp
         * @returns {string}
         */
        this.formatMMdd = function(timestamp){
            var date = new Date(timestamp);
            return paddingZero((date.getMonth() + 1)) + '月' + paddingZero(date.getDate()) + '日';
        };

        /**
         * 格式化时间 HH:mm
         * @param timestamp
         * @returns {string}
         */
        this.formatHHmm = function(timestamp){
            var date = new Date(timestamp);
            return paddingZero(date.getHours()) + ':' + paddingZero(date.getMinutes());
        };

        /**
         * 格式化时间 hh:mm:ss
         * @param timestamp
         * @returns {string}
         */
        this.formatHHmmss = function(timestamp){
            var date = new Date(timestamp);
            return paddingZero(date.getHours()) + ':' + paddingZero(date.getMinutes()) + ':' + paddingZero(date.getSeconds());
        };

        /**
         * 格式化时间 yyyy-MM-dd
         * @param timestamp
         * @returns {string}
         */
        this.formatYYYYMMDD = function(timestamp){
            var date = new Date(timestamp);
            return paddingZero(date.getFullYear()) + '-' + paddingZero((date.getMonth() + 1)) + '-' + paddingZero(date.getDate());
        };

        this.getTodayDate = function(){
            var date = new Date();
            return paddingZero(date.getFullYear()) + '-' + paddingZero((date.getMonth() + 1)) + '-' + paddingZero(date.getDate());
        };

        /**
         * 小于10的数字前加0
         * @param number
         * @returns {*}
         */
        function paddingZero(number){
            return (number < 10) ? ('0' + number) : number;
        }
    };

    window.DateUtils = new DateUtils();

})(window);