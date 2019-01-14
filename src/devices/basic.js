export default class DeviceBasic {
    getHeight() {
        return Math.max(screen.width, screen.height) * (window.devicePixelRatio || 1);
    }
}