### serve
- 编辑/打包
```javascript
  ng build --prod --aot
```
  >angular-cli会自动启用TreeShaking（摇树）特性，简而言之，就是把用不到的包全部剔除掉，就像从树上把枯叶子摇下来一样，加上--aot参数是让angular-cli启动预编译特性。	

-服务端启用GZIP
```javascript
	<Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" 
			   compression="on"
			   compressionMinSize="2048"
			   noCompressionUserAgents="gozilla, traviata"
			   compressableMimeType="text/html,text/xml,text/plain,text/css,
					text/javascript,text/json,application/x-javascript,
					application/javascript,application/json"/>
```
* 参考链接：https://my.oschina.net/mumu/blog/830742

### 目录解析
- app
app目录主功能模块分别是
 1. home 主要是主页模块的相关内容文件
 2. homepage 主要是个人主页模块的相关内容文件
 3. local 主要是同城模块的相关内容文件
 4. login 主要是登录注册模块的相关内容文件
 5. mine 主要是我的模块相关内容文件
 6. team 主要是球队模块的相关内容文件
 7. videos 主要是视频模块的相关内容文件
 
各个功能模块的子模块在功能模块目录下建立子文件夹并配置router

### home模块
```javascript
  |-- home
    |   |-- home-routing.module.ts
    |   |-- home.component.html
    |   |-- home.component.scss
    |   |-- home.component.spec.ts
    |   |-- home.component.ts
    |   |-- home.module.ts
    |   |-- home.service.spec.ts
    |   |-- home.service.ts
```
* home-routing.module.ts主要是提供home模块的route,各个子模块页面的路由都写在这里 
* home.module.ts 主要是为各个子模块component提供declarations,与service ,路由注入的地方
* home.service.ts 主要为各个子模块提供数据交互服务,建议大部分的数据交互在此完成

### domain模块
```javascript
 |-- domain
   |   |-- interface.model.ts
```
* interface.model.ts主要都是interface里面的interface与swagger ui一同分为12个controller，里面已经分出了12个controller每个人如果自己有用到而里面没有的自行添加
另外由于后端过滤了空的字符串建议每个interface都打上“？”免得报错如下：
```javascript
  export interface UserShowTokenVO {
    refreshToken?: string ,
    token?: string ,
    userId?: string
  }
````


### shared模块
```javascript
|-- shared
  |-- components
  |-- directives
  |   |-- shared.directive.spec.ts
  |   |-- shared.directive.ts       
  |   |-- pipes
  |       |-- shared.pipe.spec.ts
  |       |-- shared.pipe.ts            
  |-- shared.module.ts
  |   |-- status-code
  |   |   |-- status-code.service.spec.ts
  |   |   |-- status-code.service.ts
  |   |-- styles
  |   |   |-- theming.scss
  |   |   |-- tools
  |   |       |-- tools.service.spec.ts
  |   |       |-- tools.service.ts
```
* components主要是提供程序全部的公共component,在shared.module.ts声明,selector全部以seed开头如“<seed-header>,<seed-footer>”
* directives 主要是提供程序全部的公共directive,在shared.module.ts声明,命名建议以实际功能命名
* pipes 主要是提供程序全部的公共pipe,在shared.module.ts声明,命名建议以实际功能命名
* tools 主要是提供程序全部的公共类方法,命名建议以实际功能命名
* styles theming.scss主要是提供程序全部的公共方法scss,如果模块下的scss需要用scss的公共方法和参数都要在.scss里面@iport 如style.css
```html
  /* You can add global styles to this file, and also import other style files */
  @import "app/shared/styles/theming.scss"; //SASS混合器，函数
  
  
```

### 2个辅助类模块分别是
  1. core 主要是本程序的核心内容相关文件（只在app module注入一次）
  2. shared 是各个功能模块的公共类需要注入的模块（各个模块都要注入）,公共类的函数service,component,directive都在shared文件夹内书写
  
   > 对于共享(shared)特性模块有如下建议
     
      * 坚持在shared目录中创建名叫SharedModule的特性模块（例如在app/shared/shared.module.ts中定义SharedModule）。
      * 坚持把可能被应用其它特性模块使用的公共组件、指令和管道放在SharedModule中，这些资产倾向于共享自己的新实例（而不是单例）。
      * 坚持在SharedModule中导入所有模块都需要的资产（例如CommonModule和FormsModule）。
      * 坚持在SharedModule中声明所有组件、指令和管道。
      * 坚持从SharedModule中导出其它特性模块所需的全部符号。
      * **避免**在SharedModule中指定应用级的单例服务提供商。但如果是故意设计的单例也可以，不过还是要小心。
     
   > 同样的对于核心(core)特性模块，建议是

     * 坚持把那些“只用一次”的类收集到CoreModule中，并对外隐藏它们的实现细节。简化的AppModule会导入CoreModule，并且把它作为整个应用的总指挥。
     * 坚持在core目录下创建一个名叫CoreModule的特性模块（例如在app/core/core.module.ts中定义CoreModule）。
     * 坚持把一个要共享给整个应用的单例服务放进CoreModule中（例如ExceptionService和LoggerService）。
     * 坚持导入CoreModule中的资产所需要的全部模块（例如CommonModule和FormsModule）。
     * 坚持把应用级、只用一次的组件收集到CoreModule中。 只在应用启动时从AppModule中导入它一次，以后再也不要导入它（例如NavComponent和SpinnerComponent等）。
     * 坚持从CoreModule中导出AppModule需导入的所有符号，使它们在所有特性模块中可用。
     * 坚持防范多次导入CoreModule，并通过添加守卫逻辑来尽快失败。
     * **避免**在AppModule之外的任何地方导入CoreModule
     
### appModule 
  不建议注入很多服务,服务过多对于程序启动构建快慢有着明显的影响,如果没有大功能模块注入维持不变就好

  
### 生命周期在ts的最下面书写如
``` javascript
    @Component({
      selector: 'app-home',
      templateUrl: './home.component.html',
      styleUrls: ['./home.component.scss'],
    })
    export class HomeComponent implements OnInit {
    
      constructor() { }
      
      getInfo(){
        console.log('get info...')
      }
      
      ngOnInit() {
        this.getInfo()
      }
      
      ngAfterContentInit() {
        do something....
      }
      
      ngOnDestroy() {
        do something....
      }
      
    }
   ```
###命令行工具angular-cli，链接http://www.jianshu.com/p/cba3fa12f0a3