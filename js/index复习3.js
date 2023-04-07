// 先加载完成页面结构
document.addEventListener('DOMContentLoaded', function () {
  //1. 面包屑导航
  crumbsNav();
  // 2.左侧选项卡切换
  leftTabCut();
  // 3.底部选项卡切换
  buttonTabCut();
  // 4.右侧面板单机折叠展开效果
  rightClickSwitch();
  // 5.右侧悬浮菜单功能
  rightSuspend();
  // 6.渲染商品图片和缩略图
  thumbnailImg();
  // 7.单击缩略图切换图片
  thumbImgClick();
  // 8.缩略图左右箭头单击
  arrowThumbClick();
  // 9.放大镜函数
  zoomGlass();
  // 10.渲染商品的基本信息
  initGoodBaseInfo();
});

// 1.实现面包屑导航
function crumbsNav() {
  // 获取元素节点
  let crumbsEle = document.querySelector('.wrap .con .conPoin');
  // 获取后台数据
  let data = goodData.path;
  // console.log(dataEle);

  data.forEach(function (paths) {
    // 根据后台数据 创建a标签
    let aNode = document.createElement('a');
    // 修改a标签内容
    aNode.innerText = paths.title;
    // 给a标签添加href属性
    if (paths.url) {
      aNode.href = paths.url;
    }
    crumbsEle.appendChild(aNode);
  });
}

//2. 实现左侧的选项卡切换
function leftTabCut() {
  // 获取元素
  let h4Ele = document.querySelectorAll(
    '.wrap .productDetail .aside .tabWrap h4'
  );

  let divEle = document.querySelectorAll(
    '.wrap .productDetail .aside .tabContent > div'
  );

  // 循环h4集合绑定事件
  h4Ele.forEach(function (h4Node, index) {
    h4Node.addEventListener('click', function () {
      h4Ele.forEach(function (item) {
        item.classList.remove('active');
      });
      this.classList.add('active');
      divEle.forEach(function (divNode) {
        divNode.classList.remove('active');
      });
      divEle[index].classList.add('active');
    });
  });
}
// 3.实现底部的选项卡切换
function buttonTabCut() {
  // 获取元素
  let liEle = document.querySelectorAll(
    '.wrap .productDetail .detail .intro .tabWrap li'
  );

  let divEle = document.querySelectorAll(
    '.wrap .productDetail .detail .intro .tabContent > div'
  );

  //循环li集合绑定事件
  liEle.forEach(function (liNode, index) {
    // 绑定单击事件
    liNode.addEventListener('click', function () {
      // 排他思想  先全部移除
      liEle.forEach(function (item) {
        item.classList.remove('active');
      });
      // 在对应添加
      this.classList.add('active');
      // 先全部移除
      divEle.forEach(function (divNode) {
        divNode.classList.remove('active');
      });
      // 在对应添加
      divEle[index].classList.add('active');
    });
  });
}

// 4.实现右侧面板单机折叠展开效果
function rightClickSwitch() {
  // 获取元素
  // 按钮
  let btnEle = document.querySelector('.wrap .toolBar .but');
  // 内容区
  let toolBar = document.querySelector('.wrap .toolBar');

  // 定义一个标识符 用来控制toolBar的开关
  let isShow = true;
  btnEle.addEventListener('click', function () {
    if (isShow) {
      toolBar.classList.replace('toolWrap', 'toolOut');
      btnEle.classList.replace('list', 'cross');
    } else {
      toolBar.classList.replace('toolOut', 'toolWrap');
      btnEle.classList.replace('cross', 'list');
    }
    isShow = !isShow;
  });
}

// 5.实现右侧悬浮菜单功能
function rightSuspend() {
  // 获取元素
  let lisEle = document.querySelectorAll('.wrap .toolBar .toolList li');
  // 循环li集合  绑定鼠标离开和悬浮
  lisEle.forEach(function (liNode) {
    // 给每个li绑定鼠标悬浮事件
    liNode.addEventListener('mouseenter', function () {
      let iNode = this.querySelector('i');
      let emNode = this.querySelector('em');
      iNode.style.backgroundColor = 'rgb(200,17,34)';
      emNode.style.left = '-62px';
    });
    // 给每个li绑定鼠标离开事件
    liNode.addEventListener('mouseleave', function () {
      let iNode = this.querySelector('i');
      let emNode = this.querySelector('em');
      iNode.style.backgroundColor = 'rgb(122,110,110)';
      emNode.style.left = '35px';
    });
  });
}

