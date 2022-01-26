// panel/index.js, this filename needs to match the one registered in package.json
const packageName = "excel_to_json";
const fs = require('fs');
const path = require('path');
const xlsx = Editor.require('packages://' + packageName + '/node_modules/_node-xlsx@0.16.1@node-xlsx');
const Store = Editor.require('packages://' + packageName + '/node_modules/_electron-store@6.0.1@electron-store');
const store = new Store();



//const store = new Store();

//读取缓存的值
//let store_excel = store.get('excel_dir');
//let store_json = store.get('json_dir');

var c_data= {};
var s_data= {};
let json_name = 'excel_config.json';        //生成的文件名字



Editor.Panel.extend({
    // css style for panel
    style: fs.readFileSync(Editor.url('packages://' + packageName + '/panel/index.css', 'utf8')) + "",

    // html template for panel
    template: fs.readFileSync(Editor.url('packages://' + packageName + '/panel/index.html', 'utf8')) + "",

  // method executed when template and styles are successfully loaded and initialized
    ready () {   
        
        app = new window.Vue({
            el: this.shadowRoot,
            data: {
                excel_dir:"",
                json_dir:"",
            },
            created(){
                //读取缓存的值
                let store_excel = store.get('excel_dir');
                let store_json = store.get('json_dir');               
                if(store_excel != undefined)
                {
                    this.excel_dir = store_excel;
                }
                if(store_json != undefined)
                {
                    this.json_dir = store_json
                }
            },
            methods: {
                btn_excel(){         
                    let res = Editor.Dialog.openFile({
                        title: "选择Excel的根目录",
                        defaultPath: Editor.Project.path,
                        properties: ['openDirectory'],
                    });            
                    if (res !== -1) 
                    {
                        let dir = res[0];
                        if (dir !== this.excelRootPath)
                        {
                            store.set('excel_dir', res[0]);                            
                            this.excel_dir = res[0];               
                        }
                    }            
                },
                btn_json(){
                    let res = Editor.Dialog.openFile({
                        title: "选择Excel的根目录",
                        defaultPath: Editor.Project.path,
                        properties: ['openDirectory'],
                    });            
                    if (res !== -1) 
                    {                   
                        let dir = res[0];
                        if (dir !== this.excelRootPath)
                        {
                            store.set('json_dir',res[0]);
                            this.json_dir = res[0]; 
                        }
                    }       
                },
                btn_go(){
                    if(this.excel_dir == '' || this.excel_dir == undefined)
                    {
                        alert('请输入excel所在目录');
                        return;
                    }
                    else if(this.json_dir == '' || this.json_dir == undefined)
                    {
                        alert('请输入json输出目录');
                        return;
                    }
                   
                    fs.readdir(path.join(this.excel_dir+'/'), (err, files)=>{  
                        for(let i=0;i<files.length;i++)
                        {       
                            console.log('files',files);
                            if(~files[i].indexOf('.xls'))
                            {
                                console.log('files yes:',files[i]);
                                let file_name = files[i].split(".")[0]; 
                                //开始将excel文件转变成json文件
                                //读取文件内容
                                let obj = xlsx.parse(path.join(this.excel_dir+'/', files[i]));
                                var excelObj=obj[0].data;
                                console.log(excelObj);  
                                
                                var array_json = {};
                                var array_json_index = [];
                    
                                //将第一行文字注释先干掉
                                for(let i=1,j=0;i<excelObj.length;i++,j++)
                                {
                                    array_json_index[j] = excelObj[i];
                                }
                                //console.log('array_json_index:',array_json_index);
                                let c_flag = false;
                                let s_flag = false;
                                c_flag = array_json_index[0][0].indexOf("c") != -1
                                s_flag = array_json_index[0][0].indexOf("s") != -1
                                //将唯一键设置为key;
                                for(let i=1;i<array_json_index.length;i++)
                                {
                                    array_json[array_json_index[i][0]] = {};
                                    //console.log('array_json_index[0].length',array_json_index[0].length);
                                    for(let j=1;j<array_json_index[0].length;j++)
                                    {
                                      array_json[array_json_index[i][0]][array_json_index[0][j]] = array_json_index[i][j];
                                    }
                                }
                                //console.log('array_json:',array_json);
                                if(c_flag)
                                {
                                    c_data[file_name] = {};
                                    c_data[file_name] = array_json;
                                }
                                if(s_flag)
                                {
                                    s_data[file_name] = {};
                                    s_data[file_name] = array_json;
                                }
                            }
                            else
                            {
                                continue;
                            }
                        }
                        let c_str = JSON.stringify(c_data);
                        let s_str = JSON.stringify(s_data);
                       
                        fs.writeFile(path.join(this.json_dir+'/client_')+json_name,c_str,function(err){
                            if (err) {
                                console.log('write is error...',err);
                            }
                        })

                        fs.writeFile(path.join(this.json_dir+'/server_')+json_name,s_str,function(err){
                            if (err) {
                                console.log('write is error...',err);
                            }
                        })
                        
                    });
                }
            },
            
        })
  },

  // register your ipc messages here
  messages: {
    'excel_to_json:hello' (event) {
      console.log('asd');     
        app.msg = 'cmd nb';
    }
  }
});