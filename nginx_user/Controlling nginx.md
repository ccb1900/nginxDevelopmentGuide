nginx可以用信号控制。
默认情况下，主进程的进程ID将写入文件/usr/local/nginx/logs/nginx.pid。
该名称可能在配置时更改，或使用pid指令在nginx.conf中进行更改。
master进程支持以下信号：

- TERM, INT	快速关闭
- QUIT	正常关闭
- HUP	 改变配置，跟上改变的时区（仅适用于FreeBSD和Linux），使用新配置启动新的工作进程，正常关闭旧的工作进程。
- USR1	重新打开日志文件
- USR2	升级可执行文件
- WINCH	正常关闭worker进程

也可以使用信号来控制个体worker进程，尽管不需要。支持的信号是：
- TERM, INT	快速关闭
- QUIT	正常关闭
- USR1	重新打开日志文件
- WINCH	调试异常终止（需要启用debug_points）

## 改变配置
 为了使nginx重新读取配置文件，应将HUP信号发送到master进程。
 
 我们来举例说明一下。假设ginx是在FreeBSD 4.x上运行的，命令是：
 ```
 ps axw -o pid,ppid,user,%cpu,vsz,wchan,command | egrep '(nginx|PID)'
 ```
 产生以下输出：
 ```
   PID  PPID USER    %CPU   VSZ WCHAN  COMMAND
 33126     1 root     0.0  1148 pause  nginx: master process /usr/local/nginx/sbin/nginx
 33127 33126 nobody   0.0  1380 kqread nginx: worker process (nginx)
 33128 33126 nobody   0.0  1364 kqread nginx: worker process (nginx)
 33129 33126 nobody   0.0  1364 kqread nginx: worker process (nginx)
 ```