// 6.实现渲染商品的图片和缩略图
function thumbnailImg() {
  // 获取元素
  let zoomEle = document.querySelector(
    '.wrap .con .mainCon .previewWrap .preview .zoom'
  );

  let listEle = document.querySelector(
    '.wrap .con .mainCon .previewWrap .specScroll .itemCon .list'
  );

  let data = goodData.imgsrc;

  // 渲染商品图片到小容器
  // 在小容器中创建img
  let imgNode = document.createElement('img');
  imgNode.src = data[0].s;
  // 上树
  zoomEle.appendChild(imgNode);

  // 渲染缩略图
  // 创建li标签
  data.forEach(function (dataNode) {
    // 创建li节点
    let liNode = document.createElement('li');
    // 创建img节点
    let imgs = document.createElement('img');
    // 修改img的src
    imgs.src = dataNode.s;
    // 把img作为li的子节点
    liNode.appendChild(imgs);
    //    将li节点放到listEle容器中
    listEle.appendChild(liNode);
  });
}

//7. 实现单击缩略图切换图片
let index = 0; //默认是第一张  后面有用
function thumbImgClick() {
  // 获取元素
  let liEle = document.querySelectorAll(
    '.wrap .con .mainCon .previewWrap .specScroll .itemCon .list > li'
  );

  let zoomImg = document.querySelector(
    '.wrap .con .mainCon .previewWrap .preview .zoom img'
  );

  // 循环li集合  绑定单击事件
  liEle.forEach(function (liNode, item) {
    liNode.addEventListener('click', function () {
      //    获取到li里面的img
      let imgNode = this.querySelector('img');
      // 将缩略图的src赋值给小容器图片
      zoomImg.src = imgNode.src;

      index = item;
    });
  });
}

// 8.实现缩略图左右箭头单击
function arrowThumbClick() {
  // 获取元素
  let leftBtn = document.querySelector(
    '.wrap .con .mainCon .previewWrap .specScroll .prev'
  );

  let rightBtn = document.querySelector(
    '.wrap .con .mainCon .previewWrap .specScroll .next'
  );

  let ulEle = document.querySelector(
    '.wrap .con .mainCon .previewWrap .specScroll .itemCon .list'
  );

  let liEle = document.querySelectorAll(
    '.wrap .con .mainCon .previewWrap .specScroll .itemCon .list > li'
  );

  // a ul的left偏移量
  let index = 0;
  // 每次移动的步长
  let stepMove =
    liEle[0].offsetWidth +
    parseInt(window.getComputedStyle(liEle[0], null).marginRight);
  // console.log(stepMove);
  // 最大的left偏移距离
  let maxLeft = (liEle.length - 5) * stepMove;
  // console.log(maxLeft);

  // 给左箭头绑定单击事件
  leftBtn.addEventListener('click', function () {
    if (index === 0) {
      return;
    }
    index -= stepMove;
    // 把ul的left偏移量进行移动
    ulEle.style.left = -index + 'px';
  });
  //给右箭头绑定单击事件
  rightBtn.addEventListener('click', function () {
    if (index === maxLeft) {
      return;
    }
    index += stepMove;
    ulEle.style.left = -index + 'px';
  });
}

