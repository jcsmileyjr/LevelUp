import {Toast} from 'native-base';
showWarningToast = () => {
	Toast.show({
			text:"Missing Information.",
			textStyle:{color:"white"},
			buttonText: "Close",
			type:"warning",
			position:"top",
			duration: 3000,
	});
}

export default showWarningToast;