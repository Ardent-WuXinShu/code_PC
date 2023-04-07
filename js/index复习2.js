// 等页面结构加载完成后 再执行代码
document.addEventListener('DOMContentLoaded', function () {
  //1. 面包屑函数
  initCrumbsNav();
  //2. 左侧选项卡切换
  leftTabClick();
  //3. 底部选项卡的切换
  bottomTabClick();
  //4. 右侧面板单击折叠
  rightPanelClick();
  //5. 实现右侧悬浮菜单功能
  rightMenu();
  //6. 初始化渲染小图
  initSmallPic();
  //7. 点击缩略图切换图片
  thumbImgClick();
  //8. 缩略图左右箭头单击
  arrowThumbClick();

  // 9.放大镜函数
  zoomGlass();

  // 10.渲染商品基本信息
  initGoodBaseInfo()

  // 11渲染商品规格信息
  initGoodSizeInfo()

  // 12.规格信息单击
  goodsSizeClick()
});
//1. 封装面包屑函数
function initCrumbsNav() {
  // 获取来自后台的数据
  let paths = goodData.path;
  let conPoinEle = document.querySelector('.wrap .con .conPoin');

  // 循环创建a标签
  paths.forEach(function (path) {
    // 创建a标签
    var aNode = document.createElement('a');
    // 修改a标签的内容
    aNode.innerText = path.title;
    // 修改href属性  最后一项不添加href
    if (path.url) {
      aNode.href = path.url;
    }
    conPoinEle.appendChild(aNode);
  });
}
// 2.实现左侧的选项卡切换
function leftTabClick() {
  // 获取元素
  var h4Ele = document.querySelectorAll(
    '.wrap .productDetail .aside .tabWrap h4'
  );
  var divEle = document.querySelectorAll(
    '.wrap .productDetail .aside .tabContent > div'
  );
  // 循环h4绑定点击事件
  h4Ele.forEach(function (h4Node, index) {
    h4Node.addEventListener('click', function () {
      // 通过排他思想先移除所有元素类名  再给当前添加指定类名active
      h4Ele.forEach(function (item) {
        item.classList.remove('active');
      });
      this.classList.add('active');
      //通过排他思想先移除所有tab对应元素的类名  再通过下标找到指定tab选项卡内容添加active类名
      divEle.forEach(function (divNode) {
        divNode.classList.remove('active');
      });
      divEle[index].classList.add('active');
    });
  });
}

// 3.实现底部的选项卡切换
function bottomTabClick() {
  // 获取元素
  var lisEle = document.querySelectorAll(
    '.wrap .productDetail .detail .intro .tabWrap li'
  );
  var divEle = document.querySelectorAll(
    '.wrap .productDetail .detail .intro .tabContent > div'
  );
  // 循环绑定li集合点击事件
  lisEle.forEach(function (lisNode, index) {
    lisNode.addEventListener('click', function () {
      //通过排他思想先移除所有元素类名  再给当前添加指定类名active
      lisEle.forEach(function (item) {
        item.classList.remove('active');
      });
      this.classList.add('active');
      // 通过排他思想先移除所有tab对应元素的类名  再通过下标找到指定tab选项卡内容添加到active类名
      divEle.forEach(function (item) {
        item.classList.remove('active');
      });
      divEle[index].classList.add('active');
    });
  });
}
// 4.实现右侧面板单击折叠展开效果
function rightPanelClick() {
  // 获取元素
  var butEle = document.querySelector('.wrap .toolBar .but');
  var toolBar = document.querySelector('.wrap .toolBar');
  //   记录默认状态是折叠状态
  let isClose = true;
  // 给butEle绑定单击事件
  butEle.addEventListener('click', function () {
    if (isClose) {
      // 折叠改成展开状态
      butEle.classList.replace('list', 'cross');
      toolBar.classList.replace('toolWrap', 'toolOut');
    } else {
      // 展开改成折叠状态
      butEle.classList.replace('cross', 'list');
      toolBar.classList.replace('toolOut', 'toolWrap');
    }
    // 状态取反
    isClose = !isClose;
  });
}

