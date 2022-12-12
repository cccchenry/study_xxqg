
# 作者(Author)：Yaodo
# 链接(URL)：https://www.imtrq.com/archives/3198
# 来源(Source)：Yaodo Blog - 妖渡的博客

前言

之前我一直都用的是tech强国，但以前的tech强国每天都需要手动登录，如果我只刷自己一个人的话其实还不是很繁琐，但如果要帮别人一起刷就很不方便。
我也尝试过微信推送和网页推送，都有不方便的地方。微信推送需要公网ip，如果你在服务器上刷很方便，但是异地登录又很容易被风控；网页推送需要公网ip、内网穿透、相同网络环境三选一，部署在路由器上也不方便远程管理。而TG推送只需要路由器翻墙就可以了，用上openwrt的人应该没有不翻墙的吧。
我使用的是N1盒子，系统是flippy的69+o，自带docker，每天把我和我对象的学习强国刷到39分，已经稳定运行了两个月。
其实官方文档已经有了十分清晰的教程，你完全可以不看这一篇~
教程
1 新建docker-compose.yml
1.1 ssh登录路由器

我用的是Termius，可以在各个客户端中同步主机信息，我特别喜欢这一点


1.2 新建一个study_xxqg文件夹，进入该文件夹

mkdir study_xxqg
cd study_xxqg
1.3 新建一个docker-compose.yml文件

vim docker-compose.yml
按i/insert进入编辑模式，将下列代码粘贴进去

version: "3.5"
services:
  xuexi-auto:
    image: jolanse/study_xxqg:latest
    # 容器名
    container_name: xuexi-auto
    environment:
    # 时区
      - TZ=Asia/Shanghai
    # 配置文件路径
    volumes:
      - ./config:/opt/config
    # 映射端口
    ports:
      - 8080:8080
    restart: unless-stopped
按下esc，输入:wq回车，保存并退出


2 新建配置文件，配置定时任务和tg代理
2.1 新建配置文件

在study_xxqg文件夹下，新建config文件夹并进入

mkdir config
cd config
新建配置文件

vim config.yml
把下列代码粘贴进去

# 刷课模式，默认为3，
# 1：只刷文章何视频
# 2：只刷文章和视频和每日答题
# 3：刷文章和视频和每日答题每周答题和专项答题
model: 3
# 日志等级
# panic
# fatal
# error
# warn, warning
# info
# debug
# trace
log_level: "info"
# 是否显示浏览器
show_browser: false
# 跳转学习强国的scheme,默认使用本仓库的action自建scheme,若需自行修改，可直接复制仓库下/docs/scheme.html到任意静态文件服务器
scheme: "https://johlanse.github.io/study_xxqg/scheme.html?"
push:
  ding:
    enable: false
    access_token: ""
    secret: ""
  # 目前仅支持push-plus推送二维码，默认建议使用push-plus推送
  # push-plus使用方法见：http://www.pushplus.plus/
  push_plus:
    enable: false
    token: ""
# telegram交互模式配置
tg:
  enable: false
  chat_id: 0
  token: ""
  # telegram的代理，不配置默认走系统代理
  proxy: ""
  # 自定义tg的api,可通过cloudflare搭建，需自备域名
  custom_api: "https://api.telegram.org"
  # 白名单id,包括群id或者用户id,若为空，则允许所有群所有用户使用，若仅用于单人，直接配置上面的chat_id就可以
  white_list:
    - 123
# 网页端配置
web:
  # 是否启用网页
  enable: true
  #
  host: 0.0.0.0
  port: 8080
  # 网页端登录账号
  account: admin
  # 网页端登录密码
  password: admin
