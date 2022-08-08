/*
Navicat MySQL Data Transfer

Source Server         : index
Source Server Version : 80017
Source Host           : localhost:3306
Source Database       : index

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2022-08-08 20:36:24
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `blog`
-- ----------------------------
DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `header` varchar(255) DEFAULT NULL,
  `container` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `label` varchar(255) DEFAULT NULL,
  `sort` varchar(255) DEFAULT NULL,
  `createtime` varchar(255) DEFAULT NULL,
  `createuserid` int(11) DEFAULT NULL,
  `createusername` varchar(255) DEFAULT NULL,
  `createuserip` varchar(255) DEFAULT NULL,
  `lastvisittime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `visitnumber` int(20) DEFAULT NULL,
  `isTitle` tinyint(255) DEFAULT '0',
  `isShow` tinyint(255) DEFAULT '0',
  `img` varchar(255) DEFAULT NULL,
  `commentnum` int(10) DEFAULT '0',
  `laudnum` int(255) DEFAULT '0',
  `isdelete` int(255) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of blog
-- ----------------------------
INSERT INTO `blog` VALUES ('44', 'Vite打包时需要做的事情！', null, '<p style=\'text-align: left; line-height: 1.5;\'><span style=\'font-size: 22px;\'><strong>1、</strong></span><span style=\'color: rgb(225, 60, 57); font-size: 22px;\'><strong>报错：</strong></span><span style=\'color: rgb(225, 60, 57); font-size: 16px;\'><strong>Refused to apply style from \' is not a supported stylesheet MIME type</strong></span></p><p style=\'text-align: left; line-height: 3;\'><span style=\'font-size: 16px;\'><strong>原因：引入了删除或者不存在的文件导致出错</strong></span></p><p style=\'text-align: left; line-height: 3;\'><span style=\'font-size: 16px;\'><strong>解决：大部分是因为打包的文件采用绝对定位的方式获取资源，导致拿不到资源，只需要把‘/’改成‘./’即可。</strong></span></p><p style=\'text-align: left; line-height: 3;\'><img src=\'http://localhost:3001/b1-3.png\' alt=\'\' data-href=\'http://localhost:3001/b1-3.png\' style=\'\'></p><p style=\'text-align: left; line-height: 2.5;\'><span style=\'font-size: 22px;\'><strong>2、</strong></span><span style=\'color: rgb(225, 60, 57); font-size: 22px;\'><strong>资源文件混乱，实现简单分类</strong></span></p><p style=\'text-align: left; line-height: 2.5;\'><span style=\'font-size: 22px;\'><strong>解决：在viteconfig.js里添加如下配置即可自动分类不同格式文件</strong></span></p><p style=\'text-align: left;\'><img src=\'http://localhost:3001/b1-2.png\' alt=\'\' data-href=\'http://localhost:3001/b1-2.png\' style=\'\'></p><p style=\'text-align: left; line-height: 3;\'><span style=\'font-size: 22px;\'><strong>3、</strong></span><span style=\'color: rgb(225, 60, 57); font-size: 22px;\'><strong>配置自动引入elementuiPlus组件</strong></span></p><p style=\'text-align: left; line-height: 3;\'><span style=\'font-size: 22px;\'><strong>解决：</strong></span></p><p style=\'text-align: left; line-height: 3;\'><img src=\'http://localhost:3001/b1-1.png\' alt=\'\' data-href=\'http://localhost:3001/b1-1.png\' style=\'\'></p><p style=\'text-align: left;\'><br></p>', '1,2,6', '4', '2022-7-22 2:49:8', '1', 'Hyyyh', null, '2022-08-08 17:25:48', '145', '0', '0', 'http://localhost:3001/1658429348727.png', '1', '1', '0');
INSERT INTO `blog` VALUES ('67', 'vscode中值得推荐的7个高效前端插件', null, '<h1 style=\'text-align: start; line-height: 1.5;\'></h1><h1 style=\'text-align: start; line-height: 1.5;\'><span style=\'font-size: 16px;\'>Tabnine(AI自动补全)</span></h1><h1 style=\'text-align: start; line-height: 1.5;\'><span style=\'font-size: 16px;\'>Code Spell Checker(自动检查单词拼写)</span></h1><h1 style=\'text-align: start; line-height: 1.5;\'><span style=\'font-size: 16px;\'>Import Cost（显示导入包大小）</span></h1><h1 style=\'text-align: start; line-height: 1.5;\'><span style=\'font-size: 16px;\'>Quokka（代码内查看打印结果）</span></h1><h1 style=\'text-align: start; line-height: 1.5;\'><span style=\'font-size: 16px;\'>Live Server（</span><span style=\'color: rgb(0, 0, 0); font-size: 16px;\'>立即查看浏览器中反映的代码更改</span><span style=\'font-size: 16px;\'>）</span></h1><h1 style=\'text-align: start; line-height: 1.5;\'><span style=\'font-size: 16px;\'>Prettier（格式化代码）</span></h1><h2 style=\'text-align: start; line-height: 1.5;\'><span style=\'font-size: 16px;\'>Path Intellisense （自动提示路劲）</span></h2><p><br></p><p style=\'line-height: 2.5;\'><strong>1.</strong><span style=\'color: rgb(51, 51, 51); background-color: rgb(255, 255, 255); font-size: 16px;\'><strong>Tabnine</strong></span></p><hr/><p><br></p><p><img src=\'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b0beb6fb5eb4f979aa07e35f311050b~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp\' alt=\'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b0beb6fb5eb4f979aa07e35f311050b~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp\' data-href=\'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8b0beb6fb5eb4f979aa07e35f311050b~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp\' style=\'width: 50%;\'/></p><p><br></p><p style=\'line-height: 1.5;\'><span style=\'color: rgb(66, 144, 247);\'>Tabnine</span> 是一款广受欢迎的 VSCode 人工智能助手，适用于所有主要编程语言，因此毫无疑问，无论你的技能如何，你都会发现它很有用。</p><p style=\'line-height: 1.5;\'>通过研究公开共享的代码库，Tabnine 使用深度学习算法来预测你的需求，并提供一键代码完成功能，让你可以快速高效地完成项目。 对于新手编码员来说，这让学习变得轻而易举，因为它为你提供了发挥想法的空间，而无需记住编码语法或搜索 StackOverflow。</p><p style=\'line-height: 1.5;\'>而且，如果你是一位经验丰富的开发人员，那么你会发现 Tabnine 为你提供了运行所需的构建块，从而为你的工作节省了大量时间。</p><p style=\'line-height: 1.5;\'><br></p><p style=\'line-height: 2.5;\'><strong>2.code spell checker</strong></p><hr/><p style=\'line-height: 2.5;\'><br></p><p style=\'line-height: 1.5;\'><img src=\'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36ca628902d34296875ae4dd407215d3~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp\' alt=\'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36ca628902d34296875ae4dd407215d3~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp\' data-href=\'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/36ca628902d34296875ae4dd407215d3~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp\' style=\'width: 50%;\'></p><p style=\'text-align: start; line-height: 1.5;\'><span style=\'color: rgb(66, 144, 247);\'>code spell checker</span>让你代码不再有拼写错误，虽然拼写错误不是致命问题，但我更喜欢我的代码没有拼写错误。<a href=\'https://link.juejin.cn/?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dstreetsidesoftware.code-spell-checker\' target=\'_blank\'>代码拼写检查器插件</a>在其字典文件中无法识别的单词下划线。</p><p style=\'text-align: start; line-height: 1.5;\'>该插件有许多不同的语言版本，并支持医学术语等行话。</p><p style=\'text-align: start; line-height: 1.5;\'><br></p><p style=\'text-align: start; line-height: 2.5;\'><strong>3. </strong><span style=\'color: rgb(51, 51, 51); background-color: rgb(255, 255, 255); font-size: 16px;\'><strong>Import Cost</strong></span></p><hr/><p style=\'text-align: start; line-height: 1.5;\'><br></p><p style=\'text-align: start; line-height: 1.5;\'><img src=\'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d7a5c0dc2c94e40839f1f6f316e26c7~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp\' alt=\'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d7a5c0dc2c94e40839f1f6f316e26c7~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp\' data-href=\'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d7a5c0dc2c94e40839f1f6f316e26c7~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp\' style=\'width: 50%;\'></p><p style=\'text-align: start; line-height: 1.5;\'><br></p><p style=\'line-height: 1.5;\'>当你开发 Web 应用程序或网站时，很容易制作一些臃肿的东西——尤其是作为一个新手开发者。 这其中的一个重要因素是，许多开发人员在通过代码导入时并不总是知道包有多大。</p><p style=\'line-height: 1.5;\'><span style=\'color: rgb(66, 144, 247);\'>Import Cost</span> 是一个 VSCode 扩展，可以内联显示导入包的大小，因此你可以确切地知道在开发过程中导入该包的成本是多少。 因此，它将帮助你更好地优化你的应用程序和网站，特别是对于通常因膨胀而遭受更多痛苦的移动用户。</p><p style=\'text-align: start; line-height: 2.5;\'><strong>4. </strong><span style=\'color: rgb(51, 51, 51); background-color: rgb(255, 255, 255); font-size: 16px;\'><strong>Quokka</strong></span></p><hr/><p style=\'text-align: start; line-height: 1.5;\'><br></p><p style=\'text-align: start; line-height: 1.5;\'><img src=\'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab5386b1187042798cb685469a339717~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp\' alt=\'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab5386b1187042798cb685469a339717~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp\' data-href=\'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab5386b1187042798cb685469a339717~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp\' style=\'width: 50%;\'></p><p style=\'text-align: start; line-height: 1.5;\'><br></p><p style=\'text-align: start; line-height: 1.5;\'><br></p><p style=\'line-height: 1.5;\'>如果你选择的语言是 JavaScript 或 TypeScript，那么你一定会喜欢<span style=\'background-color: rgb(66, 144, 247);\'> Quokka.js</span>。 此扩展旨在通过在编写代码时在 IDE 中显示运行时值来加快开发速度，因此你可以专注于编写代码，而不是仅仅为了尝试新事物而构建自定义配置。</p><p style=\'line-height: 1.5;\'>这是一个简单、轻量级的扩展，非常适合经验丰富的开发人员和新手。 它也可以免费供社区使用，但如果你是 JavaScript/TypeScript 专家，你还可以购买 Pro 许可证，让你无需更改代码即可修改运行时值。</p><p style=\'line-height: 2.5;\'><strong>5. live server</strong></p><hr/><p><br></p><p><img src=\'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a32a49127fe145468950fe6f54f13265~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp\' alt=\'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a32a49127fe145468950fe6f54f13265~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp\' data-href=\'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a32a49127fe145468950fe6f54f13265~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp\' style=\'\'/></p><p style=\'text-align: start; line-height: 1.5;\'>立即查看浏览器中反映的代码更改</p><p style=\'text-align: start; line-height: 1.5;\'><a href=\'https://link.juejin.cn/?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dritwickdey.LiveServer\' target=\'_blank\'>Live Server</a>启动本地开发服务器，并为静态和动态页面提供实时重新加载功能。</p><p style=\'text-align: start; line-height: 1.5;\'>每次保存代码时，你都会立即看到浏览器中反映的更改。你会更快地发现错误，并且可以更轻松地对你的代码进行一些快速实验。</p><p style=\'text-align: start; line-height: 1.5;\'><br></p><p style=\'text-align: start; line-height: 2.5;\'><strong>6. </strong><a href=\'https://link.juejin.cn/?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Desbenp.prettier-VSCode\' target=\'_blank\' style=\'text-align: start;\'><strong>Prettier</strong></a></p><hr/><p style=\'text-align: left; line-height: 1.5;\'><br></p><p style=\'text-align: left; line-height: 1.5;\'><img src=\'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d5c501994e7f43d6bdbbcca0c161aa70~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp\' alt=\'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d5c501994e7f43d6bdbbcca0c161aa70~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp\' data-href=\'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d5c501994e7f43d6bdbbcca0c161aa70~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp\' style=\'width: 50%;\'></p><p style=\'text-align: start; line-height: 1.5;\'>花更少的时间格式化代码</p><p style=\'text-align: start; line-height: 1.5;\'><a href=\'https://link.juejin.cn/?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Desbenp.prettier-VSCode\' target=\'_blank\'>Prettier</a>是一个自以为是的代码格式化程序，如果你有多人在一个项目上工作，它会特别有效，因为该插件强制执行一致的样式。</p><p style=\'text-align: start; line-height: 1.5;\'>你可以对其进行设置，以便在每次保存代码时格式化你的代码，从而显着减少你花在格式化代码上的时间。</p><p style=\'text-align: start; line-height: 2.5;\'><strong>7. </strong><span style=\'font-size: 16px;\'><strong>Path Intellisense</strong></span></p><hr/><p style=\'text-align: start;\'><br></p><p style=\'text-align: start;\'><img src=\'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e16ed817bd0e4c32b92d894f92b6a3b4~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp\' alt=\'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e16ed817bd0e4c32b92d894f92b6a3b4~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp\' data-href=\'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e16ed817bd0e4c32b92d894f92b6a3b4~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp\' style=\'\'></p><p style=\'text-align: start;\'><br></p><p style=\'text-align: start;\'>提示当前目录下的文件有哪些</p><p style=\'text-align: start;\'><br></p>', '1', '3', '2022-8-1 1:53:49', null, 'admin', null, '2022-08-08 08:23:35', '45', '0', '0', 'http://localhost:3001/1659290029639.png', '2', '1', '0');
INSERT INTO `blog` VALUES ('72', 'node实现文章分类筛选和标签筛选功能', null, '<p style=\'text-indent: 2em; line-height: 2;\'><span style=\'font-size: 22px;\'><strong>筛选时可能的情况：</strong></span></p><p style=\'text-indent: 2em; line-height: 2;\'><span style=\'color: rgb(145, 213, 255);\'>1、没有选择分类，也没有选择标签</span></p><p style=\'text-indent: 2em; line-height: 2;\'><span style=\'color: rgb(145, 213, 255);\'>2、选择了分类，没有选择标签</span></p><p style=\'text-indent: 2em; line-height: 2;\'><span style=\'color: rgb(145, 213, 255);\'>3、没有选择分类，但是选择了标签</span></p><p style=\'text-indent: 2em; line-height: 2;\'><span style=\'color: rgb(145, 213, 255);\'>4、即选择了分类，也选择了标签</span></p><p style=\'text-indent: 2em; line-height: 3;\'><span style=\'color: rgb(0, 0, 0); font-size: 22px;\'><strong>数据可能发生的情况</strong></span></p><p style=\'text-indent: 2em; line-height: 2;\'><span style=\'color: rgb(145, 213, 255);\'>1、文章只属于一个分类，但是可以有多个标签，也可以只有一个，但至少有一个</span></p><p style=\'text-indent: 2em; line-height: 2;\'><span style=\'color: rgb(145, 213, 255); font-size: 19px;\'>2、未选择分类，接受的值为 0</span></p><p style=\'text-indent: 2em; line-height: 2;\'><span style=\'color: rgb(145, 213, 255); font-size: 19px;\'>3、未选择标签，接受的值为空数组 &nbsp;[ ]</span></p><p style=\'text-indent: 2em; line-height: 2;\'><span style=\'color: rgb(145, 213, 255); font-size: 19px;\'>4、文章只有一个标签时，数据为数字类型，有多个标签时，数据为数组类型</span></p><p style=\'text-indent: 2em; line-height: 2;\'><br></p><p style=\'text-indent: 2em; line-height: 2;\'><br></p><p style=\'text-indent: 2em; line-height: 2;\'><span style=\'color: rgb(225, 60, 57); font-size: 19px;\'><strong>情况1：</strong></span></p><p style=\'text-indent: 2em; line-height: 3;\'><span style=\'font-size: 19px;\'>判断两个都为空之后直接把所有数据返回，不用多说</span></p><hr/><p style=\'text-indent: 2em; line-height: 3;\'><span style=\'color: rgb(225, 60, 57); font-size: 19px;\'><strong>情况2：</strong></span></p><p style=\'text-indent: 2em; line-height: 3;\'>选择了分类，没有选择标签</p><p style=\'text-indent: 2em; line-height: 2;\'><img src=\'http://localhost:3001/blogimg/1659786374611.png\' alt=\'\' data-href=\'http://localhost:3001/blogimg/1659786374611.png\' style=\'\'></p><p style=\'text-indent: 2em; line-height: 3;\'>遍历判断属于哪个分类，然后返回即可</p><hr/><p style=\'text-indent: 2em; line-height: 3;\'><span style=\'color: rgb(225, 60, 57); font-size: 19px;\'><strong>情况3：</strong></span></p><p style=\'text-indent: 2em; line-height: 3;\'>没有选择分类，但是选择了标签</p><p style=\'text-indent: 2em; line-height: 2;\'><img src=\'http://localhost:3001/blogimg/1659786711115.png\' alt=\'\' data-href=\'http://localhost:3001/blogimg/1659786711115.png\' style=\'\'></p><p style=\'text-indent: 2em; line-height: 2;\'>会有多个情况发生，如果标签只有一个，那么直接通过includes函数即可知道是否包含。</p><p style=\'text-indent: 2em; line-height: 2;\'>如果文章有多个标签，那么需要判断文章的标签和前端发送的数据是否有交集，如果有交集，就向前端返回数据。</p><p style=\'text-indent: 2em; line-height: 3;\'>在这里是通过判断去重之后的数据长度和去重之前的数据长度来判断是否有交集。</p><hr/><p style=\'text-indent: 2em;\'><br></p><p style=\'text-indent: 2em; line-height: 3;\'><span style=\'color: rgb(225, 60, 57); font-size: 19px;\'><strong>情况4：</strong></span></p><p style=\'text-indent: 2em; line-height: 3;\'><span style=\'color: rgb(0, 0, 0);\'>即选择了分类，也选择了标签</span><img src=\'http://localhost:3001/blogimg/1659787221698.png\' alt=\'\' data-href=\'http://localhost:3001/blogimg/1659787221698.png\' style=\'width: 100%;\'>这种情况需要进行两次筛选之后，再返回结果。</p><p style=\'text-indent: 2em; line-height: 3;\'><br></p><p style=\'text-indent: 2em;\'><br></p><p style=\'text-indent: 2em;\'><br></p><p style=\'text-indent: 2em;\'><br></p><p><br></p>', '1,5,10', '4', '2022-08-06 20:04:42', null, 'admin', null, '2022-08-08 10:00:39', '17', '1', '0', 'http://localhost:3001/1659787482423.png', '0', '0', '0');

-- ----------------------------
-- Table structure for `bloglabel`
-- ----------------------------
DROP TABLE IF EXISTS `bloglabel`;
CREATE TABLE `bloglabel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `num` int(10) DEFAULT '0',
  `addtime` datetime DEFAULT NULL,
  `adduser` varchar(255) CHARACTER SET utf16 COLLATE utf16_general_ci DEFAULT NULL,
  `check` int(255) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of bloglabel
-- ----------------------------
INSERT INTO `bloglabel` VALUES ('1', 'javascript', '3', null, null, '0');
INSERT INTO `bloglabel` VALUES ('2', 'vue2', '1', null, null, '0');
INSERT INTO `bloglabel` VALUES ('3', 'JAVA', '0', null, null, '0');
INSERT INTO `bloglabel` VALUES ('4', 'css', '0', null, null, '0');
INSERT INTO `bloglabel` VALUES ('5', 'node', '1', null, null, '0');
INSERT INTO `bloglabel` VALUES ('6', 'vue3', '1', null, null, '0');
INSERT INTO `bloglabel` VALUES ('7', '算法', '0', null, null, '0');
INSERT INTO `bloglabel` VALUES ('8', '小程序', '0', null, null, '0');
INSERT INTO `bloglabel` VALUES ('9', '代码规范', '0', null, null, '0');
INSERT INTO `bloglabel` VALUES ('10', '数据库', '1', null, null, '0');
INSERT INTO `bloglabel` VALUES ('11', 'react', '0', null, null, '0');

-- ----------------------------
-- Table structure for `blogsort`
-- ----------------------------
DROP TABLE IF EXISTS `blogsort`;
CREATE TABLE `blogsort` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `num` int(11) DEFAULT NULL,
  `addtime` datetime DEFAULT NULL,
  `adduser` varchar(255) DEFAULT NULL,
  `check` int(255) unsigned DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of blogsort
-- ----------------------------
INSERT INTO `blogsort` VALUES ('1', '前端', '0', null, null, '0');
INSERT INTO `blogsort` VALUES ('2', '后端', '0', null, null, '0');
INSERT INTO `blogsort` VALUES ('3', '开发工具', '1', null, null, '0');
INSERT INTO `blogsort` VALUES ('4', '学习记录', '2', null, null, '0');

-- ----------------------------
-- Table structure for `comment`
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `blogusername` varchar(255) DEFAULT NULL,
  `bloguserid` int(11) DEFAULT NULL,
  `blogname` varchar(255) DEFAULT NULL,
  `blogid` int(11) DEFAULT NULL,
  `container` varchar(999) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `createtime` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('28', 'Hyyyh', '1', 'Vite打包时需要做的事情！', '44', '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试', '2022-7-26 3:28:15');
INSERT INTO `comment` VALUES ('43', 'Hyyyh', '1', 'vscode中值得推荐的7个高效前端插件', '67', '测试', '2022-8-1 1:55:1');
INSERT INTO `comment` VALUES ('44', 'admin', null, 'vscode中值得推荐的7个高效前端插件', '67', '8/7测试\n', '2022-08-07 17:17:54');

-- ----------------------------
-- Table structure for `interaction`
-- ----------------------------
DROP TABLE IF EXISTS `interaction`;
CREATE TABLE `interaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `userip` varchar(255) DEFAULT NULL,
  `islogin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `container` varchar(255) DEFAULT NULL,
  `laudnum` int(11) DEFAULT '0',
  `createtime` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of interaction
-- ----------------------------
INSERT INTO `interaction` VALUES ('14', '1', 'Hyyyh', null, '1', '我是第一！', '0', '2022-08-08 16:02:05');

-- ----------------------------
-- Table structure for `interactionlaud`
-- ----------------------------
DROP TABLE IF EXISTS `interactionlaud`;
CREATE TABLE `interactionlaud` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `interactionid` int(255) DEFAULT NULL,
  `userid` int(255) DEFAULT NULL,
  `userip` varchar(255) DEFAULT NULL,
  `createtime` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of interactionlaud
-- ----------------------------

-- ----------------------------
-- Table structure for `laud`
-- ----------------------------
DROP TABLE IF EXISTS `laud`;
CREATE TABLE `laud` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `blogid` int(11) DEFAULT NULL,
  `userip` varchar(255) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `createtime` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of laud
-- ----------------------------
INSERT INTO `laud` VALUES ('4', '44', null, '1', '2022-07-27 04:38:53');
INSERT INTO `laud` VALUES ('6', '67', null, '1', '2022-8-1 21:27:15');
INSERT INTO `laud` VALUES ('7', '44', null, '1', '2022-08-08 16:14:06');

-- ----------------------------
-- Table structure for `record`
-- ----------------------------
DROP TABLE IF EXISTS `record`;
CREATE TABLE `record` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `container` varchar(255) DEFAULT NULL,
  `createtime` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of record
-- ----------------------------
INSERT INTO `record` VALUES ('13', '正式开始博客搭建', '2022-7-5 00:00:00', null);
INSERT INTO `record` VALUES ('14', '整体修改了登录页的UI，新增记录功能，可以查看开发记录和添加开发记录，修复了一些显示bug', '2022-7-28 10:48:37', null);
INSERT INTO `record` VALUES ('15', '1.更新了个人信息，添加了社交帐号，成功把接口迁移到服务器', '2022-7-31 1:29:48', null);
INSERT INTO `record` VALUES ('16', '新增删除博客功能', '2022-8-1 1:16:34', null);
INSERT INTO `record` VALUES ('17', '新增分类页面，修改了首页UI，添加了部分动画', '2022-8-5 6:45:58', null);
INSERT INTO `record` VALUES ('18', '新增分类筛选功能，可以在分类页面进行文章筛选，优化了时间显示', '2022-08-06 20:08:11', null);
INSERT INTO `record` VALUES ('19', '新增记录页面，用户可以在记录页面进行留言。新增了部分动画', '2022-08-08 16:16:25', null);

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `userpass` varchar(45) DEFAULT NULL,
  `userip` varchar(45) DEFAULT NULL,
  `lastlogintime` varchar(45) DEFAULT NULL,
  `loginnumber` int(11) DEFAULT '0',
  `userstatus` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'Hyyyh', 'Hyyyh', '123', null, '2022-08-08 17:20:07', '44', '1');
