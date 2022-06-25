auto.waitFor();//判断和等待开启无障碍
// let see_count = rawInput('请输入滑动次数','10000');//手动输入滑动次数默认是1000次。
let see_count = 10000
let appName = "快手极速版"
var storageSign = "KuaiShou666";
var woolStorage = storages.create(storageSign);//创建本地存储
app.launchApp(appName);//只有一个快手极速版所以直接Launch就可以，不用包名
console.show(); //开启日志（悬浮窗权限）
console.info(appName);
sleep(12000);//等待splash时间手机不好长点
probability = 10;//概率自动点赞、评论、关注的概率
timesInterval = 8;//间隔时间
CurveBrushScreen = false;//是否曲线滑动true取消滑动false直线滑动
adolescentWindows();//关闭青少年窗口
autoFloatMain(appName);//通过悬浮得红包窗口进入赚金币主页面

/**
 * 进行主页面的下滑
 */
for (var i = 1; i < see_count; i++) {
    toastLog(appName + "滑动" + i + "次" + "总计:" + see_count + "次");
    let x1 = device.width / 2;
    let y1 = device.height - (device.height * 0.2)
    let x2 = device.width / 2;
    let y2 = device.height * 0.1
    let pressTime = 300;
    kuaiShouAutoComment(parseInt(probability));
    randomFollow('slide_play_right_follow_button', probability);//随机关注百分之一的概率
    randomHeart('like_button', probability);//随机关注百分之一的概率
    randomUpSildeScreen(x1, y2, x1, y1, pressTime, probability);
    randomDownSildeScreen(x1, y1, x2, y2, pressTime, timesInterval, probability);
    slideScreenDown(x1, y1, x2, y2, pressTime, timesInterval, CurveBrushScreen);
    //每过200轮次，进入红包页面
    if(i%200==0){
        console.warn("每过200轮次，进入红包页面")
        autoFloatMain(appName);//通过悬浮得红包窗口进入赚金币主页面
    }
}
kuaiShouClearAppCache();//自动清理内存
//关闭当前程序
home();//回到首页
var CommentKeyWord = [
    '果然猫最烦的还是狗',
    '猪也是这么想的',
    '满朝文武竟支支吾吾',
    '唠的尽是高血压嗑',
    '就像譬如朝露，譬如晚霞，譬如三月的风和六月的雨，譬如九月的天和十二月的雪。世界美好都想赠予你',
    '我想把天空大海给你，把大江大河给你。没办法，好的东西就是想分享于你。',
    '悲观是远见，乐观是智慧。',
    '你在玫瑰上所花的时间让玫瑰显得重要',
    '但他甚至没有花时间去遗憾，也没有炫耀说我捕到了那么大、那么好的鱼，更没有抱怨一路上那些鲨鱼的破坏，他只是平静地说：“我得买一个更大的钩子，更结实一些，我们再次出海。',
    '当你背单词的时候，阿拉斯加的鳕鱼正越出水面；当你算数学的时候，南太平洋的海鸥正掠过海岸；你晚自习的时候，地球的极圈正五彩斑斓；但少年，梦要你亲自实现。',
    '好多年后，人们再问起我，那一路是否感觉到孤单与漫长。我说恰恰相反，我记住的是漫天星光与一路歌唱。'
];


/**
 * 青少年窗口
 */
function adolescentWindows() {
    if (text("我知道了").exists()) {
        text("我知道了").findOnce().click();
    }
    if (text("知道了").exists()) {
        text("知道了").findOnce().click();
    }
}
/**
 * 通过悬浮的红包图标进入到赚金币得主页面
 * @param {*} appName 
 * @returns 
 */
function autoFloatMain(appName) {
    let signValue = getSignTime(appName);
    if (getDate() == signValue) {
        toastWarn("已签到本次签到跳过...");
        return;
    } else {
        let c = 0;
        while(true){
            if (className("android.widget.FrameLayout").id("redFloat").exists()) {
                console.log("点击红包悬浮窗，redFloat");
                let b = id("redFloat").findOne().bounds();
                click(b.centerX(), b.centerY());
                sleep(5000);
                break;
            }
            swipe(random(device.width * 0.2, device.width * 0.3), device.height - 200, random(device.width * 0.2, device.width * 0.3), 500, 700);
            if(c++>10){
                //进行了10次还未找到元素，判定是否进入得错误的面板
                back()
            }
        }
        /**
         * step1.看视频任务
         */
         AutoWatchAd()
         sleep(2000);
        /**
         * step2.签到领金币
         */
         AutoSign()
         sleep(2000);
        /**
         * step3.开启看视频奖励翻倍特权
         */
         AutoDoubleGold()
         sleep(2000);
        /**
         * step.开宝箱得金币
         */
         AutoOpenGoldBox()
         sleep(2000);
    }
}