// 5.实现右侧悬浮菜单功能
function rightMenu() {
  // 获取所有的li标签
  let lisEle = document.querySelectorAll('.wrap .toolBar .toolList li');
  lisEle.forEach(function (liNode) {
    liNode.addEventListener('mouseenter', function () {
      let iNode = this.querySelector('i');
      let emNode = this.querySelector('em');
      iNode.style.backgroundColor = 'rgb(200,17,34)';
      emNode.style.left = '-62px';
    });
    liNode.addEventListener('mouseleave', function () {
      // 找到当前li子元素i和em标签
      var iNode = this.querySelector('i');
      var emNode = this.querySelector('em');
      iNode.style.backgroundColor = 'rgb(122,110,110)';
      emNode.style.left = '35px';
    });
  });
}

// 6.初始化渲染小图
function initSmallPic() {
  // 获取元素
  let divEle = document.querySelector(
    '.wrap .con .mainCon .previewWrap .preview .zoom'
  );

  let listEle = document.querySelector(
    '.wrap .con .mainCon .previewWrap .specScroll .itemCon .list'
  );

  // 获取后台数据
  let Image = goodData.imgsrc[0].s;
  // 创建img元素
  let imgNode = document.createElement('img');
  imgNode.src = Image;
  // 放到指定的zoom容器中
  divEle.appendChild(imgNode);

  // 缩略图
  // 获取后台数据
  let allImg = goodData.imgsrc;

  allImg.forEach(function (itme) {
    // 创建li节点
    let liNode = document.createElement('li');
    // 创建img节点
    let imgNode = document.createElement('img');
    //    console.log(itme);
    //    console.log(liNode);
    //    console.log(imgNode);
    imgNode.src = itme.s;
    liNode.appendChild(imgNode);
    listEle.appendChild(liNode);
  });
}
//7. 实现·单击缩略图切换图片
let index = 0;
function thumbImgClick() {
  // 获取元素
  let lisEle = document.querySelectorAll(
    '.wrap .con .mainCon .previewWrap .specScroll .itemCon .list > li'
  );

  let minImgBox = document.querySelector(
    '.wrap .con .mainCon .previewWrap .preview .zoom img'
  );

  // 循环li集合 都要被绑定单击事件
  lisEle.forEach(function (lis, i) {
    lis.addEventListener('click', function () {
      let imgNode = this.querySelector('img');
      minImgBox.src = imgNode.src;
      index = i;
    });
  });
}
// 8. 实现缩略图左右箭头单击
function arrowThumbClick() {
  // 获取元素
  leftBtn = document.querySelector(
    '.wrap .con .mainCon .previewWrap .specScroll .prev'
  );

  rightBtn = document.querySelector(
    '.wrap .con .mainCon .previewWrap .specScroll .next'
  );

  ulEle = document.querySelector(
    '.wrap .con .mainCon .previewWrap .specScroll .itemCon .list'
  );

  lisEle = document.querySelectorAll(
    '.wrap .con .mainCon .previewWrap .specScroll .itemCon .list > li'
  );

  // a 让ul的left偏移量进行移动
  let ulMoveLeft = 0; //记录ul的left偏移量
  // b 每次li的移动步长
  let stepMove =
    lisEle[0].offsetWidth +
    parseInt(window.getComputedStyle(lisEle[0], null).marginRight);
  //  c 最大的left偏移量  =(总的li长度-默认显示)*步长
  let ulMaxMoveLeft = (lisEle.length - 5) * stepMove;

  // 左箭头绑定单击事件
  leftBtn.addEventListener('click', function () {
    // 判断是否是处于第一张
    if (ulMoveLeft === 0) {
      return; //不走了  停留在第一张
    }
    ulMoveLeft -= stepMove;
    ulEle.style.left = -ulMoveLeft + 'px';
  });
  // 右箭头绑定单击事件
  rightBtn.addEventListener('click', function () {
    // 判断是否处于最后一张
    if (ulMoveLeft === ulMaxMoveLeft) {
      return; //停留在最后一张
    }
    ulMoveLeft += stepMove;
    ulEle.style.left = -ulMoveLeft + 'px';
  });
}

