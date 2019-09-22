import ajax from '@/api/api'

/**
 * 获取首页默认地址
 */

//  如果箭头函数只有一行语句，可以省略大括号，并且省略return关键字。
export const cityGuess = () => ajax('/v1/cities',{
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

export const shopList = (latitude, longitude, offset) => {
	let data = {
		latitude,
		longitude,
		offset
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