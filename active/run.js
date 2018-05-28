//运行自动化程序
var fspath=require("path")
var fs=require('fs')
//var config=require('./config.js')
var fsutil=require('../filesystem/fsutil.js')

runTest=function(type,testname){
	var func=loadInterface() //载入接口信息
	console.log("start to run Test:"+type+" "+testname)
	if(type=="testcase"){
		//执行testcase测试用例
	}else if(type=="testsuites"){
		//执行testsuite测试集
	}else{
		console.log("type is error need be testcase or testsuites")
	}
	
	
}
//执行testcase
//@param pathname 相对路径
function runtestcase(testpath){
	//读取flow.txt中的要执行的接口内容
	if(!fs.existsSync(workpath+fspath.sep+testpath)){
		console.log("测试用例不存在，无法继续执行")
		return
	}
	var testcasedatapath=config["workpath"]+fspath.sep+testpath
	
	
	
}

function runfunc(func){
	
}
function runtestsuites(testsuitepath){
	
}
var workpath=process.cwd()
function loadInterface(){
	 //获取工作路径
	var interfacepath=workpath+fspath.sep+"interface"
	filemap={}
	fsutil.filterDirBypostfix(interfacepath,"\.js",filemap)
	var interfaceinfo={}
	for(var obj in filemap){
		var funcpath=filemap[obj]
		var func=loadfunction(funcpath)
		interfaceinfo[obj]=func
		
	}
	return interfaceinfo
}

function loadfunction(path){
	var obj=require(path)
	return obj
}
//testcasepath,载入信息
function loadTestcase(testpath){
	
}
exports.runTest=runTest