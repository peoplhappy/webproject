//���ڴ����Զ�����Ŀ
//��Ŀ����testcase�ļ���(����·��),�ӿ��ļ���interface,�滻��api�ļ��У�item_replace���Լ������ļ�config

var fs=require("fs")
var fspath=require('path')
var fsutil=require('../filesystem/fsutil.js')
createProject=function(path,name){
	//������Ŀ
	//��������Ŀ·��
	console.log("start to create project "+name)
	var pathname=["interface","testcase","item_replace"]
	
	
	for(var key in pathname){
		var projectpath=path+fspath.sep+name+fspath.sep+pathname[key]
        console.log("start to create path "+pathname[key])		
	    fsutil.mkdirs(projectpath)
	}
	
    //��ȡģ�崴�������ļ�
	var currentpath=process.cwd()
	console.log("currentpath:"+currentpath)
	fsutil.copyFile(currentpath+fspath.sep+"/template/config.js",path+fspath.sep+name+fspath.sep+"config.js")
	console.log("create project end "+name)
	//����Ҫ��js�ļ���������Ӧ����Ŀ�ļ����£�δע�ᵽnpm��
	var dirsname=['commander','filesystem','log','assert']
	for(var obj in dirsname){
		fsutil.copyDir(currentpath+fspath.sep+dirsname[obj],path+fspath.sep+name+fspath.sep+dirsname[obj])
	}
}
exports.createProject=createProject