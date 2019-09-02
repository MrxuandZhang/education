/**
 * 封装腾讯地图的js
 * @Author Hanhao
 * @Date 2017/11/13 20:05
 */
/**
 * 创建地图函数
 * @param option option：{ele:element对象,lat:'维度',lng:'经度',zoom:缩放默认13,isPosition:是否使用定位，默认为true,click:function(e 事件,mapele 地图原数) 点击地图点击事件}
 *  mapObject:不建议去调用里面的对象，更像是为了完成某些功能的一个必须参数
 *  mapObject:{
 *      map:qq.maps.Map对象
 *      ,geocoder:new qq.maps.Geocoder对象，地址解析对象
 *      ,object:{}绑定的其他对象
 *  }
 *
 *
 * @return mapObject
 */
function createMap(option) {
    if (!option) return;
    if (!window.qq) return;
    var ele = option.ele;
    if (!ele) return;
    //判断是否有这个对象
    var lat = option.lat || 24.4848;
    var lng = option.lng || 118.0332;
    var zoom = option.zoom || 13;
    var object = {};
    var positioning = option.isPosition == undefined ? true : option.isPosition;

    var mapObj = {
        map: {}//MAP地图对象,
        , object: object//绑定的其他对象
        , geocoder: {}//地址解析转换对象
    }

    var map = new qq.maps.Map(ele, {
        // 地图的中心地理坐标。
        center: new qq.maps.LatLng(lat, lng)
        , zoom: zoom
        //地图的默认鼠标指针样式
        , draggableCursor: "crosshair"
        //拖动地图时的鼠标指针样式
        , draggingCursor: "pointer"
    });
    mapObj.map = map;
    if (positioning) {
        var citylocation = new qq.maps.CityService({
            complete: function (r) {
                map.setCenter(r.detail.latLng);
            }
        });
    }

    mapObj.object.citylocation = citylocation;

    var geocoder = new qq.maps.Geocoder({
        complete: function (result) {
            object['result'] = result;
        },
        error: function () {
            console.log('error')
        }
    });

    mapObj.geocoder = geocoder;
    if (positioning) {
        //调用searchLocalCity();方法    根据用户IP查询城市信息。
        citylocation.searchLocalCity();
    }
    //给地图添加点击事件
    qq.maps.event.addListener(map, 'click', function (e) {
        if (option.click) {
            option.click(e, ele)
        }
    });
    return mapObj;
}

/**
 * 获取当前地图点的地址,不建议调用当前方法，请使用getAddressSyn方法 {@Code getAddressSyn}
 * 私有方法
 * @private 只能当前文件使用
 * @param mapObj mapObject对象 {@See createMap}
 * @param latLng 维经度
 * @return 地区地址对象 {@See https://lbs.qq.com/javascript_v2/doc/geocoder.html} 可能获取不到
 */
function __getAddress(mapObj, latLng) {
    //判断maoObj是否有地址解析对象
    if (mapObj.geocoder) {
        //判断mapObj绑定的是否有result对象
        if (mapObj.object.result) {
            //获取获取到地址的详细信息
            var detail = mapObj.object.result.detail;
            //地址的集合
            var addrs = [];
            detail.addrs = addrs;
            qqmap.object.addrs = addrs;//添加地址集合绑定
            //获取地址的组成部分
            var addressComponents = detail.addressComponents;//地址的组成部分
            //地址组成
            var address = addressComponents.country + addressComponents.province + addressComponents.city + addressComponents.district + addressComponents.street;
            //附近位置
            var fj = detail.nearPois[0].name
            //距离点击点最近的距离
            var min = Math.abs(latLng.lat - detail.nearPois[0].latLng.lat) + Math.abs(latLng.lng - detail.nearPois[0].latLng.lng)
            //遍历腾讯地图服务返回的点击点附近的所有地址信息
            for (var i = 1; i < detail.nearPois.length; i++) {
                /*计算最近距离，并把所有的地址信息，添加到地址集合*/
                var nearPois = detail.nearPois[i];
                var txt = address;
                //计算最近距离
                var m = Math.abs(latLng.lat - nearPois.latLng.lat) + Math.abs(latLng.lng - nearPois.latLng.lng);//计算距离差
                if (m < min) {
                    min = m;
                    fj = nearPois.name;
                }
                //存放所有可见地址
                if (addressComponents.streetNumber) {
                    txt += "【" + addressComponents.streetNumber + " " + nearPois.name + "附近】"
                } else {
                    txt += "【" + addressComponents.town + " " + nearPois.name + "附近】";
                }
                addrs.push({
                    lat: nearPois.latLng.lat,
                    lng: nearPois.latLng.lng,
                    addr: txt,
                    latlng: nearPois.latLng.lat + " " + nearPois.latLng.lng
                });
            }
            if (addressComponents.streetNumber) {
                address += "【" + addressComponents.streetNumber + " " + fj + "附近】"
            } else {
                address += "【" + addressComponents.town + " " + fj + "附近】";
            }
            detail.addressStr = address;

            return detail;
        }
    }
    return null;
}

/**
 * 获取当前地图点的地址
 * @param mapObj mapObj 对象 {@Code createMap}
 * @param latLng 维度经度
 * @param fun 回调函数 函数参数为 地区地址对象 {@See https://lbs.qq.com/javascript_v2/doc/geocoder.html}
 */
