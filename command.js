var project=require('./project/create.js')
var command=require('./commander')
var test=require('./active/run.js')

command.option('-c, --createproject', 'To createProject $path,$name two param')
.option('-r, --runtest', 'To runtest $type,$relativepath of testcase or suites $time')
.parse(process.argv);
console.log('you ordered a command with:');
if (command.createproject){
	if(process.argv.length==5){
		project.createProject(process.argv[3],process.argv[4])
	}else{
		console.log("param input error please input two param, first is the project savepath,second is projectname")
	}
	
	
}else if(command.runtest){
	if(process.argv.length==5){
		test.runTest(process.argv[3],process.argv[4])
	}else{
		console.log("param input error please input two param, first is the test type,second is testcase relativepath")
	}
}