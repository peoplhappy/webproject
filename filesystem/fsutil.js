var fspath=require('path')

var fs=require("fs")

//创建目录，通过mkdir递归创建
mkdirs=function(path){
	var pathinfo=fspath.parse(path); 
    var root=pathinfo.root
    var dir=pathinfo.dir
	var base=pathinfo.base
    var childdir=dir.replace(root,"")+fspath.sep+base
    var pathdirname=childdir.split(fspath.sep)
    for(var obj in pathdirname){
		//console.log(pathdirname[obj])
		root=root+fspath.sep+pathdirname[obj]
		if(!fs.existsSync(root)){
			fs.mkdirSync(root)
		}
		
	}	
}

getfatherdir=function(path){
	var pathinfo=fspath.parse(path); 
	return pathinfo.dir
}

copyFile=function(srcpath,dstpath){
	if(!fs.existsSync(srcpath)){
		//文件不存在
		console.log("src文件不存在，无法完成拷贝")
		return false
	}
	var fatherdir=getfatherdir(dstpath)
	if(!fs.existsSync(fatherdir)){
		mkdirs(fatherdir)
	}
	//start to copyFile
	var data = '';
	var readerStream = fs.createReadStream(srcpath);
	var writerStream = fs.createWriteStream(dstpath);
	readerStream.pipe(writerStream);
	return true
	
	
}
copyDir=function(srcdir,dstdir){
	if(!fs.existsSync(srcdir)){
		//文件不存在
		console.log("src文件不存在，无法完成拷贝")
		return false
	}
	stat=getstat(srcdir)
	if(stat!=undefined){
		if(stat.isDirectory()){
			//读取src文件路径
	        var dir=fs.readdirSync(srcdir)
			if(dir.length==0){
				mkdirs(dstdir)
			}
			for(var obj in dir){
				var srcdirpath=srcdir+fspath.sep+dir[obj]
				var dstdirpath=dstdir+fspath.sep+dir[obj]
				copyDir(srcdirpath,dstdirpath)
			}
		}else{
			copyFile(srcdir,dstdir)
		}
	}
	
	
}
//获取文件状态
getstat=function(path){
	if(!fs.existsSync(path)){
		//文件不存在
		console.log("src文件不存在，无法获取状态")
		return undefined
	}
	stat=fs.statSync(path)
	return stat
	
}
//从文件路径中找出
filterDirBypostfix=function(path,pattern,filemap){
	if(!fs.existsSync(path)){
		//文件不存在
		console.log("src文件不存在，无法获取文件资源")
		return false
	}
	stat=getstat(path)
	if(stat!=undefined){
		if(stat.isDirectory()){
			//读取src文件路径
	        var dir=fs.readdirSync(path)
			for(var obj in dir){
				var findpath=path+fspath.sep+dir[obj]
				filterDirBypostfix(findpath,pattern,filemap)
			}
		}else{
			var pathinfo=fspath.parse(path); 
			var mapname=pathinfo.name
			var base=pathinfo.base
			var postfix=base.replace(mapname,"")
			//console.log("mapname :"+mapname)
			if(postfix==pattern){
				
				filemap[mapname]=path
			}
		}
	}
	
	
	
}
deleteFile=function(path){
	if(!fs.existsSync(path)){
		//文件不存在
		console.log("文件或文件夹不存在，无法删除文件资源")
		return false
	}
	stat=getstat(path)
	if(stat!=undefined){
		if(stat.isDirectory()){
			//读取src文件路径
	        var dir=fs.readdirSync(path)
			for(var obj in dir){
				var findpath=path+fspath.sep+dir[obj]
				deleteFile(findpath)
			}
			//删除总文件夹
			fs.rmdirSync(path)
		}else{
			//删除文件 
			fs.unlinkSync(path)
		}
	}
}


exports.mkdirs=mkdirs
exports.getfatherdir=getfatherdir
exports.getstat=getstat
exports.copyDir=copyDir
exports.copyFile=copyFile
exports.filterDirBypostfix=filterDirBypostfix
exports.deleteFile=deleteFile