# 微信公众号测试号配置
wechat:
  # 是否启用
  enable: false
  # 开发者平台设置的token
  token: ""
  # 开发者平台的secret
  secret: ""
  # 开发者平台的appId
  app_id: ""
  # 发送登录消息需要使用的消息模板
  # 模板标题，随意  模板内容：  点我登录，然后在浏览器中打开！！
  login_temp_id: ""
  # 发送普通消息需要使用的消息模板
  # 模板标题：随意 模板内容： {{data.DATA}}
  normal_temp_id: ""
  # xxqg会每隔两小时左右检查所有用户的ck有效性，若开启该选项，会在检查失败时推送提醒消息
  push_login_warn: false
  # 微信管理员的openid,可点击关于按钮获得，配置后请重启程序
  super_open_id: ""
# pushDeer推送配置,详情参考psuhDeer官网：http://www.pushdeer.com/official.html
push_deer:
  enable: false
  api: "https://api2.pushdeer.com"
  token: ""
# 登录重试配置
retry:
  # 重试次数
  times: 0
  # 重试之间的时间间隔，单位为分钟
  intervals: 5
# 设置是否定时执行学习程序，格式为cron格式
# "9 19 * * *" 每天19点9分执行一次
# "* 10 * * *” 每天早上十点执行一次
cron: "0 0 * * *"
# 定时任务随机等待时间，单位：分钟
cron_random_wait: 0
#windows环境自定义浏览器路径，仅支持chromium系列，需要将\替换为/或者\\
edge_path: ""
# 启动时等待时间，为了防止代理启动比软件慢而报错，默认不等待，单位秒
start_wait: 0
# 专项答题可接受的最小分值，因一天重复运行的时候，若专项答题未能答满会继续答新的一套题，会浪费题
special_min_score: 10
# 题目搜索的顺序，为true则从2018年最开始搜题，否则从现在最新开始搜题
reverse_order: false
# 定时任务运行时协程池的大小
pool_size: 1
按下esc，输入:wq回车，保存并退出

2.2 定时任务

修改配置文件的这一段：

# 设置是否定时执行学习程序，格式为cron格式
# "9 19 * * *" 每天19点9分执行一次
# "* 10 * * *” 每天早上十点执行一次
cron: "0 0 * * *"
我是每天早上6点半执行，那么我就改成

# 设置是否定时执行学习程序，格式为cron格式
# "9 19 * * *" 每天19点9分执行一次
# "* 10 * * *” 每天早上十点执行一次
cron: "30 6 * * *"
2.3 tg代理

这一段我完全复制的官方文档，如果你的路由器已经处于翻墙环境，那么第6步可以省略

配置 config.yml的如下部分

tg:
  enable: false
  chat_id: 0
  token: ""
  # telegram的代理，不配置默认走系统代理
  proxy: ""
  # 自定义tg的api,可通过cloudflare搭建，需自备域名
  custom_api: "https://api.telegram.org"
  # 白名单id,包括群id或者用户id,若为空，则允许所有群所有用户使用，若仅用于单人，直接配置上面的chat_id就可以
  white_list:
    - 123
在 Tg 中搜索@BotFather ，发送指令/newbot创建一个 bot
获取你创建好的 API Token 格式为123456789:AAaaaa-Uuuuuuuuuuu ,要完整复制全部内容
在 Tg 中搜索@userinfobot ，点击START，它就会给你发送你的信息，记住 Id 即可，是一串数字。
跟你创建的 bot 会话，点击START，或者发送/start
将第 2 步获取的 token 放在tokenn中，第 3 步获取的 Id 放到chat_id中，enable设置为 true。
因为众所周知的原因，telegram推送需要进行配置代理，例如clash的代理配置为http://127.0.0.1:7890即可，若通过cf反代的api,,则填写到custom_api配置项
若不配置代理的情况下会默认走系统代理，white_list建议填写自己的chat_id,为可以使用机器人的白名单，若需要在群组中使用，请相应进行配置
3 开始运行

回到study_xxqg文件夹，输入

docker-compose up -d
并回车，拉取完毕之后会自动运行，tg机器人那边会提示已经上线，之后可以点击menu按照提示操作


如果没有提示上线的话，请检查代理、查看日志。N1盒子可能需要手动点击一下联网。

