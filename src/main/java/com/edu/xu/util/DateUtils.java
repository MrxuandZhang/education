package com.edu.xu.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

/**
 * @author sumory.wu
 * @date 2011-9-17 上午12:23:15
 * @version 2.0
 */
public class DateUtils {

    public final static String formatStr_yyyyMMddHHmmss = "yyyy-MM-dd HH:mm:ss";
    public final static String formatStr_yyyyMMddHHmm = "yyyy-MM-dd HH:mm";
    public final static String formatStr_yyyyMMddHH = "yyyy-MM-dd HH";
    public final static String formatStr_yyyyMMdd = "yyyy-MM-dd";
    public final static String formatStr_yyyy年MM月dd日HHmm = "yyyy年MM月dd日 HH:mm";
	public final static String formatStr_MMdd_EE_HHmm = "MM/dd EEEE HH:mm";
	public final static String formatStr_HHmm = "HH:mm";
	public final static String formatStr_MMdd = "MM/dd";
	public final static String formatStr_MMdd2 = "MM月dd日";
	public final static String formatStr_MMddHHmm = "MM-dd HH:mm";
	public final static String formatStr_yyyyMMddHHmmss1 = "yyyy/MM/dd HH:mm:ss";
	public final static String formatStr_yyyyMMddHHmmss2 = "yyyyMMddHHmmss";
	public final static String formatStr_HHMMSS = "HH:mm:ss";
	public final static String formatStr_MM = "MM";
	public final static String formatStr_D = "d";
	
	
	 public static String DateToString(Date date) {
	        try {
	            return new SimpleDateFormat(formatStr_yyyyMMddHHmmss).format(date);
	        }
	        catch (Exception e) {
	            e.printStackTrace();
	            return "";
	        }
	    }

    public static String DateToString(long timestamp, String toFormatStr) {
        try {
            return new SimpleDateFormat(toFormatStr).format(timestamp);
        }
        catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }

    public static String DateToString(Date date, String toFormatStr) {
        try {
            return new SimpleDateFormat(toFormatStr).format(date);
        }
        catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }

    public static String DateToString(java.sql.Date date, String toFormatStr) {
        try {
            return new SimpleDateFormat(toFormatStr).format(date);
        }
        catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }

    public static Date StringToDate(String dateString, String strFormat) {
        try {
            Date date = new SimpleDateFormat(strFormat).parse(dateString);
            return date;
        }
        catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }



    public static java.sql.Timestamp stringToTimestamp(String dateString, String strFormat) {
        return new java.sql.Timestamp(StringToDate(dateString,strFormat).getTime());
    }

    public static java.sql.Timestamp stringToTimestampAddDays(String dateString, String strFormat,int days) {
        return new java.sql.Timestamp(StringToDate(dateString,strFormat).getTime() + days*1000*60*60*24);
    }


    public static java.sql.Date toSQLDate(Date date) {
        return new java.sql.Date(date.getTime());
    }

    public static java.sql.Timestamp toTimestamp(Date date) {
        return new java.sql.Timestamp(date.getTime());
    }

    public static java.sql.Timestamp toTimestamp(java.sql.Date date) {
        return new java.sql.Timestamp(date.getTime());
    }

    public static Date toUtilDate(java.sql.Date date) {
        return new Date(date.getTime());
    }

    
    /**
     * 得到 前/后 几天的时间
     * @author zhangjunhao 2015-1-30 上午11:10:37 
     *
     * @param day
     * @param now
     * @param format
     * @return
     */
    public static String getSomeDate(int day, Date now, String format) {
        try {
            Calendar date = Calendar.getInstance();
            date.setTime(now);
            date.add(Calendar.DATE, day);
            return DateToString(date.getTime(), format);
        }
        catch (Exception e) {
            e.printStackTrace();
            return "";
        }

    }
    
    
    public static void main(String[] args) {
		System.out.println(getMaxDay(System.currentTimeMillis()));
    	System.out.println(getSomeDate(15, new Date(), DateUtils.formatStr_yyyyMMddHHmmss));
	}
    
