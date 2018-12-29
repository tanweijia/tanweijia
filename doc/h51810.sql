/*
Navicat MySQL Data Transfer

Source Server         : mydatabase
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : h51810

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2018-12-26 17:32:56
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for car
-- ----------------------------
DROP TABLE IF EXISTS `car`;
CREATE TABLE `car` (
  `admin` varchar(255) DEFAULT NULL,
  `goodsid` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `cutprice` float(10,2) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `imgurl1` varchar(255) DEFAULT NULL,
  `timer` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of car
-- ----------------------------
INSERT INTO `car` VALUES ('13112341234', '3', '金百瑞红莓（覆盆子）速冻果200g', '18.80', '5', '../images/3b1.jpg', '2018-12-04 10:58:48');
INSERT INTO `car` VALUES ('13112341234', '1', '泰国椰青整箱装 9个', '188.00', '1', '../images/1b1.jpg', '2018-12-04 11:07:34');
INSERT INTO `car` VALUES ('13112341234', '4', '易拉罐椰皇 1粒（单果360g以上）', '23.00', '1', '../images/4b1.jpg', '2018-12-04 11:00:04');
INSERT INTO `car` VALUES ('13112341234', '2', '蒙自石榴雀斑甜果礼盒装12粒装（2.4kg以上）', '49.00', '2', '../images/2b1.jpg', '2018-12-03 23:09:24');

-- ----------------------------
-- Table structure for goodsdata
-- ----------------------------
DROP TABLE IF EXISTS `goodsdata`;
CREATE TABLE `goodsdata` (
  `goodsid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `cutprice` float(10,2) NOT NULL,
  `oldprice` float(10,2) DEFAULT NULL,
  `imgurl1` varchar(255) DEFAULT NULL,
  `imgurl2` varchar(255) DEFAULT NULL,
  `imgurl3` varchar(255) DEFAULT NULL,
  `sellqty` int(11) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `timer` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`goodsid`)
) ENGINE=MyISAM AUTO_INCREMENT=91 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goodsdata
-- ----------------------------
INSERT INTO `goodsdata` VALUES ('1', '泰国椰青整箱装 9个', '椰汁清甜沁心 椰肉香软滑嫩', '188.00', '320.00', '../images/1b1.jpg', '../images/1b2.jpg', '../images/1b3.jpg', '2820', '8460', '2018-11-30 01:21:00');
INSERT INTO `goodsdata` VALUES ('2', '蒙自石榴雀斑甜果礼盒装12粒装（2.4kg以上）', '来自北回归线上的精品甜石榴', '49.00', '98.00', '../images/2b1.jpg', '../images/2b2.jpg', '../images/2b3.jpg', '1225', '3430', '2018-11-30 01:22:00');
INSERT INTO `goodsdata` VALUES ('3', '金百瑞红莓（覆盆子）速冻果200g', '原香 原味 冻浆果更营养。', '18.80', '26.80', '../images/3b1.jpg', '../images/3b2.jpg', '../images/3b3.jpg', '658', '2632', '2018-11-30 01:23:00');
INSERT INTO `goodsdata` VALUES ('4', '易拉罐椰皇 1粒（单果360g以上）', '轻轻一拉即可随时享受美味', '23.00', '38.00', '../images/4b1.jpg', '../images/4b2.jpg', '../images/4b3.jpg', '1035', '4968', '2018-11-30 01:22:00');
INSERT INTO `goodsdata` VALUES ('5', '越南红心火龙果大果 2个共800g以上', '红色诱惑 皮薄味甜', '35.80', '79.00', '../images/5b1.jpg', '../images/5b2.jpg', '../images/5b3.jpg', '1969', '9845', '2018-11-30 01:25:00');
INSERT INTO `goodsdata` VALUES ('6', '泰国进口龙眼 2.5kg', '晶莹而甜爽多汁', '59.00', '99.00', '../images/6b1.jpg', '../images/6b2.jpg', '../images/6b3.jpg', '3835', '243', '2018-11-30 01:22:00');
INSERT INTO `goodsdata` VALUES ('7', '云南蒙自石榴8粒（单果200g以上）', '皮薄透亮，籽实晶莹', '39.00', '69.00', '../images/7b1.jpg', '../images/7b2.jpg', '../images/7b3.jpg', '2925', '2925', '2018-11-30 01:27:00');
INSERT INTO `goodsdata` VALUES ('8', '百香果 12粒装（600g以上）', '风味浓郁，芳香怡人', '19.80', '39.80', '../images/8b1.jpg', '../images/8b2.jpg', '../images/8b3.jpg', '396', '594', '2018-11-30 01:22:00');
INSERT INTO `goodsdata` VALUES ('9', '澳洲进口橙4个装（800g以上）', '阳光外衣，甜蜜内心，鲜甜共享', '22.80', '58.00', '../images/9b1.jpg', '../images/9b2.jpg', '../images/9b3.jpg', '684', '2052', '2018-11-30 01:29:00');
INSERT INTO `goodsdata` VALUES ('10', '南丰蜜桔 （约1kg）', '皮薄核少、食不存渣、酸甜适中', '15.80', '29.80', '../images/10b1.jpg', '../images/10b2.jpg', '../images/10b3.jpg', '632', '1580', '2018-11-30 01:22:00');
INSERT INTO `goodsdata` VALUES ('11', '广西金桔500g', '甜脆爽口，营养满满', '26.90', '48.00', '../images/11b1.jpg', '../images/11b2.jpg', '../images/11b3.jpg', '807', '3228', '2018-11-30 01:42:00');
INSERT INTO `goodsdata` VALUES ('12', '金百瑞黑莓速冻果200g', '富含维生素 酸甜可口 香味浓郁', '18.80', '35.00', '../images/12b1.jpg', '../images/12b2.jpg', '../images/12b3.jpg', '1692', '7614', '2018-11-30 01:22:00');
INSERT INTO `goodsdata` VALUES ('13', '越南白肉火龙果 2个装（大果·0.8-1kg）', '热情火龙果 甜蜜好口味', '18.90', '39.00', '../images/13b1.jpg', '../images/13b2.jpg', '../images/13b3.jpg', '1890', '2835', '2018-11-30 01:52:00');
INSERT INTO `goodsdata` VALUES ('14', '实建冰糖橙5kg（特级）', '系出褚老的小清新，皮薄多汁', '98.00', '139.00', '../images/14b1.jpg', '../images/14b2.jpg', '../images/14b3.jpg', '10780', '26950', '2018-11-30 01:22:00');
INSERT INTO `goodsdata` VALUES ('15', '台湾金钻凤梨 1粒（单果0.9kg以上）', '香甜细腻', '35.80', '59.00', '../images/15b1.jpg', '../images/15b2.jpg', '../images/15b3.jpg', '4296', '15036', '2018-11-30 01:12:00');
INSERT INTO `goodsdata` VALUES ('16', '象山红美人柑12个装（3kg以上）', '海上仙子国，“美人”香袭远', '198.00', '239.00', '../images/16b1.jpg', '../images/16b2.jpg', '../images/16b3.jpg', '25740', '1158', '2018-11-30 01:26:00');
INSERT INTO `goodsdata` VALUES ('17', '金百瑞蓝莓速冻果200g', '原香 原味 冻浆果更营养。', '19.90', '59.00', '../images/17b1.jpg', '../images/17b2.jpg', '../images/17b3.jpg', '2786', '15323', '2018-11-30 01:32:00');
INSERT INTO `goodsdata` VALUES ('18', '进口柠檬 6粒装（700g以上）', '肉质细嫩，水分丰富', '32.80', '38.00', '../images/18b1.jpg', '../images/18b2.jpg', '../images/18b3.jpg', '4920', '31980', '2018-11-30 01:42:00');
INSERT INTO `goodsdata` VALUES ('19', '福建琯溪三红蜜柚2粒（单果1kg以上）', '三红柚，吃起来很享受', '28.80', '49.00', '../images/19b1.jpg', '../images/19b2.jpg', '../images/19b3.jpg', '4608', '34560', '2018-11-30 01:12:00');
INSERT INTO `goodsdata` VALUES ('20', '旺顿牌热带冷冻椰子（含椰子果肉）1个', '细腻多汁，清香怡人', '32.00', '38.00', '../images/20b1.jpg', '../images/20b2.jpg', '../images/20b3.jpg', '5440', '10880', '2018-11-30 01:02:00');
INSERT INTO `goodsdata` VALUES ('21', '进口加力果6个（900g以上）', '肉质紧密 清脆甜蜜', '36.80', '59.00', '../images/21b1.jpg', '../images/21b2.jpg', '../images/21b3.jpg', '736', '2208', '2018-11-30 01:22:07');
INSERT INTO `goodsdata` VALUES ('22', '网纹瓜1个装（1-1.5kg）', '赏心悦目的高颜值蜜瓜', '39.80', '68.00', '../images/22b1.jpg', '../images/22b2.jpg', '../images/22b3.jpg', '1194', '4776', '2018-11-30 01:22:09');
INSERT INTO `goodsdata` VALUES ('23', '西州蜜瓜2粒装（约2kg）', '阳光的馈赠，甜到心尖的美味', '79.90', '89.90', '../images/23b1.jpg', '../images/23b2.jpg', '../images/23b3.jpg', '3196', '9588', '2018-11-30 01:22:10');
INSERT INTO `goodsdata` VALUES ('24', '山东精品烟台富士15个礼盒装/ 3.2kg以上', '鲜脆多汁，酸酸甜甜', '108.00', '138.00', '../images/24b1.jpg', '../images/24b2.jpg', '../images/24b3.jpg', '5400', '486', '2018-11-30 01:22:22');
INSERT INTO `goodsdata` VALUES ('25', '精选麒麟瓜 1个装 2-3kg', '果皮薄，肉色鲜红绵密，甘甜爽口水分足，入口后的丝丝清甜。', '29.00', '69.00', '../images/25b1.jpg', '../images/25b2.jpg', '../images/25b3.jpg', '1740', '5220', '2018-11-30 01:24:00');
INSERT INTO `goodsdata` VALUES ('26', '海南金煌芒1粒(500g以上)', '芒果中的大个子 纤维细 大口吃果肉 超爽', '26.80', '55.00', '../images/26b1.jpg', '../images/26b2.jpg', '../images/26b3.jpg', '1876', '5252', '2018-11-30 01:22:03');
INSERT INTO `goodsdata` VALUES ('27', '云南青芒1.5kg', '爽口清甜', '28.80', '59.00', '../images/27b1.jpg', '../images/27b2.jpg', '../images/27b3.jpg', '2304', '9216', '2018-11-30 01:42:00');
INSERT INTO `goodsdata` VALUES ('28', '泰国金枕头冷冻榴莲果肉 300g*3', '爽口嫩滑，嗅觉挑战，味蕾享受', '109.00', '168.00', '../images/28b1.jpg', '../images/28b2.jpg', '../images/28b3.jpg', '9810', '470', '2018-11-30 01:32:01');
INSERT INTO `goodsdata` VALUES ('29', '比利时啤梨4个装（520g以上）', '软妹子，请放软后食用', '23.80', '49.00', '../images/29b1.jpg', '../images/29b2.jpg', '../images/29b3.jpg', '2380', '11900', '2018-11-30 01:12:20');
INSERT INTO `goodsdata` VALUES ('30', '新疆香妃雪梨4粒 1kg', '汁多，肉脆，香气浓', '29.90', '69.00', '../images/30b1.jpg', '../images/30b2.jpg', '../images/30b3.jpg', '3289', '1907', '2018-11-30 01:42:20');
INSERT INTO `goodsdata` VALUES ('31', '云南青芒3kg', '爽口清甜', '48.80', '89.00', '../images/27b2.jpg', '../images/27b1.jpg', '../images/27b3.jpg', '5856', '5856', '2018-11-30 01:32:10');
INSERT INTO `goodsdata` VALUES ('32', '云南蒙自石榴16粒（单果400g以上）', '皮薄透亮，籽实晶莹', '69.00', '100.00', '../images/7b2.jpg', '../images/7b1.jpg', '../images/7b3.jpg', '8970', '13455', '2018-11-30 01:22:23');
INSERT INTO `goodsdata` VALUES ('33', '越南红心火龙果大果 4个共1600g以上', '红色诱惑 皮薄味甜', '25.80', '108.00', '../images/5b2.jpg', '../images/5b1.jpg', '../images/5b3.jpg', '1290', '3870', '2018-11-30 01:32:54');
INSERT INTO `goodsdata` VALUES ('34', '越南白肉火龙果 4个装（大果·1.6-2kg）', '热情火龙果 甜蜜好口味', '28.90', '64.00', '../images/13b2.jpg', '../images/13b1.jpg', '../images/13b3.jpg', '1734', '4335', '2018-11-30 01:12:06');
INSERT INTO `goodsdata` VALUES ('35', '易拉罐椰皇 2粒（单果720g以上）', '轻轻一拉即可随时享受美味', '28.00', '48.00', '../images/4b2.jpg', '../images/4b1.jpg', '../images/4b3.jpg', '1960', '7840', '2018-11-30 01:22:10');
INSERT INTO `goodsdata` VALUES ('36', '新疆香妃雪梨8粒 2kg', '汁多，肉脆，香气浓', '49.90', '72.00', '../images/30b2.jpg', '../images/30b1.jpg', '../images/30b3.jpg', '3992', '17964', '2018-11-30 01:23:01');
INSERT INTO `goodsdata` VALUES ('37', '象山红美人柑24个装（6kg以上）', '海上仙子国，“美人”香袭远', '168.00', '249.00', '../images/16b2.jpg', '../images/16b1.jpg', '../images/16b3.jpg', '15120', '680', '2018-11-30 01:32:40');
INSERT INTO `goodsdata` VALUES ('38', '西州蜜瓜2粒装（约4kg）', '阳光的馈赠，甜到心尖的美味', '59.90', '119.90', '../images/23b2.jpg', '../images/23b1.jpg', '../images/23b3.jpg', '5990', '975', '2018-11-30 01:27:04');
INSERT INTO `goodsdata` VALUES ('39', '旺顿牌热带冷冻椰子（含椰子果肉）2个', '细腻多汁，清香怡人', '52.00', '59.00', '../images/20b2.jpg', '../images/20b1.jpg', '../images/20b3.jpg', '5720', '2002', '2018-11-30 01:52:08');
INSERT INTO `goodsdata` VALUES ('40', '网纹瓜2个装（2-3kg）', '赏心悦目的高颜值蜜瓜', '29.80', '95.00', '../images/22b2.jpg', '../images/22b1.jpg', '../images/22b3.jpg', '3576', '16092', '2018-11-30 01:02:09');
INSERT INTO `goodsdata` VALUES ('41', '泰国椰青整箱装 20个', '椰汁清甜沁心 椰肉香软滑嫩', '168.00', '360.00', '../images/1b2.jpg', '../images/1b1.jpg', '../images/1b3.jpg', '21840', '120', '2018-11-30 01:08:07');
INSERT INTO `goodsdata` VALUES ('42', '泰国进口龙眼 5kg', '晶莹而甜爽多汁', '79.00', '129.00', '../images/6b2.jpg', '../images/6b1.jpg', '../images/6b3.jpg', '1580', '10270', '2018-11-30 01:42:30');
INSERT INTO `goodsdata` VALUES ('43', '泰国金枕头冷冻榴莲果肉 300g*6', '爽口嫩滑，嗅觉挑战，味蕾享受', '139.00', '189.00', '../images/28b2.jpg', '../images/28b1.jpg', '../images/28b3.jpg', '4170', '31275', '2018-11-30 01:12:03');
INSERT INTO `goodsdata` VALUES ('44', '台湾金钻凤梨 2粒（单果0.9kg以上）', '香甜细腻', '45.80', '79.00', '../images/15b2.jpg', '../images/15b1.jpg', '../images/15b3.jpg', '1832', '3664', '2018-11-30 01:52:03');
INSERT INTO `goodsdata` VALUES ('45', '实建冰糖橙10kg（特级）', '系出褚老的小清新，皮薄多汁', '198.00', '159.00', '../images/14b2.jpg', '../images/14b1.jpg', '../images/14b3.jpg', '2772', '8316', '2018-11-30 01:32:50');
INSERT INTO `goodsdata` VALUES ('46', '山东精品烟台富士30个礼盒装/ 6.4kg以上', '鲜脆多汁，酸酸甜甜', '208.00', '171.00', '../images/24b2.jpg', '../images/24b1.jpg', '../images/24b3.jpg', '3120', '12480', '2018-11-30 01:22:40');
INSERT INTO `goodsdata` VALUES ('47', '南丰蜜桔 （约2kg）', '皮薄核少、食不存渣、酸甜适中', '55.80', '63.80', '../images/10b2.jpg', '../images/10b1.jpg', '../images/10b3.jpg', '1395', '4185', '2018-11-30 01:22:30');
INSERT INTO `goodsdata` VALUES ('48', '蒙自石榴雀斑甜果礼盒装24粒装（2.4kg以上）', '来自北回归线上的精品甜石榴', '39.00', '128.00', '../images/2b2.jpg', '../images/2b1.jpg', '../images/2b3.jpg', '1365', '12285', '2018-11-30 01:22:45');
INSERT INTO `goodsdata` VALUES ('49', '精选麒麟瓜 2个装 4-6kg', '果皮薄，肉色鲜红绵密，甘甜爽口水分足，入口后的丝丝清甜。', '129.00', '105.00', '../images/25b2.jpg', '../images/25b1.jpg', '../images/25b3.jpg', '5805', '17415', '2018-11-30 01:22:32');
INSERT INTO `goodsdata` VALUES ('50', '进口柠檬 12粒装（1400g以上）', '肉质细嫩，水分丰富', '22.80', '53.00', '../images/18b2.jpg', '../images/18b1.jpg', '../images/18b3.jpg', '1254', '3511', '2018-11-30 01:12:23');
INSERT INTO `goodsdata` VALUES ('51', '进口加力果12个（900g以上）', '肉质紧密 清脆甜蜜', '56.80', '83.00', '../images/21b2.jpg', '../images/21b1.jpg', '../images/21b3.jpg', '3692', '14768', '2018-11-30 01:02:30');
INSERT INTO `goodsdata` VALUES ('52', '金百瑞蓝莓速冻果400g', '原香 原味 冻浆果更营养。', '39.90', '89.00', '../images/17b2.jpg', '../images/17b1.jpg', '../images/17b3.jpg', '2992', '14364', '2018-11-30 01:11:14');
INSERT INTO `goodsdata` VALUES ('53', '金百瑞红莓（覆盆子）速冻果400g', '原香 原味 冻浆果更营养。', '28.80', '46.80', '../images/3b2.jpg', '../images/3b1.jpg', '../images/3b3.jpg', '576', '2880', '2018-11-30 01:14:02');
INSERT INTO `goodsdata` VALUES ('54', '金百瑞黑莓速冻果400g', '富含维生素 酸甜可口 香味浓郁', '38.80', '65.00', '../images/12b2.jpg', '../images/12b1.jpg', '../images/12b3.jpg', '1164', '1751', '2018-11-30 01:32:53');
INSERT INTO `goodsdata` VALUES ('55', '海南金煌芒2粒(1000g以上)', '芒果中的大个子 纤维细 大口吃果肉 超爽', '56.80', '94.00', '../images/26b2.jpg', '../images/26b1.jpg', '../images/26b3.jpg', '2272', '2272', '2018-11-30 01:42:43');
INSERT INTO `goodsdata` VALUES ('56', '广西金桔1000g', '甜脆爽口，营养满满', '66.90', '83.00', '../images/11b2.jpg', '../images/11b1.jpg', '../images/11b3.jpg', '2007', '3010', '2018-11-30 01:51:24');
INSERT INTO `goodsdata` VALUES ('57', '福建琯溪三红蜜柚4粒（单果1kg以上）', '三红柚，吃起来很享受', '48.80', '67.00', '../images/19b2.jpg', '../images/19b1.jpg', '../images/19b3.jpg', '4392', '1316', '2018-11-30 01:44:45');
INSERT INTO `goodsdata` VALUES ('58', '比利时啤梨8个装（1020g以上）', '软妹子，请放软后食用', '23.80', '61.00', '../images/29b2.jpg', '../images/29b1.jpg', '../images/29b3.jpg', '2380', '5950', '2018-11-30 01:11:24');
INSERT INTO `goodsdata` VALUES ('59', '百香果 24粒装（1200g以上）', '风味浓郁，芳香怡人', '29.80', '71.80', '../images/8b2.jpg', '../images/8b1.jpg', '../images/8b3.jpg', '3278', '1112', '2018-11-30 01:36:17');
INSERT INTO `goodsdata` VALUES ('60', '澳洲进口橙8个装（1600g以上）', '阳光外衣，甜蜜内心，鲜甜共享', '32.80', '91.00', '../images/9b2.jpg', '../images/9b1.jpg', '../images/9b3.jpg', '3936', '7712', '2018-11-30 01:38:16');
INSERT INTO `goodsdata` VALUES ('61', '新疆香妃雪梨8粒 2kg', '汁多，肉脆，香气浓', '39.90', '57.60', '../images/30b3.jpg', '../images/30b2.jpg', '../images/30b1.jpg', '5187', '7780', '2018-11-30 01:42:15');
INSERT INTO `goodsdata` VALUES ('62', '金百瑞红莓（覆盆子）速冻果400g', '原香 原味 冻浆果更营养。', '23.00', '42.10', '../images/3b3.jpg', '../images/3b2.jpg', '../images/3b1.jpg', '3220', '8050', '2018-11-30 01:58:35');
INSERT INTO `goodsdata` VALUES ('63', '金百瑞蓝莓速冻果400g', '原香 原味 冻浆果更营养。', '31.90', '75.60', '../images/17b3.jpg', '../images/17b2.jpg', '../images/17b1.jpg', '4785', '747', '2018-11-30 01:05:33');
INSERT INTO `goodsdata` VALUES ('64', '泰国椰青整箱装 20个', '椰汁清甜沁心 椰肉香软滑嫩', '134.40', '324.00', '../images/1b3.jpg', '../images/1b2.jpg', '../images/1b1.jpg', '21504', '768', '2018-11-30 01:12:42');
INSERT INTO `goodsdata` VALUES ('65', '澳洲进口橙8个装（1600g以上）', '阳光外衣，甜蜜内心，鲜甜共享', '26.20', '72.80', '../images/9b3.jpg', '../images/9b2.jpg', '../images/9b1.jpg', '4454', '497', '2018-11-30 01:35:02');
INSERT INTO `goodsdata` VALUES ('66', '西州蜜瓜2粒装（约4kg）', '阳光的馈赠，甜到心尖的美味', '47.90', '83.90', '../images/23b3.jpg', '../images/23b2.jpg', '../images/23b1.jpg', '958', '227', '2018-11-30 01:41:23');
INSERT INTO `goodsdata` VALUES ('67', '台湾金钻凤梨 2粒（单果0.9kg以上）', '香甜细腻', '36.60', '71.10', '../images/15b3.jpg', '../images/15b2.jpg', '../images/15b1.jpg', '1098', '235', '2018-11-30 01:39:43');
INSERT INTO `goodsdata` VALUES ('68', '山东精品烟台富士30个礼盒装/ 6.4kg以上', '鲜脆多汁，酸酸甜甜', '166.40', '205.20', '../images/24b3.jpg', '../images/24b2.jpg', '../images/24b1.jpg', '6656', '312', '2018-11-30 01:33:32');
INSERT INTO `goodsdata` VALUES ('69', '旺顿牌热带冷冻椰子（含椰子果肉）2个', '细腻多汁，清香怡人', '41.60', '70.80', '../images/20b3.jpg', '../images/20b2.jpg', '../images/20b1.jpg', '2080', '240', '2018-11-30 01:47:42');
INSERT INTO `goodsdata` VALUES ('70', '实建冰糖橙10kg（特级）', '系出褚老的小清新，皮薄多汁', '158.40', '111.30', '../images/14b3.jpg', '../images/14b2.jpg', '../images/14b1.jpg', '9504', '1016', '2018-11-30 01:36:42');
INSERT INTO `goodsdata` VALUES ('71', '广西金桔1000g', '甜脆爽口，营养满满', '53.50', '74.70', '../images/11b3.jpg', '../images/11b2.jpg', '../images/11b1.jpg', '3745', '235', '2018-11-30 01:52:12');
INSERT INTO `goodsdata` VALUES ('72', '云南青芒3kg', '爽口清甜', '39.00', '71.20', '../images/27b3.jpg', '../images/27b2.jpg', '../images/27b1.jpg', '3120', '1080', '2018-11-30 01:36:32');
INSERT INTO `goodsdata` VALUES ('73', '泰国金枕头冷冻榴莲果肉 300g*6', '爽口嫩滑，嗅觉挑战，味蕾享受', '111.20', '151.20', '../images/28b3.jpg', '../images/28b2.jpg', '../images/28b1.jpg', '10008', '3002', '2018-11-30 01:53:43');
INSERT INTO `goodsdata` VALUES ('74', '网纹瓜2个装（2-3kg）', '赏心悦目的高颜值蜜瓜', '23.80', '80.70', '../images/22b3.jpg', '../images/22b2.jpg', '../images/22b1.jpg', '2380', '6664', '2018-11-30 01:42:06');
INSERT INTO `goodsdata` VALUES ('75', '福建琯溪三红蜜柚4粒（单果1kg以上）', '三红柚，吃起来很享受', '39.00', '46.90', '../images/19b3.jpg', '../images/19b2.jpg', '../images/19b1.jpg', '4290', '1716', '2018-11-30 01:29:04');
INSERT INTO `goodsdata` VALUES ('76', '比利时啤梨8个装（1020g以上）', '软妹子，请放软后食用', '19.00', '73.20', '../images/29b3.jpg', '../images/29b2.jpg', '../images/29b1.jpg', '2280', '1094', '2018-11-30 01:52:32');
INSERT INTO `goodsdata` VALUES ('77', '进口柠檬 12粒装（1400g以上）', '肉质细嫩，水分丰富', '18.20', '37.10', '../images/18b3.jpg', '../images/18b2.jpg', '../images/18b1.jpg', '2366', '118', '2018-11-30 01:37:43');
INSERT INTO `goodsdata` VALUES ('78', '进口加力果12个（900g以上）', '肉质紧密 清脆甜蜜', '45.40', '99.60', '../images/21b3.jpg', '../images/21b2.jpg', '../images/21b1.jpg', '2270', '131', '2018-11-30 01:31:44');
INSERT INTO `goodsdata` VALUES ('79', '越南白肉火龙果 4个装（大果·1.6-2kg）', '热情火龙果 甜蜜好口味', '23.10', '76.80', '../images/13b3.jpg', '../images/13b2.jpg', '../images/13b1.jpg', '1386', '1386', '2018-11-30 01:29:34');
INSERT INTO `goodsdata` VALUES ('80', '易拉罐椰皇 2粒（单果720g以上）', '轻轻一拉即可随时享受美味', '22.40', '55.20', '../images/4b3.jpg', '../images/4b2.jpg', '../images/4b1.jpg', '1568', '235', '2018-11-30 01:23:25');
INSERT INTO `goodsdata` VALUES ('81', '云南蒙自石榴16粒（单果400g以上）', '皮薄透亮，籽实晶莹', '55.20', '90.00', '../images/7b3.jpg', '../images/7b2.jpg', '../images/7b1.jpg', '4416', '1324', '2018-11-30 01:25:10');
INSERT INTO `goodsdata` VALUES ('82', '南丰蜜桔 （约2kg）', '皮薄核少、食不存渣、酸甜适中', '44.60', '73.30', '../images/10b3.jpg', '../images/10b2.jpg', '../images/10b1.jpg', '4014', '100', '2018-11-30 01:23:14');
INSERT INTO `goodsdata` VALUES ('83', '海南金煌芒2粒(1000g以上)', '芒果中的大个子 纤维细 大口吃果肉 超爽', '45.40', '75.20', '../images/26b3.jpg', '../images/26b2.jpg', '../images/26b1.jpg', '4540', '181', '2018-11-30 01:27:53');
INSERT INTO `goodsdata` VALUES ('84', '蒙自石榴雀斑甜果礼盒装24粒装（2.4kg以上）', '来自北回归线上的精品甜石榴', '31.20', '102.40', '../images/2b3.jpg', '../images/2b2.jpg', '../images/2b1.jpg', '3432', '154', '2018-11-30 01:21:33');
INSERT INTO `goodsdata` VALUES ('85', '泰国进口龙眼 5kg', '晶莹而甜爽多汁', '63.20', '122.50', '../images/6b3.jpg', '../images/6b2.jpg', '../images/6b1.jpg', '7584', '1137', '2018-11-30 01:12:28');
INSERT INTO `goodsdata` VALUES ('86', '越南红心火龙果大果 4个共1600g以上', '红色诱惑 皮薄味甜', '20.60', '75.60', '../images/5b3.jpg', '../images/5b2.jpg', '../images/5b1.jpg', '2678', '6695', '2018-11-30 01:42:58');
INSERT INTO `goodsdata` VALUES ('87', '象山红美人柑24个装（6kg以上）', '海上仙子国，“美人”香袭远', '134.40', '224.10', '../images/16b3.jpg', '../images/16b2.jpg', '../images/16b1.jpg', '2688', '9408', '2018-11-30 01:52:38');
INSERT INTO `goodsdata` VALUES ('88', '精选麒麟瓜 2个装 4-6kg', '果皮薄，肉色鲜红绵密，甘甜爽口水分足，入口后的丝丝清甜。', '103.20', '134.50', '../images/25b3.jpg', '../images/25b2.jpg', '../images/25b1.jpg', '3096', '1393', '2018-11-30 01:32:53');
INSERT INTO `goodsdata` VALUES ('89', '金百瑞黑莓速冻果400g', '富含维生素 酸甜可口 香味浓郁', '31.00', '61.70', '../images/12b3.jpg', '../images/12b2.jpg', '../images/12b1.jpg', '1240', '6820', '2018-11-30 01:02:52');
INSERT INTO `goodsdata` VALUES ('90', '百香果 24粒装（1200g以上）', '风味浓郁，芳香怡人', '23.80', '82.50', '../images/8b3.jpg', '../images/8b2.jpg', '../images/8b1.jpg', '333', '2164', '2018-11-30 01:12:44');

-- ----------------------------
-- Table structure for user_inf
-- ----------------------------
DROP TABLE IF EXISTS `user_inf`;
CREATE TABLE `user_inf` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_inf
-- ----------------------------
INSERT INTO `user_inf` VALUES ('1', '13112341234', 'a123456', '2018-11-26 23:14:13');
INSERT INTO `user_inf` VALUES ('2', '13212341234', 'A123456', '2018-11-27 01:14:16');
INSERT INTO `user_inf` VALUES ('3', '13312341234', 'A123456', '2018-11-27 02:14:20');
INSERT INTO `user_inf` VALUES ('4', '13412341234', 'A123456', '2018-11-27 02:14:23');
INSERT INTO `user_inf` VALUES ('5', '13612341234', 'a123456', '2018-11-27 02:17:11');
SET FOREIGN_KEY_CHECKS=1;
