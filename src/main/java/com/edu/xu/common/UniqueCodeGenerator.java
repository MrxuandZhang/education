package com.edu.xu.common;

import com.edu.xu.util.DateUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@SuppressWarnings("restriction")
@Component
public class UniqueCodeGenerator {

    /**
     * 修改的临时方法，以后要丢弃
     *
     * @param prefix
     * @return
     * @author linweiqin
     */
//    public static String getNextOrderNumber(String prefix) {
//        return "新建成功后自动生成";
//    }

    /**
     * 获取单据编号
     *
     * @param prefix
     * @return
     * @author linweiqin
     */
//    public static String genOrderNumber(String prefix) {
//        GenParams genParams = ORDER_NUMBER_PREFIX_GENPARAMS.get(prefix);
//        Assert.state(null != genParams, "调用 genOrderNumber 方法时，prefix参数设置有误");
//        return genCommon(genParams);
//    }

    /**
     * 获取商品编码 linweiqin 2019-08-17 12:56
     *
     * @return
     */
//    public static String genProductCode() {
//        return genCommon(PRODUCT_CODE_GENPARAMS);
//    }

    /**
     * 此方法用于 客户编码
     *
     * @author xuzhangyuan
     * @date 17:47 2019/8/22
     */
//    public static String genCustomerCode() {
//        return genCommon(CUSTOMER_CODE_GENPARAMS);
//    }

    /**
     * 此方法用于 获取供应商编码
     *
     * @author xuzhangyuan
     * @date 17:48 2019/8/22
     */
//    public static String genSupplierCode() {
//        return genCommon(SUPPLIER_CODE_GENPARAMS);
//    }

    /**
     * 生成UID linweiqin 2018年11月27日 下午11:15:48
     *
     * @return
     */
    public static Long genUID() {
        return Long.parseLong(uniqueGenCommon(UID_GENPARAMS));
    }

    /**
     * 生成要保存的唯一文件名 linweiqin 2018年11月27日 下午5:11:16
     *
     * @param originalName
     * @return
     * @author linweiqin
     */
//    public static String genFileName(String originalName) {
//        Assert.state(StringUtils.isNotBlank(originalName), "文件原名不能为null");
//        int dotIndex = originalName.indexOf(".");
//        Assert.state(dotIndex > -1, "文件名必须包含后缀");
//        String suffix = originalName.substring(dotIndex, originalName.length()).toLowerCase();
//        String prefix = SUFFIX_MAP.get(suffix);
//        if (StringUtils.isBlank(prefix))
//            prefix = OSS_FILE_PREFIX.OTHER_FILE;
//        return prefix + UUID.randomUUID().toString() + suffix;
//    }

    /**
     * 生成token linweiqin 2019年2月24日 上午12:23:39
     *
     * @return
     */
//    public static String genToken() {
//        String token = (System.currentTimeMillis() + new Random().nextInt(999999999)) + "";
//        try {
//            MessageDigest md = MessageDigest.getInstance("md5");
//            byte md5[] = md.digest(token.getBytes());
//            BASE64Encoder encoder = new BASE64Encoder();
//            return encoder.encode(md5);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return null;
//    }

// =========================================================================================================================================================================================================================================================	
// ============================== ↑↑ 以上为外部调用区 ↑↑ ======================================================================================================================================================================================================
// =========================================================================================================================================================================================================================================================

//	@Override
//	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
//		synchronized (UniqueCodeGenerator.class) {
//			UniqueCodeGenerator.uniqueCodeService = applicationContext.getBean(UniqueCodeService.class);
//			// 初始化 ORDER_NUMBER_PREFIX_GENPARAMS 中所有 GenParams的increment的值
//			EntityWrapper<UniqueCode> entityWrapper = new EntityWrapper<UniqueCode>();
//			Date nowDate = new Date();
//			String yyyyMMStr = DateUtils.DateToString(nowDate, "yyyy-MM");
//			String beginDateStr = String.format("%s-01 00:00:00", yyyyMMStr);
//			String endDateStr = String.format("%s-%d 23:59:59", yyyyMMStr, DateUtils.getMaxDay(nowDate));
//			entityWrapper.ge("date", beginDateStr);
//			entityWrapper.le("date", endDateStr);
//			entityWrapper.orderBy("id", false);
//			List<UniqueCode> uniqueCodes = uniqueCodeService.selectList(entityWrapper);
//			List<GenParams> genParamsList = new ArrayList<GenParams>();
//			genParamsList.addAll(ORDER_NUMBER_PREFIX_GENPARAMS.values());
//			genParamsList.add(PRODUCT_CODE_GENPARAMS);
//			genParamsList.add(CUSTOMER_CODE_GENPARAMS);
//			genParamsList.add(SUPPLIER_CODE_GENPARAMS);
//			for (GenParams genParams : genParamsList) {
//				String uniqueCodePrefix = genParams.getPrefix() + genParams.getDateStr();
//				for (UniqueCode uniqueCode : uniqueCodes) {
//					if (uniqueCode.getPrefix().equals(uniqueCodePrefix)) {
//						genParams.setIncrement(uniqueCode.getIncrement());
//						break;
//					}
//				}
//			}
//
//        }
//    }

// =========================================================================================================================================================================================================================================================
// ============================== ↓↓ 以下为内部调用区 ↓↓ ======================================================================================================================================================================================================
// =========================================================================================================================================================================================================================================================

//    private static volatile UniqueCodeService uniqueCodeService;
//
//    /**
//     * @author linweiqin 堆栈队列。先进后出，比起 ArrayBlockingQueue
//     * 更有优势，适用于updateNextCode更新前的查询判断 避免不必要的更新
//     */
//    private static YHTStackQueue<Runnable> stackQueue = new YHTStackQueue<Runnable>(1000);

