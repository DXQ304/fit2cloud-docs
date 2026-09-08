---
title: 系统参数
---

## 1 基础设置

<img alt="系统设置" src="/img/dataease-v2/system_management/系统设置.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

:::note

如下图所示，可设置请求超时时间、数据源检测时间间隔，日志保留时间。  
通过 X-Pack 进行认证设置或平台对接后，可以设置是否开启第三方自动创建用户、用户组织和角色。
:::

<img alt="系统管理界面" src="/img/dataease-v2/system_management/基础设置.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

:::note

支持设置数据源有效性检测的间隔时间。
:::

<img alt="数据源检测时间" src="/img/dataease-v2/system_management/数据源检测时间.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

:::note

系统设置支持全局禁用分享链接功能。禁用后，所有在此之前创建的分享链接将无法访问。
:::
<img alt="更新1" src="/img/dataease-v2/newimg/新增全局禁用分享链接设置1.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

:::note

禁用分享后访问分享链接将显示以下页面：
:::
<img alt="更新1" src="/img/dataease-v2/newimg/新增全局禁用分享链接设置2.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

:::note

系统设置支持分享链接的有效期和密码必填设置。开启该选项后，之前创建的所有分享链接将无法访问。
:::
<img alt="更新1" src="/img/dataease-v2/newimg/新增全局分享链接有效期和密码必填设置1.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

:::note

创建分享链接时，系统将提示有效期和密码为必填项。
:::
<img alt="更新1" src="/img/dataease-v2/newimg/新增全局分享链接有效期和密码必填设置2.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

:::note

未设置有效期和密码的分享链接访问时会显示以下页面：
:::
<img alt="更新1" src="/img/dataease-v2/newimg/新增全局分享链接有效期和密码必填设置3.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

:::note

在已配置其他登录方式（LDAP、CAS、OIDC）的情况下，并将其配置为默认登录方式，则在访问 DataEase 时，登录页面会自动跳转到相应登录页面。在配置了其他默认登录方式的情况下，如果需要使用 DataEase 原有登录方式，可以访问 URL：http(s)://de_server_ip:de_port/#/admin-login，可支持所有用户的普通登录。
:::

<img alt="更新1" src="/img/dataease-v2/newimg/3.2%20支持配置默认登录方式.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

<img alt="更新1" src="/img/dataease-v2/newimg/3.2%20支持配置默认登录方式2.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

:::note

支持设置用户登录限制。
:::

<img alt="更新1" src="/img/dataease-v2/newimg/支持设置用户登录限制.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

:::note

系统设置增加页面打开方式选项。
:::

<img alt="更新1" src="/img/dataease-v2/newimg/系统设置增加页面打开方式选项.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

:::note

增加资源默认排序方式的配置项。  
系统管理员可以设置各类资源的默认排序方式，用户则可以根据个人需求调整资源的排序。用户自定义的排序方式将保存在浏览器本地，优先级高于系统默认设置。
:::

<img alt="更新1" src="/img/dataease-v2/newimg/增加资源默认排序方式的配置项.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

## 2 邮件设置
:::note

用户可通过配置邮件的基本信息，来接收仪表板分享、数据集同步或数据源失效的信息。
:::
<img alt="地图设置1" src="/img/dataease-v2/system_management/邮件设置.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

## 3 地图设置

### 3.1 自定义区域

:::note

地图支持自定义区域及其区域下钻。在【系统设置】→【系统参数】→【地图设置】中，可以添加自定义地理区域，并对中国省份进行自定义组合。
:::

<img alt="更新1" src="/img/dataease-v2/newimg/地图支持自定义区域及其区域下钻.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

<img alt="更新1" src="/img/dataease-v2/newimg/地图支持自定义区域及其区域下钻2.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

:::note

在地图和气泡地图等离线地图中，可以选择并显示自定义区域，在维度中添加区域字段（数据值如东区、南区、北区）。配置区域与省份的下钻，可支持从区域下钻到省份。
:::

<img alt="更新1" src="/img/dataease-v2/newimg/地图支持自定义区域及其区域下钻3.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

<img alt="更新1" src="/img/dataease-v2/newimg/地图支持自定义区域及其区域下钻.gif" width="900" style={{maxWidth:'100%', height:'auto'}}/>

### 3.2 地理信息

:::note

支持设置自定义地图文件。
:::

<img alt="地图设置1" src="/img/dataease-v2/system_management/地图界面.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

<img alt="地图设置2" src="/img/dataease-v2/system_management/添加地图文件.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

:::note

**世界各国的地图文件可以自行在网上下载。**  
**提示：** 因为各个国家的行政架构不一致，无法统一处理，目前世界地图不支持钻取。  
1.下载指定国家的 geo 地图文件，文件缀名需修改为 .json，如下载俄罗斯的 russia.geojson 改为 russia.json；
https://github.com/codeforgermany/click_that_hood/blob/main/public/data/russia.geojson；  
2.确认 geo 文件是否正确，并在 properties 中包含 name 字段；
:::

