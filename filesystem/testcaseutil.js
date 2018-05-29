//testcase相关操作
//create testcase相关操作,采用xml存储
fs=require('fs')
fsutil=require('./fsutil.js')
fspath=require('path')
fstestcase=require('../model/testcasemodel.js')
config=require('../config.js')
//创建测试用列

createtestcase=function(testcasepath){
	var path=
}
//删除测试用例
deletetestcase=function(testcasepath){
	
}

//读取测试用例,相对路径
readTestcase=function(testcasepath){
	var path=config.workpath+fspath.sep+testcasepath
	
}