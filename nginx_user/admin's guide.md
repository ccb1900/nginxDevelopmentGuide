# NGINX ADMIN GUIDE AND TUTORIAL
> nginx plus有关的没有翻译

NGINX是一个开源的Web服务器和反向代理，可以在大规模的Web集成，应用程序安全和Web加速方面表现出色。
NGINX Plus扩展了NGINX，具有额外的[负载平衡和应用交付](https://www.nginx.com/products/feature-matrix/)功能。
NGINX Plus管理指南和教程中的文章将会快速显示如何使用NGINX和NGINX Plus中最受欢迎的一些功能。
要购买NGINX Plus订阅，
请联系[NGINX Plus销售团队](https://www.nginx.com/resources/admin-guide/?_ga=1.246078404.1555504359.1489221515#contact-us)。

# 安装nginx
- [安装nginx开源版本](https://www.nginx.com/resources/admin-guide/installing-nginx-open-source/) - 获取，编译和安装开源NGINX
# 开始
- 运行时控制

启动和停止NGINX和NGINX Plus进程，包括零停机重新配置和二进制升级

- 管理nginx配置文件
# 基本功能
- web服务器

配置虚拟servers和locations，使用变量，重写uris，个性化错误页面
- 提供静态内容

设置所请求内容的根目录，如果原始索引文件或URI不存在，
则创建要提供的文件的有序列表
- 反向代理

代理HTTP，FastCGI，uwsgi，SCGI和memcached服务器的请求。
控制代理请求头;并缓存来自代理服务器的响应。
- 压缩和解压

快速压缩响应，最大限度地减少网络带宽的使用
- web内容缓存

从代理服务器缓存静态和动态内容
# 管理ssl流量
## ssl终止
通过https传递网页内容
## TCP上游的SSL终止
通过HTTPS传递TCP流量
## NGINX与HTTP上游之间的SSL
保护NGINX与上游服务器之间的HTTP流量。
## NGINX和TCP上游之间的SSL
保护NGINX和上游服务器之间的TCP流量
# 负载均衡
## HTTP负载均衡器
基于选择的算法，在一组服务器上分发HTTP请求，
对上游服务器运行状况进行被动和主动检查以及负载平衡配置的运行时修改
## TCP和UDP负载均衡器
基于选择的算法在一组服务器之间分配TCP连接和UDP数据报，
并通过被动和主动检查上游服务器的运行状况以及负载均衡配置的运行时修改
## 使用PROXY协议
配置NGINX和NGINX Plus以接收通过代理服务器和
负载平衡器（如HAproxy和Amazon Elastic Load Balancer）传递的客户端连接信息
# 限制访问
## 限制访问代理的HTTP资源
基于客户端IP地址控制访问，限制同时连接的数量，
并限制每个连接的请求速率和带宽
## 使用HTTP基本身份验证限制访问
配置HTTP的用户名/密码认证
## 根据子请求结果配置认证
使用外部服务器或服务验证每个请求到您的网站。
## 按地理位置限制访问
根据客户端位置控制访问
## 限制对代理的TCP资源的访问
根据客户端IP地址控制访问，限制同时连接的数量，并限制每个连接的带宽
# 记录和监控
## HTTP健康检查
被动和主动检查HTTP上游服务器的健康状况
## TCP健康检查
检查TCP上游服务器的运行状况
## UDP健康检查
检查UDP上游服务器健康
## 活动监控
使用实时活动监控仪表板实时监控NGINX Plus状态和性能指标，
使用JSON收集统计信息
## 错误和请求记录
配置错误日志和访问日志，记录到syslog
## Nginx的调试
配置调试日志，收集调试信息，获取核心转储文件
# 高可用性

# 邮件代理
## 将NGINX配置为邮件代理服务器
启用邮件代理服务器功能

NGINX和NGINX Plus还支持HTTP / 2，通过SSI或XSLT代理WebSocket流量，流媒体传送和内容转换。所有这些功能 
- 以及更多 - 在[参考文档]()中有详细的介绍
# 部署和迁移指南