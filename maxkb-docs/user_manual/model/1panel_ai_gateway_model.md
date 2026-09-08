---
title: 对接1Panel AI 网关
---

## 1 添加模型

:::note

对接 1Panel AI 网关之前，需要先在 1Panel 的 `AI` &gt; `AI 网关` &gt; `API Key` 页面获取外部连接地址和 API Key，参考下图：

选择模型供应商为`OpenAI`，并在模型添加对话框中输入如下必要信息：

* 模型名称：MaxKB 中自定义的模型名称。
* 模型类型：大语言模型。
* 基础模型：1Panel AI 网关中可用的模型名称。
* API 域名：1Panel AI 网关的外部连接地址，例如 `http://&lt;1Panel 服务器 IP&gt;:4000/v1`。
* API Key：1Panel AI 网关 API Key 页面创建的 Key。
:::

<img alt="1Panel AI 网关 API Key" src="/img/maxkb/model/1panel_ai_gateway_api_keys.jpg" width="800" style={{maxWidth:'100%', height:'auto'}}/>

## 2 配置样例

:::note

OpenAI-大语言模型配置样例图示：
:::

<img alt="OpenAI 模型" src="/img/maxkb/model/openai_llm.png" width="500" style={{maxWidth:'100%', height:'auto'}}/>