<img alt="地图设置geo文件" src="/img/dataease-v2/system_management/地图设置geo文件.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

:::note

3.查找[国家地区代码](https://zh.wikipedia.org/wiki/%E5%9C%8B%E5%AE%B6%E5%9C%B0%E5%8D%80%E4%BB%A3%E7%A2%BC)来唯一标识该国家，如俄罗斯地区的代码为 643，区域代码可以写成 643100000；  
4.在 DataEase 中创建俄罗斯地图；
:::

<img alt="俄罗斯地图" src="/img/dataease-v2/system_management/俄罗斯地图.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

:::note

5.创建测试数据文件；
:::

<img alt="数据文件" src="/img/dataease-v2/system_management/数据文件.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

:::note

country 需要和地球村文件里的 name 字段名称保持一致；
:::

<img alt="country" src="/img/dataease-v2/system_management/country.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

:::note

province 需要和国家 geo 文件中 properties 下的 name 字段保持一致；
:::

<img alt="province" src="/img/dataease-v2/system_management/地图设置geo文件.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

:::note

6.制作俄罗斯地图视图，在地图中选择俄罗斯即可；
:::

<img alt="俄罗斯" src="/img/dataease-v2/system_management/俄罗斯.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

<img alt="世界地图" src="/img/dataease-v2/system_management/世界地图.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

### 3.3 在线地图

:::note

在线地图（符号地图、流向地图、热力地图）目前支持高德、天地图和腾讯地图，可申请配置对应对的地图 Key。当前页面保存地图服务即为 DataEase 仪表板和数据大屏中使用的地图服务。更改地图服务后，需刷新仪表板或数据大屏以使更改生效。

天地图：

- 创建 Key 的官方文档：[天地图授权指南](http://lbs.tianditu.gov.cn/authorization/authorization.html)。
- 限制：
    - 不支持去除地图标注。
    - 不支持地图倾斜。  

腾讯地图：

- 创建 Key 的官方文档：[腾讯地图开发指南](https://lbs.qq.com/mobile/androidMapSDK/developerGuide/getKey)。
- 主题配置参考：[个性地图](https://lbs.qq.com/dev/console/custom/mapStyle)。

高德地图：

- 创建 Key 的官方文档：[高德开放平台官网](https://lbs.amap.com/)。
- 支持自定义地图风格：[自定义地图风格步骤参考](https://kb.fit2cloud.com/?p=2f66b59f-1e89-4263-8db3-8bc5ec4a56c1)。
:::

<img alt="更新1" src="/img/dataease-v2/newimg/在线地图支持天地图、腾讯地图1.PNG" width="900" style={{maxWidth:'100%', height:'auto'}}/>

:::note

举例配置高德地图 Key 步骤：
:::

<img alt="高德【平台" src="/img/dataease-v2/system_management/高德平台.PNG" width="900" style={{maxWidth:'100%', height:'auto'}}/>

:::note

选择【文档与支持】-&gt;【API】-&gt;【web 服务 API】。
:::

<img alt="web服务" src="/img/dataease-v2/system_management/高德平台.PNG" width="900" style={{maxWidth:'100%', height:'auto'}}/>

:::note

点开【开发指南】-&gt;【获取 Key】。
:::

<img alt="开发指南" src="/img/dataease-v2/system_management/高德开发指南.PNG" width="900" style={{maxWidth:'100%', height:'auto'}}/>

:::note

登录【高德开放平台控制台】，注册开发者，后续按照文档进行即可。
:::

<img alt="地图指南" src="/img/dataease-v2/system_management/高德地图指南.PNG" width="900" style={{maxWidth:'100%', height:'auto'}}/>

:::note

如下即为验证成功，以及创建应用获取 Key。
:::

<img alt="高德验证成功" src="/img/dataease-v2/system_management/高德验证成功.PNG" width="900" style={{maxWidth:'100%', height:'auto'}}/>

<img alt="高德创建应用" src="/img/dataease-v2/system_management/高德创建应用.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

<img alt="高德添加KEY" src="/img/dataease-v2/system_management/高德添加KEY.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

:::note

在 DataEase 在线地图 Key 配置中，填入获取的地图服务 Key，点击保持即可。
:::

<img alt="配置KEY" src="/img/dataease-v2/system_management/配置KEY.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>

## 4 引擎设置

:::note

默认数据引擎是 DataEase 自带的 MySQL，用以存储 Excel 及 API 数据集数据。目前该引擎只支持 MySQL 类型，支持使用外部 MySQL；  
系统会自动检查是否设置了引擎参数，若无设置，则读取 dataease.properties 配置文件中 MySQL 连接信息，并填入其中。
:::

<img alt="MySQL设置" src="/img/dataease-v2/system_management/引擎管理.png" width="900" style={{maxWidth:'100%', height:'auto'}}/>