function getAddressSyn(mapObj, latLng, fun) {
    if (mapObj.geocoder) {
        //调用地址解析服务
        mapObj.geocoder.getAddress(latLng);

        var a = setInterval(function () {
            //获取地址信息
            var addressDetail = __getAddress(mapObj, latLng);
            if (addressDetail) {
                //对比获取点的坐标，避免获取上次服务的数据
                var lastLat = addressDetail.location.lat;//获取上一次的维度
                var lastLng = addressDetail.location.lng;//获取上一次的经度
                var lat = parseFloat(latLng.lat).toFixed(6);
                var lng = parseFloat(latLng.lng).toFixed(6);

                if (lastLat == lat && lastLng == lng) {

                    if (fun && typeof(fun) == 'function') {
                        fun(addressDetail)
                    }
                    //获取的到数据，关闭
                    clearInterval(a);
                }
            }
        }, 30);
    }
}

/**
 * 创建一个标记
 * @param mapObj
 * @param latlng 维度经度
 */
function createMarker(mapObj, latlng) {

    var mapInfo = mapObj.object.info;
    if (!mapInfo) {
        var info = new qq.maps.InfoWindow({map: mapObj.map});
        var marker = new qq.maps.Marker({
            map: mapObj.map,
            position: latlng
        });
        getAddressSyn(mapObj, latlng, function (result) {

            info.setContent('<div style="width:280px;height:100px;">' +
                result.addressStr + '</div>');
            info.setPosition(result.location);
        })
        mapObj.object.info = info;
        mapObj.object.marker = marker;
        qq.maps.event.addListener(marker, 'click', function (e) {

            if (mapInfo.visible) {
                mapInfo.close()
            } else {
                mapInfo.open();
            }
        });
        //鼠标进入标记，显示信息
        qq.maps.event.addListener(marker, 'mouseover', function (e) {
            var mapInfo = mapObj.object.info;
            mapInfo.open();
        });
        // //鼠标离开标记，关闭信息
        qq.maps.event.addListener(marker, 'mouseout', function (e) {
            var mapInfo = mapObj.object.info;
            mapInfo.close();
        });
    } else {
        getAddressSyn(mapObj, latlng, function (result) {
            qqmap.object.info.setContent('<div style="width:280px;height:100px;">' +
                result.addressStr + '</div>');
            qqmap.object.info.setPosition(latlng);
            mapObj.object.marker.setPosition(latlng);
        })
    }
    //自动显示2秒
    if (mapInfo) {
        if (!mapInfo.visible) {
            mapInfo.open();
            setTimeout(function () {
                mapInfo.close()
            }, 2000)
        }
    }

    return info;
}

/**
 * 创建地址选择框
 * @param mapObj createMap 回调函数参数对象 {@Code createMap }
 * @param selected 选择器
 * @param selectFun 选择值的时候触发
 * @return BootStrap Suggest对象 {@See https://github.com/lzwme/bootstrap-suggest-plugin} Hplus->表单->搜索自动补全{@See http://www.zi-han.net/theme/hplus/}
 */
function createAddressSelectBox(mapObj, selected, selectFun) {
    var input = $(selected);
    var bsSuggest = input.data("bsSuggest");
    //判断是否已经初始化
    if (bsSuggest) {
        //设置需要显示的数据
        bsSuggest.options.data.value = mapObj.object.addrs;
        bsSuggest.options.data.defaults = mapObj.object.addrs[0].addr;
        return bsSuggest;
    }
    //创建bsSuggest
    bsSuggest = __selectBox(selected, function (param) {
        param.data = {value: mapObj.object.addrs, defaults: mapObj.object.addrs[0].addr};//设置数据
        param.idField = 'latlng'; //每组数据的addr字段数据，作为input输入框的 data-id，设为 -1 且 idField 为空则不设置此值
        param.keyField = "addr";//每组数据的addr字段数据作为input输入框的内容
        param.effectiveFieldsAlias = {lat: "维度", lng: "经度", addr: "地址", "latlng": ""};    //有效字段的别名对象，用于 header 的显示
        param.showHeader = true;           //是否显示选择列表的 header。为 true 时，有效字段大于一列则显示表头
        param.showBtn = true;                //是否显示下拉按钮
        param.listAlign = "auto";         //提示列表对齐位置，left/right/auto

    });
    if (bsSuggest) {
        bsSuggest.on('onSetSelectValue', function (e, selectedData, selectedRawData) {
            if (selectFun) {
                selectFun(e, selectedData, selectedRawData)
            }
        });
    }

    return bsSuggest;
}

/**
 * 输入框下拉选择框
 * @param selected Jquery选择器
 * @param optionFun 获取配置参数函数，函数第一个参数为配置对象
 * @private
 * @return bsSuggest对象
 */
function __selectBox(selected, optionFun) {

    var $ele = $(selected);
    var bsSuggest = $ele.data("bsSuggest");
    if (bsSuggest) {
        return bsSuggest;
    }
    /*默认配置*/
    var defaultOptions = {
                // 是否可清除已输入的内容

    };
    if (optionFun && 'function' == typeof optionFun)
        optionFun(defaultOptions);
    bsSuggest = $ele.bsSuggest(defaultOptions);
    return bsSuggest;
}