/**
 * step.开宝箱得金币
 */
function AutoOpenGoldBox(){
    let reg = /.*开宝箱得金币.*/
    let c = findTextDescMatchesTimeout(reg, 1000)
    if (c) {
        console.log("开宝箱得金币");
        c.parent().click()
        sleep(2000);
        //看广告再得300金币
        let t = findTextDescMatchesTimeout(/.*看视频最高得.*/, 1000)
        if(t){
            console.log(t.text());
            t.click()
            //进入看视频窗口
            sleep(25000);
            while(true){
                let t = className("android.widget.TextView").text("已成功领取奖励")
                if (t.exists()) {
                    console.log("已成功领取奖励，退出");
                    back();
                    break;
                }else{
                    console.log("未成功领取奖励，继续等待2s");
                }
                sleep(2000);
            }
            back();
        }
        back();
    } else {
        console.warn("开宝箱得金币，无法找到入口")
    }
}


/**
 * step3.开启看视频奖励翻倍特权
 */
function AutoDoubleGold(){
    let reg = /.*开启看视频奖励翻倍特权.*/
    let c = findTextDescMatchesTimeout(reg, 1000)
    if (c) {
        console.log("开启看视频奖励翻倍特权");
        c.parent().parent().child(1).click()
        sleep(2000);
        back();
    } else {
        console.warn("开启看视频奖励翻倍特权，无法找到入口")
    }
}

/**
 * step.签到领金币
 */
function AutoSign(){
    let reg = /.*签到领金币.*/
    let c = findTextDescMatchesTimeout(reg, 1000)
    if (c) {
        console.log("签到领金币");
        c.parent().parent().child(3).click()
        sleep(2000);
        //看广告再得300金币
        let t = findTextDescMatchesTimeout(/.*看广告再得300金币.*/, 1000)
        if(t){
            console.log("未成功领取奖励，继续等待2s");
            t.click()
            //进入看视频窗口
            sleep(25000);
            while(true){
                let t = className("android.widget.TextView").text("已成功领取奖励")
                if (t.exists()) {
                    console.log("已成功领取奖励，退出");
                    back();
                    break;
                }else{
                    console.log("未成功领取奖励，继续等待2s");
                }
                sleep(2000);
            }
        }
        //退出签到面板
        let q = findTextDescMatchesTimeout(/.*邀请好友赚更多.*/, 1000)
        if(q){
            console.log("点击退出按钮，退出签到面板");
            q.parent().parent().parent().child(0).click()
        }else{
            console.log("未找到退出按钮");
        }
    }
}

/**
 * step.看视频任务
 */
function AutoWatchAd(){
    while(true){
        //判定今日任务是否全部完成
        if(findTextDescMatchesTimeout(/.*明日看广告最高领取.*/, 1000)){
            console.log('看视频任务，今日已全部完成')
            break;
        }
        //进行今日看广告任务
        let reg = /.*观看广告单日最高可得.*/
        let c = findTextDescMatchesTimeout(reg, 1000)
        if (c) {
            console.log('c.text():'+c.text())
            // if(c.text.textMatches(/.*10\/10*.*/).exists()){
            //     console.log('看视频任务，今日已全部完成')
            //     break;
            // }
            c.parent().child(1).click()
            //进入看视频窗口
            sleep(25000);
            while(true){
                let t = className("android.widget.TextView").text("已成功领取奖励")
                if (t.exists()) {
                    console.log("已成功领取奖励，退出");
                    back();
                    break;
                }else{
                    console.log("未成功领取奖励，继续等待2s");
                }
                sleep(2000);
            }
        } else {
            console.log("无法找到任务列表入口");
        }
    }
}

/**
 * 自定义一个findTextDescMatchesTimeout
 * @param {*} reg 
 * @param {*} timeout 
 * @returns 
 */
function findTextDescMatchesTimeout(reg, timeout) {
    let c = 0
    while (c < timeout / 50) {
        let result = textMatches(reg).findOnce() || descMatches(reg).findOnce()
        if (result) return result
        sleep(50)
        c++
    }
    return null
}
/**
 * 自动评论
 */
function kuaiShouAutoComment(probability) {
    let randomIndex = random(1, parseInt(probability));
    if (randomIndex == 1) {
        let comment = CommentKeyWord[Math.floor(Math.random() * CommentKeyWord.length)];
        let buttons = className("android.widget.LinearLayout").id("comment_button").find();
        if (buttons.length > 0) {
            let clickResult = buttons[0].click();
            if (clickResult) {
                sleep(3000);
                if (id("comment_editor_holder_text").exists()) {
                    id("comment_editor_holder_text").findOnce().click();
                    sleep(1000);
                    setText(0, comment);
                    sleep(1000);
                    if (text("发送").exists()) {
                        toastLog("开启自动评论");
                        if (text("发送").findOnce().click()) {
                            toastLog("自动评论成功");
                            back();
                        }
                    }
                }
            }
        }
    }
}
/**
 * 清理缓存
 */
