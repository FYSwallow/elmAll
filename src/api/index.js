import ajax from '@/api/api'

/**
 * 获取首页默认地址
 */

//  如果箭头函数只有一行语句，可以省略大括号，并且省略return关键字。
export const cityGuess = () => ajax('/v1/cities', {
        type: 'guess'
    })
    /**
     * 获取首页热门城市
     */

export const hotcity = () => ajax('/v1/cities', {
        type: 'hot'
    })
    /**
     * 获取首页所有城市
     */

export const groupcity = () => ajax('/v1/cities', {
        type: 'group'
    })
    /**
     * 根据id获取当前所在城市
     */

export const currentcity = number => ajax('/v1/cities/' + number)

// 获取搜索地址

export const searchplace = (cityid, value) => ajax('/v1/pois', {
    type: 'search',
    city_id: cityid,
    keyword: value
});
/**
 * 获取msite页面地址信息
 */

export const msiteAddress = geohash => ajax('/v2/pois/' + geohash);

/**
 * 获取msite页面食品分类列表
 */

export const msiteFoodTypes = geohash => ajax('/v2/index_entry', {
    geohash,
    group_type: '1',
    'flags[]': 'F'
});

// 获取商铺列表

export const shopList = (latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
    let supportStr = ''
    support_ids.forEach(item => {
        if (item.status) {
            supportStr += '&support_ids[]=' + item.id
        }
    })
    let data = {
        latitude,
        longitude,
        offset,
        limit: '20',
        'extras[]': 'activities',
        keyword: '',
        restaurant_category_id,
        'restaurant_category_ids[]': restaurant_category_ids,
        order_by,
        'delivery_mode[]': delivery_mode + supportStr
    }
    return ajax('/shopping/restaurants', data)
}

/**
 * 获取food页面的 category 种类列表
 */

export const foodCategory = (latitude, longitude) => ajax('/shopping/v2/restaurant/category', {
    latitude,
    longitude
});


/**
 * 获取food页面的配送方式
 */

export const foodDelivery = (latitude, longitude) => ajax('/shopping/v1/restaurants/delivery_modes', {
    latitude,
    longitude,
    kw: ''
});


/**
 * 获取food页面的商家属性活动列表
 */

export const foodActivity = (latitude, longitude) => ajax('/shopping/v1/restaurants/activity_attributes', {
    latitude,
    longitude,
    kw: ''
});

// 获取search页面搜索结果
export const searchRestaurant = (geohash, keyword) => ajax('/v4/restaurants', {
        'extras[]': 'restaurant_activity',
        geohash,
        keyword,
        type: 'search'
    })
    /**
     * 获取图片验证码
     */

export const getcaptchas = () => ajax('/v1/captchas', {}, 'POST');

/**
 * 账号密码登录
 */
export const accountLogin = (username, password, captcha_code) => ajax('/v2/login', { username, password, captcha_code }, 'POST');

/**
 * 改密码
 */
export const changePassword = (username, oldpassWord, newpassword, confirmpassword, captcha_code) => fetch('/v2/changepassword', { username, oldpassWord, newpassword, confirmpassword, captcha_code }, 'POST');

/**
 * 搜索地址
 */

export const searchNearby = keyword => ajax('/v1/pois', {
    type: 'nearby',
    keyword
})

/**
 * 获取shop页面商铺详情
 */

export const shopDetails = (shopid, latitude, longitude) => ajax('/shopping/restaurant/' + shopid, {
    latitude,
    longitude: longitude + '&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics'
})

/**
 * 获取shop页面菜单列表
 */

export const foodMenu = restaurant_id => ajax('/shopping/v2/menu', {
    restaurant_id
})