// 9.实现放大镜
function zoomGlass() {
  //获取元素
  // 小图容器
  let minImgBox = document.querySelector(
    '.wrap .con .mainCon .previewWrap .preview .zoom'
  );
  // 大容器
  let maxBox = document.querySelector(
    '.wrap .con .mainCon .previewWrap .preview'
  );

  // 给小图容器绑定悬浮  离开  移动
  // 小图容器悬浮
  // 创建全局遮盖  大图容器  大图片节点变量
  let mask = null;
  let bigImgBox = null;
  let bigImg = null;
  // 获取后台数据
  let dataEle = goodData.imgsrc[index];
  minImgBox.addEventListener('mouseenter', function () {
    // 创建遮盖
    mask = document.createElement('div');
    mask.className = 'mask';
    // 创建大图容器
    bigImgBox = document.createElement('div');
    bigImgBox.className = 'bigBox';
    // 创建大图
    bigImg = document.createElement('img');
    bigImg.src = dataEle.b;

    // 上树
    // 大图-->大容器
    bigImgBox.appendChild(bigImg);
    // 大容器-->总容器
    maxBox.appendChild(bigImgBox);
    // 遮盖 -->小容器
    minImgBox.appendChild(mask);
  });
  // 小图容器绑定离开
  minImgBox.addEventListener('mouseleave', function () {
    // 删除mask节点
    minImgBox.removeChild(mask);
    // 删除大图容器
    maxBox.removeChild(bigImgBox);
    // 消除无效DOM引用  释放内存空间
    mask = bigImgBox = bigImg = null;
  });
  // 小图容器绑定移动
  minImgBox.addEventListener('mousemove', function (event) {
    // 鼠标在遮盖正中心
    let maskMoveLeft =
      event.clientX -
      minImgBox.getBoundingClientRect().left -
      mask.offsetWidth / 2;

    let maskMoveTop =
      event.clientY -
      minImgBox.getBoundingClientRect().top -
      mask.offsetHeight / 2;

    // 限制左上边界
    if (maskMoveLeft < 0) {
      maskMoveLeft = 0; //贴在左边
    }
    if (maskMoveTop < 0) {
      maskMoveTop = 0; //贴在上边
    }
    // 计算遮盖最大移动距离
    let maskMaxMoveright = minImgBox.clientWidth - mask.offsetWidth;
    let maskMaxMovebotton = minImgBox.clientHeight - mask.offsetHeight;

    // 限制边界
    if (maskMoveLeft > maskMaxMoveright) {
      maskMoveLeft = maskMaxMoveright;
    }
    if (maskMoveTop > maskMaxMovebotton) {
      maskMoveTop = maskMaxMovebotton;
    }

    // 遮盖移动
    mask.style.left = maskMoveLeft + 'px';
    mask.style.top = maskMoveTop + 'px';

    // 大图也要跟着大图的移动距离/大图的最大移动距离=遮盖移动距离/遮盖最大移动距离
    // 大图的最大移动距离left=大图width-大图容器winth
    let bigImgMaxMoveLeft = bigImg.clientWidth - bigImgBox.offsetWidth;
    let bigImgMaxMoveTop = bigImg.clientHeight - bigImgBox.offsetHeight;

    // 大图的移动距离  =(遮盖移动距离*大图的最大移动距离)/(遮盖最大移动距离)
    let bigImgMoveLeft = (maskMoveLeft * bigImgMaxMoveLeft) / maskMaxMoveright;

    let bigImgMoveTop = (maskMoveTop * bigImgMaxMoveTop) / maskMaxMovebotton;

    bigImg.style.left = -bigImgMoveLeft + 'px';
    bigImg.style.top = -bigImgMoveTop + 'px';
  });
}

