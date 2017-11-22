var login = {
	//页面初始化加载页面
	init:function() {
		$("#formSubmit").bind('click',login.doLogin);//绑定登录按钮click
		login.showYZM();//显示图形验证码
		$("#yzmPic").bind('click',login.refreshYzm);//绑定刷新图形页面click
		$("#changeYzm").bind('click',login.refreshYzm);
		login.showErrorMsg();//如果有错误信息，显示错误信息
		login.bindLoginNameFcous();//绑定账号框的fcous事件
		login.bindPasswdFcous();//绑定密码框的fcous事件
		//绑定回车事件
		$(document).keydown(function(event){
			switch (event.which) {
				case 13:
					$("#formSubmit").click();
				default:
			}
		});
	},
	encrypt: function (str) {
		var key = login.decrypt('23d8cac1ced85fdae0eb075df9144ed4');
		var keyHex = CryptoJS.enc.Utf8.parse(key);
		var encrypted = CryptoJS.DES.encrypt(str, keyHex, {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7
		});
		return encrypted.ciphertext.toString();
	},
	//校验form表单
	checkForm:function(){
		var loginName = $("#loginName").val();
		var passwd = $("#passwd").val();
		var yzm = $("#yzm").val();
		var isYzmShow = $("#yzmSpan").is(":hidden");

		//校验账号为空
		if($.trim(loginName)==""){
			login.hideErrorShow("loginNameFlag");//隐藏自己框下的所有提示
			$("#loginNameErrorShow").html("请输入账号");
			$("#loginNameErrorShow").show();//显示提示信息
			$("#loginNameErrorPic").show();//显示提示信息
			return false;
		}
		//校验密码为空
		if($.trim(passwd)==""){
			login.hideErrorShow("passwdFlag");//隐藏自己框下的所有提示
			$("#passwdErrorShow").html("请输入密码");
			$("#passwdErrorShow").show();//显示提示信息
			$("#passwdErrorPic").show();//显示提示信息
			return false;
		}
		//校验验证码为空
		if(!isYzmShow && $.trim(yzm)==""){
			login.hideErrorShow("yzmFlag");//隐藏自己框下的所有提示
			$("#yzmErrorShow").html("请输入验证码");
			$("#yzmErrorShow").show();//显示提示信息
			$("#yzmErrorPic").show();//显示提示信息
			return false;
		}
		return true;
	},
	//登录
	doLogin:function(){
		_tag.dcsMultiTrack('wt.s_cart','login');//BI
		if(login.checkForm()){
			$("#passwd").val(login.encrypt($("#passwd").val()));
			LFControl.loading.Start();
			$("#loginform").submit();
		}
	},
	//显示图形验证码
	showYZM:function(){
		var code = $("#code").val();
		//需要图形验证码
		if(code=="50001"){
			$("#yzmSpan").show();
		}
	},
	//刷新验证码
	refreshYzm:function(){
		
	},
	//隐藏所有错误提示
	hideAllErrorShow:function(){
		$(".errorShowFlag").html("");
		$(".errorShowFlag").hide();
	},
	//绑定账号框的fcous事件
	bindLoginNameFcous:function(){
		$("#loginName").focus(function(){
			login.hideErrorShow("loginNameFlag");//隐藏自己框下的所有提示
			$(".successShowFlag").hide();//所有的成功提示隐藏
			$("#loginNameSuccessShow").html("请输入账号");
			$("#loginNameSuccessShow").show();//显示提示信息
		});
	},
	//绑定密码框的fcous事件
	bindPasswdFcous:function(){
		$("#passwd").focus(function(){
			login.hideErrorShow("passwdFlag");//隐藏自己框下的所有提示
			$(".successShowFlag").hide();//所有的成功提示隐藏
			$("#passwdSuccessShow").html("请输入密码");
			$("#passwdSuccessShow").show();//显示提示信息
		});
	},
	//绑定验证码框的fcous事件
	bindYzmFcous:function(){
		$("#yzm").focus(function(){
			login.hideErrorShow("yzmFlag");//隐藏自己框下的所有提示
			$(".successShowFlag").hide();//所有的成功提示隐藏
			$("#yzmSuccessShow").html("请输入验证码");
			$("#yzmSuccessShow").show();//显示提示信息
		});
	},
	//隐藏某个输入框下所有的的提示信息和错号对号图片
	hideErrorShow:function(cssFlag){
		$("."+cssFlag).hide();
	}
};

$(document).ready(function () {
	login.init();
});

