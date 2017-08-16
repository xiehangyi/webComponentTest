/**
 * author xhy
 * date 2017/8/14
 */
(function($,window){

    var DEFAULT = { // 公有
        style:"",
        years:10,
        direction:'bottom',
        select:null
    };

    var interval = { // 私有
        date:new Date(),
        year:"",
        month:"",
        day:""
    };

    var html = {
        input:'<input type="text" class="datepicker-input">'
    }

    var datepicker_new = function(el,options){
        this.$el = $(el);
        this.$el.css('position','relative');
        this.options = $.extend({},DEFAULT,options);

        this.interval = interval;
        this.interval.year = this.interval.date.getFullYear();
        this.interval.month = this.interval.date.getMonth();
        this.interval.day = this.interval.date.getDate();

        init.call(this);

        return this;
    };

    function init(){
        var $datepicker = this.$el.find('.datepicker');
        if($datepicker.length === 0){
            build_view.call(this);
            bind_events.call(this);
            adj_by_options.call(this);
        } else {
            return;
        }
    }

    /**
     * 构建视图
     * @Author   xhy
     * @DateTime 2017-08-15
     * @return   {[type]}   [description]
     */
    function build_view(){
        var $el = this.$el,
            options = this.options,
            datepicker,
            $datepicker,
            $input;

        // 构建datepicker
        datepicker = '<div class="datepicker" style="display:none;">';

        datepicker += build_header.call(this);
        datepicker += build_body.call(this);
        datepicker += build_footer.call(this);

        datepicker += '</div>';

        $datepicker = $(datepicker);

        // // 构建输入框
        // $input = $(html.input);
        // $input.css('height',$el.height()-5);

        // $el.append($input).append($datepicker);

        $el.append($datepicker);

        this.$datepicker = $datepicker;
        this.$input = $input;
    }

    /**
     * 绑定事件
     * @Author   xhy
     * @DateTime 2017-08-15
     * @return   {[type]}   [description]
     */
    function bind_events(){
        var that = this,
            options = this.options,
            $datepicker = that.$datepicker,
            $input = that.$input,
            $header = $datepicker.find('.datepicker-header'),
            $year = $header.find('#datepicker-year'),
            $month = $header.find('#datepicker-month'),
            $body = $datepicker.find('.datepicker-body'),
            $footer = $datepicker.find('.datepicker-footer');

        $year.change(function(){
            that.interval.year = $(this).val();
            that.interval.month = $month.val()-1;
            that.interval.day = $body.find('tbody td > .active').attr('val');
            update_body_day.call(that);
        });

        $month.change(function(){
            that.interval.month = $(this).val()-1;
            that.interval.year = $year.val();
            that.interval.day = $body.find('tbody td > .active').attr('val');
            update_body_day.call(that);
        });

        $header.find('.datepicker-icon-pre').click(function(e){
            var val = $month.val() - 1;

            eventUtil.stopPropagation(e);

            if(val === 0){
                return;
            }
            $month.val(val);
            $month.change();
        });

        $header.find('.datepicker-icon-next').click(function(e){
            var val = parseInt($month.val()) + 1;

            eventUtil.stopPropagation(e);

            if(val === 13){
                return;
            }
            $month.val(val);
            $month.change();
        });

        $footer.find('.datepicker-now').click(function(e){
            var date = that.interval.date;

            eventUtil.stopPropagation(e);

            $year.val(date.getFullYear());
            $month.val(date.getMonth()+1);

            that.interval.year = date.getFullYear();
            that.interval.month = date.getMonth();
            that.interval.day = date.getDate();

            update_body_day.call(that);
        });

        $footer.find('.datepicker-dismiss').click(function(e){
            eventUtil.stopPropagation(e);

            $datepicker.fadeOut('slow', null);
        });

        $body.on('click.td','tbody td a',function(e){
            var $this = $(this);

            eventUtil.stopPropagation(e);

            that.interval.day = parseInt($this.attr('val'));
            $this.closest('tbody').find('a.active').removeClass('active');
            $this.addClass('active');

            options.select && options.select($year.val(),$month.val(),$this.attr('val'));
        });
    }

    /**
     * 根据配置做调整
     * @Author   xhy
     * @DateTime 2017-08-16
     * @return   {[type]}   [description]
     */
    function adj_by_options(){
        var options = this.options,
            $datepicker = this.$datepicker;
        // 调整位置
        if(options.direction === 'right') {
            $datepicker.css({
                'top':'0',
                'left':'100%'
            });
        } else if(options.direction === 'bottom') {
            $datepicker.css({
                'top':'100%',
                'left':'0'
            });
        }
    }

    /***************************/

    /**
     * 构建视图头部
     * @Author   xhy
     * @DateTime 2017-08-15
     * @return   {[type]}   [description]
     */
    function build_header(){
        var header='',
            $el = this.$el,
            options = this.options,
            interval = this.interval;

        header = '<div class="datepicker-header">';

        header += '<span class="datepicker-icon-pre"></span>';

        header +='<div class="datepicker-year-month">';

        header += build_header_year.call(this);

        header += build_header_month.call(this);

        header += '</div>';

        header += '<span class="datepicker-icon-next"></span>';

        header += '</div>';

        return header;
    }

    /**
     * 构建头部的年份
     * @Author   xhy
     * @DateTime 2017-08-15
     * @return   {[type]}   [description]
     */
    function build_header_year(){
        var year = "",
            options = this.options,
            years = options.years,
            half_years = years/2,
            interval = this.interval,
            date = interval.date,
            year_now = date.getFullYear();

        year = '<select id="datepicker-year">';

        for(var i = year_now-half_years; i <= year_now+half_years; i++) {
            if(i === year_now){
                year += '<option value="'+i+'" selected>'+i+"年"+'</option>';
            } else {
                year += '<option value="'+i+'">'+i+"年"+'</option>';
            }
        }

        year += '</select>';

        return year;
    }

    /**
     * 构建头部的月份
     * @Author   xhy
     * @DateTime 2017-08-15
     * @return   {[type]}   [description]
     */
    function build_header_month(){
        var month = "",
            interval = this.interval,
            month_now = interval.month+1;

        month = '<select id="datepicker-month">';

        for(var i = 1; i <= 12; i++) {
            if(i === month_now) {
                month += '<option value="'+i+'" selected>'+i+"月"+'</option>';
            } else {
                month += '<option value="'+i+'">'+i+"月"+'</option>';
            }
        }

        month += '</select>';

        return month;

    }

    /**
     * 构建主体
     * @Author   xhy
     * @DateTime 2017-08-15
     * @return   {[type]}   [description]
     */
    function build_body(){
        var body = '';

            body += '<div class="datepicker-body"><table>';

            body += build_body_week.call(this);
            body += build_body_day.call(this);

            body += '</table></div>';

        return body;
    }

    /**
     * 构建主体星期
     * @Author   xhy
     * @DateTime 2017-08-15
     * @return   {[type]}   [description]
     */
    function build_body_week(){
        var week = '<thead><tr>',
            week_day = ['日','一','二','三','四','五','六'];

        for(var i = 0; i < 7; i++) {
            week += '<th><span title="'+"星期"+week_day[i]+'">'+week_day[i]+'</span></th>';
        }

        week += '</tr></thead>';

        return week;
    }

    /**
     * 构建主体日期
     * @Author   xhy
     * @DateTime 2017-08-15
     * @return   {[type]}   [description]
     */
    function build_body_day() {
        var days = '<tbody>',
            interval = this.interval,
            year = interval.year,
            month = interval.month,
            day = parseInt(interval.day),
            days_in_month = [31,28,31,30,31,30,31,31,30,31,30,31],
            first_date = new Date(year+"-"+(month+1)+"-"+1),
            first_day = first_date.getDay(),
            remainder = 7-first_day;

        if(year%4 === 0 || year%400 === 0){
            days_in_month[1] = 29;
        }

        days += '<tr>';

        for(var i = 0; i < first_day; i++){
            days += '<td></td>';
        }

        for(var i = 1; i <= days_in_month[month]; i++){

            if(i%7 === remainder+1){
                days += '<tr>';
            }

            if(i === day){
                days += '<td><a href="#" val="'+i+'" class="active">'+i+'</a></td>';
            } else {
                days += '<td><a href="#" val="'+i+'">'+i+'</a></td>';
            }

            if(i%7 === remainder && i === days_in_month[month]){
                days += '</tr>';
            }

        }

        days += '</tbody>';
        return days;
    }

    /**
     * 切换年份或月份时，更新日期状态
     * @Author   xhy
     * @DateTime 2017-08-15
     * @return   {[type]}   [description]
     */
    function update_body_day(){
        var $datepicker = this.$datepicker,
            $table = $datepicker.find('.datepicker-body table');

        $table.find('tbody').remove();
        $table.append($(build_body_day.call(this)));
    }

    /**
     * 构建尾部，主要是两个按钮
     * @Author   xhy
     * @DateTime 2017-08-15
     * @return   {[type]}   [description]
     */
    function build_footer(){
        var footer = '';

        footer = '<div class="datepicker-footer">';

        footer += '<div class="btn datepicker-now">现在</div>';

        footer += '<div class="btn datepicker-dismiss">关闭</div>';

        footer += '</div>';

        return footer;
    }

    datepicker_new.prototype = {
        show:function(){
            this.$el.find('.datepicker').fadeIn('slow',null);
        },
        hide:function(){
            this.$el.find('.datepicker').fadeOut('slow',null);
        }
    }

    window.datepicker_new = datepicker_new;

    // var datepicker = function(options){
    //     var datepicker = new datepicker_new(this,options);

    //     return datepicker;
    // };

    // $.fn.datepicker = datepicker;

})(jQuery,window);