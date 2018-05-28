//用于创建自动化项目
//项目包含testcase文件夹(存入路径),接口文件夹interface,替换用api文件夹，item_replace，以及配置文件config

var fs=require("fs")
var fspath=require('path')
var fsutil=require('../filesystem/fsutil.js')
createProject=function(path,name){
	//创建项目
	//创建总项目路径
	console.log("start to create project "+name)
	var pathname=["interface","testcase","item_replace"]
	
	
	for(var key in pathname){
		var projectpath=path+fspath.sep+name+fspath.sep+pathname[key]
        console.log("start to create path "+pathname[key])		
	    fsutil.mkdirs(projectpath)
	}
	
    //读取模板创建配置文件
	var currentpath=process.cwd()
	console.log("currentpath:"+currentpath)
	fsutil.copyFile(currentpath+fspath.sep+"/template/config.js",path+fspath.sep+name+fspath.sep+"config.js")
	console.log("create project end "+name)
	//将需要的js文件拷贝到对应的项目文件夹下（未注册到npm）
	var dirsname=['commander','filesystem','log','assert']
	for(var obj in dirsname){
		fsutil.copyDir(currentpath+fspath.sep+dirsname[obj],path+fspath.sep+name+fspath.sep+dirsname[obj])
	}
}
exports.createProject=createProject