// 9.实现放大镜
function zoomGlass() {
  // 获取元素
  let minImgBox = document.querySelector(
    '.wrap .con .mainCon .previewWrap .preview .zoom'
  );

  // 总容器
  let divEle = document.querySelector(
    '.wrap .con .mainCon .previewWrap .preview'
  );

  // 小图容器绑定mouseenter
  // 三个时间都需要使用到遮盖  大图  大图容器  提为父元素的变量
  // 遮盖
  let mask = null;
  // 大图容器
  let bigImgBox = null;
  // 大图
  let bigImg = null;
  // 获取后台数据
  let data = goodData.imgsrc[index];
  minImgBox.addEventListener('mouseenter', function () {
    //创建遮盖 大图  大图容器
    // 创建遮盖
    mask = document.createElement('div');
    mask.className = 'mask';
    // 创建大图容器
    bigImgBox = document.createElement('div');
    bigImgBox.className = 'bigBox';
    // 创建大图
    bigImg = document.createElement('img');
    // 获取对应下标的大图
    bigImg.src = data.b;
    // 上树
    // 把遮盖上树到小容器
    minImgBox.appendChild(mask);
    // 把大图上树大图容器
    bigImgBox.appendChild(bigImg);
    // 把大图容器上树到总容器
    divEle.appendChild(bigImgBox);
  });
  // 小图容器绑定mouseleave
  minImgBox.addEventListener('mouseleave', function () {
    // 删除mask节点
    minImgBox.removeChild(mask);
    // 删除大容器节点
    divEle.removeChild(bigImgBox);
    // 消除无效dom引用  释放内存空间
    mask = bigImgBox = bigImg = null;
  });

  // 小图容器绑定mousemove
  minImgBox.addEventListener('mousemove', function (event) {
    // 鼠标在遮盖的正中心
    let maskMoveLeft =
      event.clientX -
      minImgBox.getBoundingClientRect().left -
      mask.offsetWidth / 2;
    let maskMoveTop =
      event.clientY -
      minImgBox.getBoundingClientRect().top -
      mask.offsetHeight / 2;
    //限制左上边界
    if (maskMoveLeft < 0) {
      maskMoveLeft = 0; //贴在左边
    }
    if (maskMoveTop < 0) {
      maskMoveTop = 0; //贴在右边
    }
    // 计算遮盖的最大移动距离
    let maskMaxMoveRight = minImgBox.clientWidth - mask.offsetWidth;

    let maskMaxMoveButton = minImgBox.clientHeight - mask.offsetWidth;
    // 限制在右下边界
    if (maskMoveLeft > maskMaxMoveRight) {
      maskMoveLeft = maskMaxMoveRight;
    }
    if (maskMoveTop > maskMaxMoveButton) {
      maskMoveTop = maskMaxMoveButton;
    }
    // 鼠标在遮盖的中心
    mask.style.left = maskMoveLeft + 'px';
    mask.style.top = maskMoveTop + 'px';

    // 大图的最大移动距离left=大图width-大图容器width
    let bigImgMaxMoveLeft = bigImg.clientWidth - bigImgBox.offsetWidth;
    let bigImgMaxMoveTop = bigImg.clientHeight - bigImgBox.offsetHeight;
    // 大图的移动距离=(遮盖移动距离*大图的最大移动距离)/遮盖最大移动距离
    let bigImgMoveLeft = (maskMoveLeft * bigImgMaxMoveLeft) / maskMaxMoveRight;

    let bigImgMoveTop = (maskMoveTop * bigImgMaxMoveTop) / maskMaxMoveButton;

    bigImg.style.left = -bigImgMoveLeft + 'px';
    bigImg.style.top = -bigImgMoveTop + 'px';
  });
}

// 10.渲染商品的基本信息
function initGoodBaseInfo() {
// 获取元素
let info=document.querySelector('.wrap .con .mainCon .infoWrap .info1')
// 底部主产品节点
let mainLeft=document.querySelector('.wrap .productDetail .detail .fitting .goodSuits .master p')

// 底部附加产品input
let iptEle=document.querySelectorAll('.wrap .productDetail .detail .fitting .goodSuits .suits .suitsItem input')
// 底部附加产品的件数
let numberEle=document.querySelector('.wrap .productDetail .detail .fitting .goodSuits .result .selected')
// 底部总价格
let totalPrice=document.querySelector('.wrap .productDetail .detail .fitting .goodSuits .result .price')

// 获取后台数据  写入模板字符串
let data=goodData.goodsDetail

    let goodsInfo=
    `
    <h3 class="infoName">
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
  </div>
  `
  info.innerHTML=goodsInfo

//   底部商品复选区
// 修改底部主产品
mainLeft.innerText='￥' + data.price

// 定义一个变量 记录input被选中的个数
let selectedNum=0
// 定义一个变量  相加被选中input的总价
let selectedTotalPrice=0
iptEle.forEach(function(input){
    if(input.checked){
        selectedNum++
        selectedTotalPrice+=parseInt(input.value)
    }
})
// 把件数设置到页面中
numberEle.innerText=selectedNum

// 右侧价格  =原价 +选中的价格
totalPrice.innerText='￥'+(data.price+selectedTotalPrice)
}
// 11.渲染商品的规格信息
