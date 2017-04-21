## 配置文件的结构
nginx由模块组成，这些模块由配置文件中指定的指令控制。
一个简单的指令由指令名称和参数组成，由空格分开，以分号结尾。
一个块指令和简单的指令有相同的结构，但是不是以分号结尾，而是由大括号（{和}）包围的一组附加指令结束。
如果一个块指令可以在大括号内部有其他指令，那么它被称为上下文（例如：[events]()，[http]()，[server]()和[location]()）。

配置文件中放置在任何上下文之外的伪指令都被认为是main上下文。
events和http指令驻留在main上下文，server在http中，location在server中。

＃号之后的一行的其余部分被视为注释。

## 提供静态内容
## 设置简单的代理服务器
## 设置FastCGI代理
nginx可以用来路由请求到运行了用不同的框架和语言构建的应用程序的fastcgi服务器，
，例如PHP。

使用FastCGI服务器的最基本的nginx配置包括
使用[fastcgi_pass]()指令而不是proxy_pass指令，
和[fastcgi_param]()指令来设置传递给FastCGI服务器的参数。
假设FastCGI服务器可以在localhost：9000上访问。

```
server {
    location / {
        fastcgi_pass  localhost:9000;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param QUERY_STRING    $query_string;
    }

    location ~ \.(gif|jpg|png)$ {
        root /data/images;
    }
}
```
这将设置一个服务器，
将除静态图像请求之外的所有请求路由到通过FastCGI协议在localhost：9000上运行的代理服务器。