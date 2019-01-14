import Device from './device'

if (typeof window != 'undefined') {
	window.Device = Device
}

if (typeof global != 'undefined') {
	global.Device = Device
}

export default Device