// 10 渲染商品的基本信息
let selectedNum=0  //默认勾选的input
function initGoodBaseInfo(){
  // 获取元素
  let infoEle=document.querySelector('.wrap .con .mainCon .infoWrap .info1')

  // 获取底部主产品的价格
  let leftPriceEle=document.querySelector('.wrap .productDetail .detail .fitting .goodSuits .master p')

  // 获取底部input节点
  let iptEle=document.querySelectorAll('.wrap .productDetail .detail .fitting .goodSuits .suits .suitsItem input')

  // 获取件数节点
  let spanEle=document.querySelector('.wrap .productDetail .detail .fitting .goodSuits .result > div .selected')
  
  // 获取底部总价格
  let rightPriceEle=document.querySelector('.wrap .productDetail .detail .fitting .goodSuits .result .price')
  // 获取后台数据
  let data=goodData.goodsDetail

 let divEle= `<h3 class="infoName">
 ${data.title}
</h3>
<p class="news">
 ${data.recommend}
</p>
<div class="priceArea">
  <div class="priceArea1">
    <div class="title">
      价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格
    </div>
    <div class="price">
      <i>￥</i>
      <em>${data.price}</em>
      <span>降价通知</span>
    </div>
    <div class="remark">
      <i>累计评价</i>
      <span>${data.evaluateNum}</span>
    </div>
  </div>
  <div class="priceArea2">
    <div class="title">
      促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销
    </div>
    <div class="fixWidth">
      <i>${data.promoteSales.type}</i>
      <span
        >${data.promoteSales.content}
      </span>
    </div>
  </div>
</div>
<div class="support">
  <div>
    <div class="title">
      支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持
    </div>
    <div class="fixWidth">
    ${data.support}
    </div>
  </div>
  <div>
    <div class="title">配&nbsp;送&nbsp;至</div>
    <div class="fixWidth">${data.address}</div>
  </div>
</div>`
infoEle.innerHTML=divEle

// 底部商品附选区
// 修改底部主产品价格
leftPriceEle.innerText=data.price

// 定义一个变量收集input的check数
 selectedNum=0
// 定义一个变量保存价格
let selectedTotalPrice=0
iptEle.forEach(function(input){
  if(input.checked){
    selectedNum++
    selectedTotalPrice+=parseInt(input.value)
  }
})
// 把cheedck写入到页面中
spanEle.innerText=selectedNum

// 总价写入页面 总价=selectedTotalPrice+data.price
rightPriceEle.innerText='￥'+(data.price+selectedTotalPrice)
}

// 11.渲染商品的规格信息
function initGoodSizeInfo(){
  // 获取元素
  let sizeBox=document.querySelector('.wrap .con .mainCon .infoWrap .choose .chooseArea')
  // 获取后台数据
  let dataEle=goodData.goodsDetail.crumbData
  // 循环创建dl  dt
  dataEle.forEach(function(info){
    // 创建dl
    let dlNode=document.createElement('dl')
    // 创建dt
    let dtNode=document.createElement('dt')
    // 修改dt的内容
    dtNode.innerText=info.title
    // 将dt挂在dl上
    dlNode.appendChild(dtNode)
    // 循环获取dd的数据
    info.data.forEach(function(obj){
      // 创建dd
      let ddNode=document.createElement('dd')
      // 修改dd的数据
      ddNode.innerText=obj.type
      // 给dd设置一个自定义属性price  记录当前规格的价格
      ddNode.setAttribute('price',obj.changePrice)
      // 将dd挂在dl上
      dlNode.appendChild(ddNode)
    })
    // 将dl挂上sizeBox上
    sizeBox.appendChild(dlNode)
  })
}

// 12规格信息单击
// 创建条件数组  0 代表没有选中对象
let conditionArr=[0,0,0,0]
function goodsSizeClick(){
  // 找到所有dl节点
let dlEle=document.querySelectorAll('.wrap .con .mainCon .infoWrap .choose .chooseArea dl')
// 循环dl集合  找到当前dl下面dd集合
dlEle.forEach(function(dlNode,dlIndex){
  // 再找到dl下面的dd集合
  let dds=dlNode.querySelectorAll('dd')
  // dd集合循环绑定事件
  dds.forEach(function(ddNode){
    ddNode.addEventListener('click',function(){
      // 排他思想
      dds.forEach(function(item){
        item.style.color = 'rgb(102, 102, 102)'

      })
      // 给当前文件颜色改为red
      this.style.color='red'
      // 将值存入到对应dl下标的条件数组
      conditionArr[dlIndex]={
        // 将数组里替换为dd里面文本
        text:this.innerText,
        // 把价格也添加到数组对象中
        price:parseInt(this.getAttribute('price'))
      }
      // 根据条件数组  循环创建mark节点  并上树
      conditionArr.forEach(function(obj,dlIndex){
      
      })
    })

  })
})
}

// 13