function kuaiShouClearAppCache() {
    if (className("android.widget.ImageView").id("left_btn").exists()) {
        className("android.widget.ImageView").id("left_btn").findOnce().click();
        sleep(3000);
        if (className("android.widget.TextView").text("设置").exists()) {
            toastLog("点击设置");
            let b = className("android.widget.TextView").text("设置").findOne().bounds();
            click(b.centerX(), b.centerY());
            sleep(3000);
            if (className("android.widget.TextView").text("清除缓存").exists()) {
                let b = className("android.widget.TextView").text("清除缓存").findOnce().bounds();
                let result = click(b.centerX(), b.centerY());
                if (result) {
                    toastLog("清理成功");
                }
            }
        }
    }
}
function douYinRandomHeart(probability) {
    index = random(1, parseInt(probability));
    if (index == 1) {
        let frameLayouts = className("android.widget.FrameLayout").depth(7).selected(false).clickable(true).find();
        toastLog("FrameLayout" + frameLayouts.length);
        if (frameLayouts.length == 9) {
            frameLayouts[frameLayouts.length - 6].click();
        }
    }
}
function douYinRandomFollow(probability) {
    try {
        index = random(1, parseInt(probability));
        if (index == 1) {
            let followMes = className("android.widget.Button").desc("关注").find();
            if (followMes.length > 0) {
                followMes[followMes.length - 1].click();
            }
        }
    } catch (error) {
        console.error(error);
    }
}
function autoCashOut() {
    if (className("android.view.View").text("元").exists()) {
        toastLog("现金收益");
        let b = className("android.view.View").text("元").findOne().parent().bounds();
        let clickResult = click(b.centerX(), b.centerY());
        sleep(3000);
        if (clickResult) {
            if (className("android.view.View").text("去提现").exists()) {
                let b = className("android.view.View").text("去提现").findOne().bounds();
                let clickResult = click(b.centerX(), b.centerY());
                sleep(3000);
                if (clickResult) {
                    if (className("android.view.View").text("提现30.00元").exists()) {
                        toastLog("提现30");
                        let b = className("android.view.View").text("提现30.00元").findOnce().parent().bounds();
                        let clickResult = click(b.centerX(), b.centerY());
                        if (clickResult) {
                            if (text("立即提现").exists()) {
                                toastLog("立即提现");
                                let clickResult = text("立即提现").findOnce().click();
                                toastLog(clickResult);
                            }
                        }
                    }
                }
            }
        }
    }
}
/**
 * 贝塞尔曲线
 * @param {坐标点} ScreenPoint 
 * @param {偏移量} Offset 
 */
function bezier_curves(ScreenPoint, Offset) {
    cx = 3.0 * (ScreenPoint[1].x - ScreenPoint[0].x);
    bx = 3.0 * (ScreenPoint[2].x - ScreenPoint[1].x) - cx;
    ax = ScreenPoint[3].x - ScreenPoint[0].x - cx - bx;
    cy = 3.0 * (ScreenPoint[1].y - ScreenPoint[0].y);
    by = 3.0 * (ScreenPoint[2].y - ScreenPoint[1].y) - cy;
    ay = ScreenPoint[3].y - ScreenPoint[0].y - cy - by;
    tSquared = Offset * Offset;
    tCubed = tSquared * Offset;
    result = {
        "x": 0,
        "y": 0
    };
    result.x = (ax * tCubed) + (bx * tSquared) + (cx * Offset) + ScreenPoint[0].x;
    result.y = (ay * tCubed) + (by * tSquared) + (cy * Offset) + ScreenPoint[0].y;
    return result;
}
/**
 * 滑动(默认概率是百分之三十)
 * @param {*} qx 
 * @param {*} qy 
 * @param {*} zx 
 * @param {*} zy 
 * @param {*} time 
 * @param {*} timesInterval 
 */
function slideScreenDown(qx, qy, zx, zy, time, timesInterval, CurveBrushScreen) {
    if (CurveBrushScreen) {
        curveDown(qx, qy, zx, zy, time, timesInterval); //曲线概率
    } else {
        lineDown(qx, qy, zx, zy, time, timesInterval); //直线概率
    }
}
/**
 * 概率0-9 大于3的时候采用曲线概率 小于3的时候直线概率
 */
