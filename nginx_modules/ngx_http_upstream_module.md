# ngx_http_upstream_module
ngx_http_upstream_module 是用来定义服务器组，可以被
proxy_pass, fastcgi_pass, uwsgi_pass, scgi_pass, 和memcached_pass指令引用。
## 示例配置
```
upstream backend {
    server backend1.example.com       weight=5;
    server backend2.example.com:8080;
    server unix:/tmp/backend3;

    server backup1.example.com:8080   backup;
    server backup2.example.com:8080   backup;
}

server {
    location / {
        proxy_pass http://backend;
    }
}
```
具有定期health checks的动态配置组件可作为我们 commercial subscription的一部分.
```
resolver 10.0.0.1;

upstream dynamic {
    zone upstream_dynamic 64k;

    server backend1.example.com      weight=5;
    server backend2.example.com:8080 fail_timeout=5s slow_start=30s;
    server 192.0.2.1                 max_fails=3;
    server backend3.example.com      resolve;
    server backend4.example.com      service=http resolve;

    server backup1.example.com:8080  backup;
    server backup2.example.com:8080  backup;
}

server {
    location / {
        proxy_pass http://dynamic;
        health_check;
    }
}
```
## 指令
```
语法：upstream name {...}
默认：-
上下文：http 指的是这个指令用在http中
```
定义一个服务器组。服务器可以监听不同的端口。此外，
服务器可以混合侦听TCP和UNIX域套接字。

例如：
```
upstream backend {
    server backend1.example.com weight=5;
    server 127.0.0.1:8080       max_fails=3 fail_timeout=30s;
    server unix:/tmp/backend3;

    server backup1.example.com  backup;
}
```
默认情况下，使用加权循环平衡方法在服务器之间分配请求。
在上述示例中，每个7个请求将分发如下：
五个请求去了backend1.example.com，
向第二和第三服务器提供各一个请求。
如果连接服务器发生了错误，请求会去往下一台服务器，下一台不行就去下下一台，直到所有的服务器试过一遍、
如果从所有的服务器获取响应都失败了，客户端会受到最后一台服务器的响应结果。

```
语法：server address [parameters]
默认：-
上下文：upstream 指的是这个指令用在upstream中，其他同理。
```
定义服务器的地址和其他参数。
该地址可以指定为域名或IP地址，带有可选端口，也可以指定为“unix：”前缀之后指定的UNIX域套接字路径。
如果没有指定地址的端口，默认值是80。
解析为多个IP地址的域名一次定义多个服务器。
可以定义以下参数：
#### weight=number
设置服务器的权重，默认情况下为1。
#### max_conns=number
限制与代理服务器的最大并发活动连接数（1.11.5）。
默认值为零，意味着没有限制。
如果服务器组不驻留在共享内存share memory中，则限制适用于每个工作worker进程。

#### max_fails=number
设置与fail_timeout参数设置的持续时间内应该发生的服务器通信不成功的次数，以便在由fail_timeout参数设置的持续时间内考虑服务器不可用。
默认情况下，尝试次数不成功设置为1。
被认为是不成功的尝试是由proxy_next_upstream，fastcgi_next_upstream，uwsgi_next_upstream，scgi_next_upstream和memcached_next_upstream指令定义的。
#### fail_timeout=time
- 与服务器通信的指定次数不成功的考虑服务器不可用的时间;
- 以及服务器将被视为不可用的时间段

默认情况下，这个参数设置为10秒
#### backup
将服务器标记为备份服务器。当主服务器不可用时，它将被传递请求。
#### down
将服务器标记为永久不可用。
此外，以下参数可作为我们的commercial subscription的一部分。
#### resolve
#### route=string
设置服务器路由名称
#### service=name
#### slow_start=time
```
语法:	zone name [size];
默认:	—
上下文:	upstream
这个指令在1.9.0加入
```

```
语法:	state file;
默认:	—
上下文:	upstream
这个指令在1.9.7加入
```

```
语法:	hash key [consistent];
默认:	—
上下文:	upstream
这个指令在1.7.2加入
```

```
语法:	ip_hash;
默认:	—
上下文:	upstream
```
指定一个组应该使用根据客户端IP地址在服务器之间分配请求的负载平衡方法。
客户端IPv4地址的前三个八位字节或整个IPv6地址用作哈希键。
该方法确保来自同一客户端的请求将始终传递到同一台服务器，除非此服务器不可用。
在后一种情况下，客户端请求将被传递到另一个服务器。
很可能，它将始终是同一台服务器。
> 从1.3.2和1.2.2版本开始支持IPv6地址

如果其中一个服务器需要临时删除，则应该使用down参数进行标记，以便保留当前客户端IP地址的哈希值。

例如：
```
upstream backend {
    ip_hash;

    server backend1.example.com;
    server backend2.example.com;
    server backend3.example.com down;
    server backend4.example.com;
}
```
> 直到版本1.3.1和1.2.2，无法使用ip_hash负载平衡方法指定服务器的权重。

```
语法:	keepalive connections;
默认:	—
上下文:	upstream
这个指令在1.1.4加入
```

```
语法:	ntlm;
默认:	—
上下文:	upstream
这个指令在1.9.2加入
```

```
语法:	least_conn;
默认:	—
上下文:	upstream
这个指令在1.3.1加入和1.2.2
```
```
语法:	least_time header | last_byte [inflight];
默认:	—
上下文:	upstream
这个指令出现在1.7.10版本
```
```
语法:	queue number [timeout=time];
默认:	—
上下文:	upstream
这个指令出现在1.5.12版本
```
```
语法:	sticky cookie name [expires=time] [domain=domain] [httponly] [secure] [path=path];
        sticky route $variable ...;
        sticky learn create=$variable lookup=$variable zone=name:size [timeout=time];
默认:	—
上下文:	upstream
这个指令出现在1.5.7版本
```

```
语法:	sticky_cookie_insert name [expires=time] [domain=domain] [path=path];
默认:	—
上下文:	upstream
```
这个指令在1.5.7被废弃了。被sticky代替了。在上面的指令列表中。
## 嵌入的变量
ngx_http_upstream_module 模块支持下面的嵌入变量
#### $upstream_addr
#### $upstream_bytes_received
#### $upstream_cache_status
#### $upstream_connect_time
#### $upstream_cookie_name
#### $upstream_header_time
#### $upstream_http_name
#### $upstream_response_length
#### $upstream_response_time
#### $upstream_status