    /**
     * 得到几天前的时间
     * 
     * @param day
     * @return
     */
    public static String getSomeDate(int day) {
        try {
            Calendar date = Calendar.getInstance();
            date.add(Calendar.DATE, -day);// 向前推day
            return DateToString(date.getTime(), "yyyy-MM-dd");
        }
        catch (Exception e) {
            e.printStackTrace();
            return "";
        }

    }
    
    /**
	 * 比较时间是否是同一天
	 * @author zhangjunhao 2015-3-14 下午2:21:16 
	 *
	 * @param date1
	 * @param date2
	 * @return [1, 2015, 2, 11, 2, 14, 73, 7, 2, 0, 0, 0, 0, 0, 0, 28800000, 0]
	 */
	public static boolean compareEqualDate(Date date1, Date date2) {
		try {
			/*Calendar c1 = Calendar.getInstance();
			Calendar c2 = Calendar.getInstance();
			c1.setTime(date1);
			c2.setTime(date2);
			c1.set(c1.get(Calendar.YEAR), c1.get(Calendar.MONTH), c1.get(Calendar.DAY_OF_MONTH), 0, 0, 0);
			c2.set(c2.get(Calendar.YEAR), c2.get(Calendar.MONTH), c2.get(Calendar.DAY_OF_MONTH), 0, 0, 0);*/
			// 如果比赛时间在他前两个小时前面 
			//c2.add(Calendar.HOUR, -2);
			String c1 = DateToString(date1, formatStr_yyyyMMdd);
			String c2 = DateToString(date2, formatStr_yyyyMMdd);
			return c1.equals(c2); 
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	/**
	 * 比较时间
	 * @author zhangjunhao 2015-3-4 下午4:38:01 
	 *
	 * @param date1
	 * @param date2
	 * @return false: { date1 < date2 }, true: { date1 > date2 }
	 */
	public static boolean compareDate(Date date1, Date date2) {
		try {
			Calendar c1 = Calendar.getInstance();
			Calendar c2 = Calendar.getInstance();
			c1.setTime(date1);
			c2.setTime(date2);
			// 如果比赛时间在他前两个小时前面
			//c2.add(Calendar.HOUR, -2);
			if (c1.before(c2)) {
				return false;
			}
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return true;
		}
	}
	
	/**
	 * 选择两个时间中较大的一个
	 * @param date1
	 * @param date2
	 * @return
	 */
	public static String getMaxDate(String date1, String date2){
		Date comDate1 = StringToDate(date1, formatStr_yyyyMMdd);
		Date comDate2 = StringToDate(date2, formatStr_yyyyMMdd);
		if(comDate1.after(comDate2)){
			return date1;
		}else
			return date2;
	}
	
	/**
	 * 年份计算
	 * @param date
	 * @param year
	 * @return
	 */
	public static String getDateByYear(Date date, int year){
		try {
			Calendar cal=Calendar.getInstance();
			cal.setTime(date); 
            cal.add(Calendar.YEAR, year);//
            return DateToString(cal.getTime(), "yyyy-MM-dd");
        }
        catch (Exception e) {
            e.printStackTrace();
            return "";
        }
	}
	
	/**
	 * 得到两个时间的月份差
	 *@author lanyuping
	 * @param date1
	 * @param date2
	 * @return
	 * @throws ParseException
	 *@data 2016年9月7日 下午3:11:52
	 */
	public static Integer getMonthSpace(String date1, String date2)throws ParseException {
        Integer result = 0;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar c1 = Calendar.getInstance();
        Calendar c2 = Calendar.getInstance();
        c1.setTime(sdf.parse(date1));
        c2.setTime(sdf.parse(date2));
        result = c2.get(Calendar.MONTH) - c1.get(Calendar.MONTH);
        return result == 0 ? 1 : Math.abs(result);

    }

	/**
     * 获取系统当前时间
     * @return
     */
    public static String getNowTime(String type) {
        SimpleDateFormat df = new SimpleDateFormat(type);
        return df.format(new Date());
    }
    
    /**
     * 某得最近几天的数遍记录
     * @author heshenmi
     * 2017年9月17日 下午1:30:23
     * @param dateType
     * @return
     */
    public static String getDateZero(int dateType){
    	Calendar cal=Calendar.getInstance();
    	
    	switch (dateType) {
			case 0:
				break;
			case 1:
				cal.add(Calendar.DATE, -7);
				break;
			case 2:
				cal.add(Calendar.DATE, -30);
				break;
			default:
				break;
		}
//    	String dateStr = DateToString(cal.getTime(), "yyyy-MM-dd") + " 00:00:00";
//    	return StringToDate(dateStr, formatStr_yyyyMMddHHmmss);
    	return DateToString(cal.getTime(), "yyyy-MM-dd") + " 00:00:00";
    	
    }
    
    /**
     * 获得天数往前往后的日期
     * @author heshenmi
     * 2017年11月27日 下午5:03:43
     * @param days
     * @return
     */
    public static Date getBeforeDays(int days){
	    Date date=new Date();//取时间  
	    Calendar calendar = new GregorianCalendar();  
	    calendar.setTime(date);  
	    calendar.add(Calendar.DATE,days);//把日期往后增加一天.整数往后推,负数往前移动  
	    date=calendar.getTime(); //这个时间就是日期往后推一天的结果  
	    return date;
    }

	/**
	 * 获取年份月的最大值
	 * @param time 时间撮
	 * @return 返回最大天数
	 */
	public static int getMaxDay(long time){
		Date date = new Date(time);
		Calendar calendar = new GregorianCalendar();
		calendar.setTime(date);
		int year = calendar.get(Calendar.YEAR);
		int month = calendar.get(Calendar.MONTH) + 1;
		return getMaxDay(year,month);
    }
	
	/**
	 * 获取年份月的最大值
	 * @param time 时间撮
	 * @return 返回最大天数
	 */
	public static int getMaxDay(Date date){
		Calendar calendar = new GregorianCalendar();
		calendar.setTime(date);
		int year = calendar.get(Calendar.YEAR);
		int month = calendar.get(Calendar.MONTH) + 1;
		return getMaxDay(year,month);
    }

	/**
	 * 获取制定年份制定月的最大天数
	 * @param year 年份
	 * @param month 月份
	 * @return 返回对应的最大天数
	 */
    public static int getMaxDay(long year,int month){
		if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
			return 31;
		}else if(month ==2){
			if((year % 4 == 0 && year % 100 != 0) || year % 400 ==0){
				return 29;
			}
			return 28;
		}
		return 30;
	}

	/**
	 * 时间切片
	 * @author MrHanHao
	 * @date 2019-02-18 17:09:52
	 * @param splitType 切分类型  按照天数{@link Calendar#DATE}  按照月份{@link Calendar#MONTH}  按照年份{@link Calendar#YEAR}
	 * @param size 切分大小，默认1  1 天 1 月 1年
	 * @param start 起始时间
	 * @param end 结束时间
	 * @return 返回切分的时间戳
	 */
	public static List<Long> splitTimeStamp(int splitType,int size,Date start,Date end){

    	Calendar startCalendar = Calendar.getInstance();
    	Calendar endCalendar = Calendar.getInstance();
    	List<Long> times = new ArrayList<>(8);
		startCalendar.setTime(start);
		startCalendar.set(Calendar.MILLISECOND,0);
		startCalendar.set(Calendar.HOUR,0);
		startCalendar.set(Calendar.MINUTE,0);
		startCalendar.set(Calendar.SECOND,0);
		endCalendar.setTime(end);
		endCalendar.set(Calendar.MILLISECOND,999);
		endCalendar.set(Calendar.HOUR,23);
		endCalendar.set(Calendar.MINUTE,59);
		endCalendar.set(Calendar.SECOND,59);
    	while (startCalendar.getTimeInMillis()  < endCalendar.getTimeInMillis()){
    		times.add(startCalendar.getTimeInMillis());
			startCalendar.add(splitType,Math.max(1,size));
		}
		return times;
	}

	/**
	 * 分割时间
	 * @author MrHanHao
	 * @date 2019-02-20 09:33:10
	 * @param splitType 分割类型：详情请参考{@link Calendar} {@link #splitTimeStamp(int, int, Date, Date)}
	 * @param size 分割大小
	 * @param start 起始时间
	 * @param end 结束时间
	 * @return 返回日期对象
	 */
	public static List<Date> splitTimeDate(int splitType,int size,Date start,Date end){
		Calendar startCalendar = Calendar.getInstance();
		Calendar endCalendar = Calendar.getInstance();
		List<Date> dates = new ArrayList<>(8);
		startCalendar.setTime(start);
		startCalendar.set(Calendar.MILLISECOND,0);
		startCalendar.set(Calendar.HOUR,0);
		startCalendar.set(Calendar.MINUTE,0);
		startCalendar.set(Calendar.SECOND,0);
		endCalendar.setTime(end);
		endCalendar.set(Calendar.MILLISECOND,999);
		endCalendar.set(Calendar.HOUR,23);
		endCalendar.set(Calendar.MINUTE,59);
		endCalendar.set(Calendar.SECOND,59);
		while (startCalendar.getTimeInMillis()  < endCalendar.getTimeInMillis()){
			dates.add(startCalendar.getTime());
			startCalendar.add(splitType,Math.max(1,size));
		}
		return dates;
	}
	/**
	 * 时间切片
	 * @author MrHanHao
	 * @date 2019-02-18 17:09:52
	 * @param splitType 切分类型  按照天数"D"  按照月份 "M"  按照年份 Y
	 * @param size 切分大小，默认1  1 天 1 月 1年
	 * @param start 起始时间
	 * @param end 结束时间
	 * @return 返回切分的时间戳
	 */
	public static List<Long> splitTimeStamp(String splitType,int size,Date start,Date end){
		int type = Calendar.DATE;
		if("M".equals(splitType)){
			type = Calendar.MONTH;
		}else if("Y".equals(splitType)){
			type = Calendar.YEAR;
		}
		return splitTimeStamp(type,size,start,end);
	}
	/**
	 * 分割时间
	 * @author MrHanHao
	 * @date 2019-02-20 09:33:10
	 * @param splitType 切分类型  按照天数"D"  按照月份 "M"  按照年份 Y
	 * @param size 分割大小
	 * @param start 起始时间
	 * @param end 结束时间
	 * @return 返回日期对象
	 */
	public static List<Date> splitTimeDate(String splitType,int size,Date start,Date end){
		int type = Calendar.DATE;
		if("M".equals(splitType)){
			type = Calendar.MONTH;
		}else if("Y".equals(splitType)){
			type = Calendar.YEAR;
		}
		return splitTimeDate(type,size,start,end);
	}

	/**
	 * 获取当前时间所在时间线上的事件
	 * @author MrHanHao
	 * @date 2019-02-19 11:27:08
	 * @param now 当前时间
	 * @param timeLine 时间线集合
	 * @return 返回所在的时间时间线上的时间
	 */
	public  static Date getTimeByTimeLine(Date now,List<Long> timeLine){
		for(int i =0; i < timeLine.size(); i++){
			 if(i + 1 >= timeLine.size() && now.getTime() > timeLine.get(i)){
			 	return new Date(timeLine.get(i));
			 }else if(now.getTime() > timeLine.get(i) && now.getTime() < timeLine.get(i + 1)){
				 return new Date(timeLine.get(i));
			 }
		}
		return null;
	}

	/**
	 * 获取当前时间所在时间线上的事件
	 * @author MrHanHao
	 * @date 2019-02-19 11:27:08
	 * @param now 当前时间
	 * @param timeLine 时间线集合
	 * @return 返回所在的时间时间线上的时间
	 */
	public  static Date getTimeByDateLine(Date now,List<Date> timeLine){
		for(int i =0; i < timeLine.size(); i++){
			if(i + 1 >= timeLine.size() && now.getTime() > timeLine.get(i).getTime()){
				return timeLine.get(i);
			}else if(now.getTime() > timeLine.get(i).getTime() && now.getTime() < timeLine.get(i + 1).getTime()){
				return timeLine.get(i);
			}
		}
		return null;
	}

	/**
	 * 计算两个时间的差
	 * @author MrHanHao
	 * @date 2019-02-21 17:28:32
	 * @param start 起始时间
	 * @param end 结束时间
	 * @return 返回相差多少天
	 */
	public static long getTimeDiff(Date start,Date end){
		long day = 24 * 60 * 60 * 1000;
		long diff = end.getTime() - start.getTime();
		if(diff > 0){
			return ( diff + day - 1) / day;
		}
		return ( diff - day + 1) / day;
	}
}