function randomFunction() {
    return Math.floor(Math.random() * 10);
}
function curveDown(qx, qy, zx, zy, time, timesInterval) {
    toastInfo("曲线滑动");
    var xxy = [time];
    var point = [];
    var dx0 = {
        "x": qx,
        "y": qy
    };
    var dx1 = {
        "x": random(qx - 100, qx + 100),
        "y": random(qy, qy + 50)
    };
    var dx2 = {
        "x": random(zx - 100, zx + 100),
        "y": random(zy, zy + 50),
    };
    var dx3 = {
        "x": zx,
        "y": zy
    };
    for (var i = 0; i < 4; i++) {
        eval("point.push(dx" + i + ")");
    };
    for (let i = 0; i < 1; i += 0.08) {
        let newPoint = bezier_curves(point, i);
        xxyy = [parseInt(newPoint.x), parseInt(newPoint.y)]
        xxy.push(xxyy);
    }
    gesture.apply(null, xxy);
 
    let randomMin = timesInterval * 1000;
    let randomMax = (parseInt(timesInterval) + 2) * 1000;
    let delayTime = random(randomMin, randomMax);
    sleep(delayTime);
}
/**
 * 屏幕向下滑动并延迟8至12秒
 */
function lineDown(startX, startY, endX, endY, pressTime, timesInterval) {
    toastInfo("屏幕向下滑动");
    swipe(startX, startY, endX, endY, pressTime);
    let randomMin = timesInterval * 1000;
    let randomMax = (parseInt(timesInterval) + 2) * 1000;
    let delayTime = random(randomMin, randomMax);
    sleep(delayTime);
}
/**
 * 按照指定概率随机上滑
 * @param {*} startX 
 * @param {*} startY 
 * @param {*} endX 
 * @param {*} endY 
 * @param {*} pressTime 
 * @param {*} probability 
 */
function randomUpSildeScreen(startX, startY, endX, endY, pressTime, probability) {
    let randomIndex = random(1, parseInt(probability));
    if (randomIndex == 1) {
        swipe(startX, startY, endX, endY, pressTime);
        delayTime = random(12000, 15000);
        sleep(delayTime);
    }
}
/**
 * 连续下滑对上一个无兴趣
 * 其实得和上滑做个排他，既然无兴趣不要在上滑
 */
function randomDownSildeScreen(startX, startY, endX, endY, pressTime, timesInterval, probability) {
    let randomIndex = random(1, parseInt(probability));
    if (randomIndex == 1) {
        swipe(startX, startY, endX, endY, pressTime);
        sleep(2000);
        swipe(startX, startY, endX, endY, pressTime);
        sleep(timesInterval);
    }
}
/**
 * 输出Tosat和Info日志
 * @param {日志消息} messagge 
 */
function toastInfo(message) {
    toast(message)
    console.info(message)
}
/**
 * 输出Tosat和Error日志
 * @param {日志消息} messagge 
 */
function toastError(message) {
    toast(message)
    console.error(message)
}
function toastLog(message) {
    toast(message)
    console.log(message)
}
function toastWarn(message) {
    toast(message)
    console.warn(message)
}
/**
 * 随机点赞
 * @param {点赞ID}} view_id 
 */
function randomHeart(view_id, probability) {
    index = random(1, parseInt(probability));
    if (index == 1) {
        var target = id(view_id).findOnce();
        if (target == null) {
            return;
        } else {
            target.click();
            sleep(1000);
        }
    }
}
/**
 * 随机关注
 * @param {控件ID} follow_view_id 
 * @param {概率} probability 
 */
function randomFollow(follow_view_id, probability) {
    index = random(1, parseInt(probability));
    if (index == 1) {
        var target = id(follow_view_id).findOnce();
        if (target == null) {
            return;
        } else {
            target.click();
            sleep(1000);
        }
    }
}
/**
 * 记录App签到时间
 * @param {App名称} appName 
 */
function getSignTime(appName) {
    let key = appName + storageSign;
    let value = woolStorage.get(key);
    toastInfo("获取已记录的签到时间：["+key+"]"+value)
    return value;
}
/**
 * 获取当前时间格式yyyyMMdd
 */
function getDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    };
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    };
    return year + "-" + month + "-" + day;
}
/**
 * 记录App签到时间
 * @param {App名称} appName 
 */
function recordSignTime(appName) {
    let key = appName + storageSign;
    let value = getDate();
    woolStorage.put(key, value);
}
/**
 * 记录App一次运行的时间
 * @param {appName} appName 
 * @param {本次运行时间} recordTimes 
 */
function appRunTimeRecord(appName, recordTimes) {
    let key = appName + storageSign + getDate();
    var havedRunTimes = woolStorage.get("" + key + "");
    let value = "";
    if (havedRunTimes == null) {
        woolStorage.put(key, parseInt(recordTimes));
    } else {
        value = parseInt(havedRunTimes) + parseInt(recordTimes);
        woolStorage.put(key, value);
    }
}
 