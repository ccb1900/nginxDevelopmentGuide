# 基础知识
- 25个关键字
- 注释方法
```
// 这是注释
/* 这是注释 */
```
- go程序的一般结构
    - go程序通过package来组织包。
    - 只有package名称为main的包可以包含main函数
    - 一个可执行程序有且仅有一个main包
    
    - 通过import关键字导入其他非main包
    - 通过const关键字来进行常量的定义
    - 通过在函数外部使用var关键字来进行全局变量的声明与赋值
    - 通过type关键字来进行结构struct或接口interface的声明
    - 通过func关键字来进行函数的声明
    
````
package main

import "fmt"

const PI  = 3.14

var name="gopher"

type newType int

type gopher struct {}
type golang interface {}
func main() {
	fmt.Println("hello go")
}

````

未使用的import将会报编译错误。
包别名语法
```
import  base "fmt"
```
可以省略包名调用
```
import  . "fmt"
```

可见性规则

- go语言中使用大小写来决定常量，变量，类型，接口，函数，结构是否可以被外部包所调用
- 根据约定，函数名小写就是private
- 根据约定，函数名大写就是public