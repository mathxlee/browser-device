import DeviceIos from './devices/ios'

export default class Device {
    constructor(userAgent) {
        if (userAgent) {
            return this.ua = userAgent.toLowerCase();
        }

        if (window) {
            return this.ua = window.navigator.userAgent.toLowerCase()
        }

        throw new Error('userAgent is not defined！')
    }

    getDevice() {
        let deviceSystem = '';
        let device = {
            browserVer: "",//浏览器版本
            browserName: "",//浏览器名称 QQ 火狐 谷歌 360 苹果 搜狗 IE
            deviceSystemType: "",//手机系统类型 android ios
            deviceSystemVer: "",//手机系统版本  android 4.1 ios6
            deviceName: "",//小米 魅族
            isMobile: this.isMobile()
        };

        device.browserName = this.getBrowser();

        if (device.isMobile) {
            deviceSystem = this.getMobileDeviceSystemType();

            if (deviceSystem.toLowerCase() == 'ios') {
                device.deviceSystemVer = this.getIOSV();
                device.deviceName = new DeviceIos().getPhoneType();
            }

            if (deviceSystem.toLowerCase() == 'android') {
                device.deviceSystemVer = this.getAndroidV();
                device.deviceName = "Android";
            }

            device.deviceSystemType = deviceSystem;
            //手机类型 比如小米 魅族 可以通过GPU判断 后期增加
            //android版本  4.1 4.2  ios几

            return device;
        } else {
            deviceSystem = this.getPCSystemType();
            device.deviceSystemVer = ''; // PC不返回版本号
            device.deviceSystemType = deviceSystem;
            device.deviceName = deviceSystem;
        }

        return device;
    }

    //获取安卓版本
    getAndroidV() {
        let ua = this.ua;
        let version = '';

        if (ua.indexOf("android") > 0) {
            let v_info = ua.match(/android [\d._]+/gi);
            version = (v_info + "").replace(/[^0-9|_.]/ig, "").replace(/_/ig, ".");
        }

        return version;
    }

    //获取ios系统版本版本
    getIOSV() {
        let ua = this.ua;
        let version = '';

        if (ua.indexOf("like mac os x") > 0) {
            let reg = /os [\d._]+/gi;
            let v_info = ua.match(reg);
            version = (v_info + "").replace(/[^0-9|_.]/ig, "").replace(/_/ig, ".");
        }

        return version;
    }

    //返回手机系统
    getMobileDeviceSystemType() {
        let u = this.ua;
        let isAndroid = u.indexOf('android') > -1 || u.indexOf('adr') > -1; //android终端
        let isiOS = !!u.match(/\(i[^;]+;( u;)? cpu.+mac os x/); //ios终端

        let isWinPhone = u.indexOf('Windows Phone'.toLowerCase()) > -1
        if (isAndroid) return 'Android'
        if (isiOS) return 'iOS'
        if (isWinPhone) return 'Windows Phone'

        return ''
    }

    // 返回PC系统信息
    getPCSystemType() {
        let systemName = '';
        const ua = this.ua;
        const mapSystem = {
            'Windows 3.11': 'Win16',
            'Windows 95': '(Windows 95)|(Win95)|(Windows_95)',
            'Windows 98': '(Windows 98)|(Win98)',
            'Windows 2000': '(Windows NT 5.0)|(Windows 2000)',
            'Windows XP': '(Windows NT 5.1)|(Windows XP)',
            'Windows Server 2003': '(Windows NT 5.2)',
            'Windows Vista': '(Windows NT 6.0)',
            'Windows 7': '(Windows NT 6.1)',
            'Windows 8': '(Windows NT 6.2)|(WOW64)',
            'Windows 10': '(Windows 10.0)|(Windows NT 10.0)',
            'Windows NT 4.0': '(Windows NT 4.0)|(WinNT4.0)|(WinNT)|(Windows NT)',
            'Windows ME': 'Windows ME',
            'Open BSD': 'OpenBSD',
            'Sun OS': 'SunOS',
            'Linux': '(Linux)|(X11)',
            'Mac OS': '(Mac_PowerPC)|(Macintosh)',
            'QNX': 'QNX',
            'BeOS': 'BeOS',
            'OS/2': 'OS/2',
            'Search Bot': '(nuhk)|(Googlebot)|(Yammybot)|(Openbot)|(Slurp)|(MSNBot)|(Ask Jeeves/Teoma)|(ia_archiver)'
        };

        for (let sys in mapSystem) {
            if (!!ua.match(new RegExp(mapSystem[sys], 'ig'))) {
                systemName = sys;
                break;
            }
        }

        return systemName;
    }

    //是否是PC
    isPC() {
        return !!!this.ua.match(/(iPhone|iPod|android|ios|iPad|windows phone|tablet)/i)
    }

    //是否是手机
    isMobile() {
        return !this.isPC();
    }

    //获取浏览器类型 
    getBrowser() {
        const ua = this.ua;
        const is = (str) => {
            return ua.indexOf(str.toLowerCase()) > -1
        }
        const ie11 = () => {
            return ("ActiveXObject" in window)
        }
        if (is("Opera")) return "Opera"
        if (is("compatible") && is("MSIE")) return "IE"
        if (is("NET4.0C") && is("rv") && is("Windows")) return "IE"
        if (ie11()) return "IE11"
        if (is("Edge") && is("NT")) return "Edge"
        if (is("Firefox")) return "Firefox"
        if (is("micromessenger")) return "WeiXin"
        if (is("UCBrowser")) return "UCBrowser"
        if (is("QQBrowser")) return "QQBrowser"
        if (is("Safari") && !is("Chrome")) return "Safari"
        if (is("Safari") && is("Chrome")) return "Chrome"
        
        return '';
    }
}

