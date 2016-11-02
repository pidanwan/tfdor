package com.crrn.tfdor.service.manage.impl;

import java.util.List;
import java.util.Map;

import com.crrn.tfdor.domain.wechat.RedPackBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crrn.tfdor.dao.WeChantDao;
import com.crrn.tfdor.domain.wechat.QrcodeImg;
import com.crrn.tfdor.service.manage.MarketingService;

@Service
public class MarketingServiceImpl implements MarketingService {
	@Autowired
	public WeChantDao weChatDao;

	@Override
	public List<QrcodeImg> qQrcodeimg() {
		return weChatDao.qQrcodeimg();
	}

	@Override
	public List<RedPackBean> queryRedPack(Map<String, Object> map) {
		return weChatDao.queryRedPack(map);
	}

}
