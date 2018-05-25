var _app_name="zitradio";
var _app_version="0.0.6";
var _app_id="land.friendzit.onair";
var _r_path=["exit","home()"];
var _loading='<p style="text-align:center"><img src="img/loading.svg" style="max-width:100%"></p>';
var _popup_close='<div class=popup-close onclick="popup_close()"><i class="fa fa-close fa-2x"></i></div>';
var _host="http://friendzit.land:5000/";
var _api=_host+"services/";
var ls=localStorage;

function startstream(){
	if(oo("play-status").value=="offline"){
		alert("Radio is offline");
		return false;
	}
	if(oo("play-status").value=="stop"){
		stream.play();
		oo("play-status").value="play";
		oo("img-play").src="img/stop.png";
	} else {
		stream.stop();
		oo("play-status").value="stop";
		oo("img-play").src="img/play.png"
	}
}

function hideall(){
	oo("menu").style.left="-100%";
	oo("menu").style.animation="none";
	var rid=["page-home","page-rubrik","page-thread","page-search"];
	for(var i=0;i<rid.length;i++){
		oo(rid[i]).style.display="none";
	}
}
function splash(){
	oo("img-splash").style.animation="swing 1s";
	splash_after();
}
function splash_after(){
	register_local();
	if(localStorage.signed==1){
		oo("menu-logged-in").style.display="table";
		oo("menu-not-logged-in").style.display="none";
		oo("myaccount-fullname").value=ls.myname;
		oo("myaccount-email").value=ls.myemail;
		oo("page-myprofile-email").innerText=ls.myemail;
		var rBG=["bgprofile0.jpg","bgprofile0.jpg","bgprofile0.jpg","bgprofile0.jpg"];
		var rand=Math.floor(Math.random() * 4);
		oo(".myprofile-box-top-new")[0].style.backgroundImage="url(img/bgprofile"+rand+".jpg)";
	}
	oo("version").innerText=_app_version;
	setTimeout(function(){
		oo("splash").style.display="none";
		oo("main").style.display="block"; 
		ebook_popular();
		ebook_latest();
	},2000);
}
function popup_close(){oo("popup-detail").style.display="none";}
function back(){
	var lastdir=_r_path[_r_path.length-2];
	if(lastdir=="exit"){
		if(navigator.app) {
			navigator.app.exitApp();
		} else if (navigator.device) {
			navigator.device.exitApp();
		} else {
			window.close();
		}
	} else {
		var tmpFunc = new Function(lastdir);
		tmpFunc();
		_r_path.pop();
	}
}
function in_array(str,r){
	for(var i in r){
		if(r[i]==str) return true;
	}
	return false;
}
function pushtopath(f){
	if(!in_array(f,_r_path)) _r_path.push(f);
}
