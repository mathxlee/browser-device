# 介绍

@mathx/browser-device 是一个轻量级获取浏览器和手机信息的库

# 来源

项目fork自 fengyaogit123/browser-device-js，但是作者似乎没有更新了，又需要一些新功能，那就自己动手开发一个新版啦~
下面大部分文档来自原作者 fengyaogit123~

# 更新日志
2018.12.28 更新字段名，从phone改为device，新增PC端设备识别

2018.11.30 更新代码组织方式

2018.11.29 更新iOS设备信息（新增iPhone Xr, iPhone Xs, iPhone Xs Max）

# 优点

1. 能够获取众多iOS的机型
    
2. 支持amd 

3. 区分 Edge IE11  IE11以下 Opera Firefox 微信内置浏览器 QQ浏览器 UC浏览器 Safari

4. 同时识别PC和移动设备

> `Android` 手机太多,没有基础数据，所以类型统一为Android 后面的版本数据会补上

# 如何获取

最新版本通过以下方式都可以下载：

执行`npm i @mathx/browser-device`

# 如何使用

## 浏览器引入:

```html

    直接引入
    <script src="browser-device/lib/device.js"></script>


```
## 模块引入:

```js

    import Device from "@mathx/browser-device"
    var d = new Device()
    d.getDevice() //获取所有信息
    /**
    {
        browserVer: "",//浏览器版本
        browserName: "",//浏览器名称 Edge IE11  IE Opera Firefox WeiXin QQ UC Safari
        deviceSystemType: "",//手机系统类型 android / ios
        deviceSystemVer: "",//手机系统版本  android 4.1 / ios 6
        deviceName: "",//iPhone 8 /iPhone X    Android  
    }

    **/
    d.getAndroidV()//获取android版本

    d.getIOSV()// 获取ios版本

    d.getPhoneSystemType()//获取 系统类型 ios /android  /Windows Phone

    d.isPC()//是否PC

    d.isMobile()//是否手机

    d.getBrowser()//获取浏览器名称 Edge IE11  IE Opera Firefox WeiXin QQ UC Safari
```


# 参考链接

    https://github.com/joyqi/mobile-device-js
