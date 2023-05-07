# 1.call，apply，bind区别
1.call和apply会立即执行。bind不会执行，会返回一个新的函数，需要调用执行

2.所有的第一个参数都是需要指向的this

3.call和bind第二个参数都是需要传入的，apply是一个数组



由于这几个比较容易混淆，写了个比较简单记住的

```js
ps:方法相当于工具，相当于是把自己的工具借给谁，比如斧头，借给别人用

1.call
原对象.方法.call(借给谁,参数1,参数2)

2.apply
原对象.方法.apply(借给谁,[参数1,参数2])

上面都是立即执行，相当于我把东西借给你你用完要还给我

3.bind,//会返回一个方法，这个新方法被永久改变了this
原对象.方法.bind(借给谁,参数1,参数2)
```



# 2.手写实现

## 手写call

```js
Function.prototype.call2 = function (ctx, ...args) {
            //这里this指向原对象的方法
            //函数对象在调用自己的方法时，this指向该函数本身
            ctx.fn = this;
            //执行方法
            ctx.fn(...args);
            //删除掉fn,避免其他影响
            delete ctx.fn
        }
```

## 手写apply

```js
 Function.prototype.apply2 = function (ctx, args = []) {
            ctx = Object(ctx) || window;
            //限制一下第二个参数是数组
            if (args && !Array.isArray(args)) {
                throw '第二个参数必须是数组'
            }
            //其他和call一样
            ctx.fn = this;
            ctx.fn(...args);
            delete ctx.fn
        }
```



## 手写bind

```js
Function.prototype.bind2 = function (ctx, ...args) {
            //bind需要返回一个新的函数
            //实现也是和call一样
            return (...args2) => {
                ctx.fn = this;
                //这里因为需要合并，调用bind开始的参数和调用执行的方法参数合并
                ctx.fn(...args.concat(...args2))
                delete ctx.fn
            }
        }
        const newfn = 原对象.方法.bind2(借给的对象, 1)
        newfn(4)
```