    /**
     * @author linweiqin 执行队列的线程
     */
    private static Thread runBlockingQueueThread;

    private static Boolean isStartedRunBlockingQueueThread = false;

    /**
     * @author linweiqin 文件后缀 Map
     */
    private final static Map<String, String> SUFFIX_MAP = new HashMap<String, String>();

    /**
     * @author linweiqin 生成UID所需要用到的参数常量
     */
    private final static GenParams UID_GENPARAMS = new GenParams("", 5, "longTime");

    /**
     * @author linweiqin 生成商品编码需的参数常量 2019-08-17 12:52:45
     */
    private final static GenParams PRODUCT_CODE_GENPARAMS = new GenParams("SP", 4, "yyyyMMdd");
    /**
     * @author linweiqin 生成客户的编码的参数常亮
     */
    private final static GenParams CUSTOMER_CODE_GENPARAMS = new GenParams("C", 5, "yyMMdd");
    /**
     * @author linweiqin 生成客户的编码参数常亮
     */
    private final static GenParams SUPPLIER_CODE_GENPARAMS = new GenParams("S", 5, "yyMMdd");


    /**
     * 通用生成方法 linweiqin 2018年11月27日 下午10:56:25
     *
     * @param genParams
     * @return
     */
    private static String uniqueGenCommon(GenParams genParams) {
        return genParams.getResult(1111111111111L);
    }

    /**
     * 生成唯一编号所需的参数 linweiqin 2018年11月27日 下午11:15:25
     */
    static class GenParams {
        private String prefix;
        private Integer increment;
        private String nowDateStr;
        private Integer suffixNumberLength; // 增量的最大位数。例：等于2时，则autoIncrement的值最大是99。超过了就回0
        private String dateFormatStr; // 时间格式字符串

        public GenParams() {
            super();
        }

        public GenParams(String prefix, Integer suffixNumberLength, String dateFormatStr) {
            super();
            this.prefix = prefix;
            this.increment = 0;
            this.suffixNumberLength = suffixNumberLength;
            this.dateFormatStr = dateFormatStr;
        }

        public String getResult(Long timeAddNumber) {

            String dateStr = getDateStr();
            if (timeAddNumber > 0) {
                dateStr = String.format("%d", Long.parseLong(dateStr) + timeAddNumber);
            }
            if (StringUtils.isBlank(nowDateStr)) {
                nowDateStr = dateStr;
            } else if (!dateStr.equals(nowDateStr)) {
                nowDateStr = dateStr;
                increment = 0;
            }

            StringBuffer suffixNumberStr = new StringBuffer(getAddedIncrement());
            // 需要补零的位数
            int zerofillLength = suffixNumberLength - suffixNumberStr.length();
            for (int i = 0; i < zerofillLength; i++) {
                suffixNumberStr.insert(0, "0");
            }

            suffixNumberStr.insert(0, dateStr);
            suffixNumberStr.insert(0, prefix);
            return suffixNumberStr.toString();
        }

        public String getAddedIncrement() {
            increment++;
            if (increment.toString().length() > suffixNumberLength) {
                increment = 0;
            }
            return increment.toString();
        }

        public String getDateStr() {
            if (dateFormatStr.equals("longTime"))
                return String.format("%d", new Date().getTime());
            return DateUtils.DateToString(new Date(), dateFormatStr);
        }

        public String getPrefix() {
            return prefix;
        }

        public void setPrefix(String prefix) {
            this.prefix = prefix;
        }

        public Integer getIncrement() {
            return increment;
        }

        public void setIncrement(Integer increment) {
            this.increment = increment;
        }

        public Integer getSuffixNumberLength() {
            return suffixNumberLength;
        }

        public void setSuffixNumberLength(Integer suffixNumberLength) {
            this.suffixNumberLength = suffixNumberLength;
        }

        public String getDateFormatStr() {
            return dateFormatStr;
        }

        public void setDateFormatStr(String dateFormatStr) {
            this.dateFormatStr = dateFormatStr;
        }

        public String getNowDateStr() {
            return nowDateStr;
        }

        public void setNowDateStr(String nowDateStr) {
            this.nowDateStr = nowDateStr;
        }

    }

}
