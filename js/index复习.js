// 先加载页面结构
document.addEventListener('DOMContentLoaded', function () {
  //1. 面包屑导航函数
  breadcrumbNav();

  // 2.左侧选项卡切换函数
  leftTabClick();

  //   3底部选修卡绑定单击事件
  bottomTabClick();

  // 4.给页面右侧面板绑定单击事件
  rightPanelClick();
  //   5.给右侧菜单绑定鼠标悬浮和离开事件
  rightMenu();

  // 6.初始化渲染小图
  initSmallPic();

  // 7.实现单击缩略图切换图片
  thumbImgClick();

  // 8.实现缩略图左右箭头单击
  arrowThumbClick();
  // 9.实现放大镜
  zoomGlass();
  // 10渲染商品的基本信息
  initGoodBaseInfo();
  // 11.渲染商品规格信息
  initGoodSizeInfo();
  // 12渲染商品规格信息
  goodsSizeClick();
  // 13删除条件节点
  choosedClick();
  // 14底部附选商品input单击事件
  footerInputClick();
});

//1. 封装面包屑函数
function breadcrumbNav() {
  // 获取节点
  let conPoinEle = document.querySelector('.wrap .con .conPoin');

  // 获取后台数据
  let paths = goodData.path;

  // 循环后台数据  添加到父容器中
  paths.forEach(function (path, index) {
    // 创建元素
    let aNode = document.createElement('a');
    // 修改内容
    aNode.innerText = path.title;
    //判断 添加相应地址  最后一个没有url 返回undefined
    if (path.url) {
      aNode.href = path.url;
    }
    // 把创建的子元素添加到父容器中给
    conPoinEle.appendChild(aNode);
  });
}

// 2.实现左侧的选项卡切换
// 封装一个左侧选项卡切换的函数
function leftTabClick() {
  // 获取h4标签  以及对应的div标签
  let h4Els = document.querySelectorAll(
    '.wrap .productDetail .aside .tabWrap h4'
  );

  let divEle = document.querySelectorAll(
    '.wrap .productDetail .aside .tabContent > div'
  );

  // 循环绑定单击事件
  h4Els.forEach(function (h4Node, index) {
    h4Node.addEventListener('click', function () {
      h4Els.forEach(function (item) {
        item.classList.remove('active');
      });
      this.classList.add('active');

      // 通过下标index找到对应的div容器  通过排他操作类名
      divEle.forEach(function (divNode) {
        divNode.classList.remove('active');
      });
      divEle[index].classList.add('active');
    });
  });
}

// 3.实现底部选修卡绑定单击事件
function bottomTabClick() {
  // 获取对应的li  循环绑定单击事件
  var lisEle = document.querySelectorAll(
    '.wrap .productDetail .detail .intro .tabWrap li'
  );
  var contents = document.querySelectorAll(
    '.wrap .productDetail .detail .intro .tabContent > div'
  );
  lisEle.forEach(function (liNode, index) {
    liNode.addEventListener('click', function () {
      lisEle.forEach(function (item) {
        item.className = '';
      });
      this.className = 'active';
      contents.forEach(function (item) {
        item.className = '';
      });
      contents[index].className = 'active';
    });
  });
}

// 4.给页面右侧面板绑定单击事件
function rightPanelClick() {
  // 获取节点  绑定单击事件
  var butEle = document.querySelector('.wrap .toolBar .but');

  var toolBar = document.querySelector('.wrap .toolBar');

  var isClose = true; //记录默认状态是折叠状态
  butEle.addEventListener('click', function () {
    // 根据不同状态切换设置不同的类名
    if (isClose) {
      // 折叠改成展开状态
      butEle.classList.replace('list', 'cross');
      toolBar.classList.replace('toolWrap', 'toolOut');
    } else {
      // 展开改成折叠状态
      butEle.classList.replace('cross', 'list');
      toolBar.classList.replace('toolOut', 'toolWrap');
    }
    isClose = !isClose;
  });
}

// 5.给右侧菜单绑定鼠标悬浮和离开
function rightMenu() {
  // 获取元素
  var lisEle = document.querySelectorAll('.wrap .toolBar .toolList li');
  //  循环绑定悬浮和离开

  lisEle.forEach(function (liNode) {
    liNode.addEventListener('mouseenter', function () {
      // 找到当前li子元素i和em标签
      let iNode = this.querySelector('i');
      let emNode = this.querySelector('em');
      iNode.style.backgroundColor = 'rgb(200,17,34)';
      emNode.style.left = '-62px';
    });
    liNode.addEventListener('mouseleave', function () {
      // 找到当前li子元素i和item标签
      let iNode = this.querySelector('i');
      let emNode = this.querySelector('em');
      iNode.style.backgroundColor = 'rgb(122,110,110)';
      emNode.style.left = '35px';
    });
  });
}

// 6.初始化渲染小图
function initSmallPic() {
  // 获取标签
  let smallImgBox = document.querySelector(
    '.wrap .con .mainCon .previewWrap .preview .zoom'
  );

  let lisEle = document.querySelector(
    '.wrap .con .mainCon .previewWrap .specScroll .itemCon .list'
  );

  //获取后台数据
  let firstSmallSrc = goodData.imgsrc[0].s;

  // 创建图片节点
  let imgNode = document.createElement('img');
  imgNode.src = firstSmallSrc;

  smallImgBox.appendChild(imgNode);

  // 获取后台数据
  let allImg = goodData.imgsrc;
  allImg.forEach(function (item) {
    // 创建li标签
    let list = document.createElement('li');
    let imgNode = document.createElement('img');
    imgNode.src = item.s;
    list.appendChild(imgNode);
    lisEle.appendChild(list);
  });
}

// 7.实现单击缩略图切换图片
var index = 0;
function thumbImgClick() {
  // 获取元素
  var lisEle = document.querySelectorAll(
    '.wrap .con .mainCon .previewWrap .specScroll .itemCon .list > li'
  );

  // 获取小图元素
  var zoomImg = document.querySelector(
    '.wrap .con .mainCon .previewWrap .preview .zoom img'
  );

  lisEle.forEach(function (liNode, i) {
    liNode.addEventListener('click', function () {
      // 获取li元素里面的img节点
      let imgNode = this.querySelector('img');
      zoomImg.src = imgNode.src;
      index = i;
    });
  });
}

//8.实现缩略图左右箭头单击事件
function arrowThumbClick() {
  // 获取元素
  // 左箭头
  let leftClick = document.querySelector(
    '.wrap .con .mainCon .previewWrap .specScroll .prev'
  );
  // 右箭头
  let rightClick = document.querySelector(
    '.wrap .con .mainCon .previewWrap .specScroll .next'
  );
  let ulEle = document.querySelector(
    '.wrap .con .mainCon .previewWrap .specScroll .itemCon .list'
  );
  let lisEle = document.querySelectorAll(
    '.wrap .con .mainCon .previewWrap .specScroll .itemCon .list > li'
  );
  // 全局变量
  // a 让ul的left偏移量进行移动
  // 记录ul的left的偏移量
  let ulMoveLeft = 0;

  // 计算每次移动的步长
  let stepMove =
    lisEle[0].offsetWidth +
    parseInt(window.getComputedStyle(lisEle[0], null).marginRight);

  // 最大的left偏移距离=(总的li长度-默认显示)*每次li移动的步长
  let ulMaxMoveLeft = (lisEle.length - 5) * stepMove; //750

  // 左箭头单击事件
  leftClick.addEventListener('click', function () {
    // 判断是否是处于第一张 ulMoveLeft一定为0
    if (ulMoveLeft === 0) {
      return;
    }
    ulMoveLeft -= stepMove;
    ulEle.style.left = -ulMoveLeft + 'px';
  });
  // 右箭头单击事件
  rightClick.addEventListener('click', function () {
    if (ulMoveLeft === ulMaxMoveLeft) {
      return;
    }
    ulMoveLeft += stepMove;
    ulEle.style.left = -ulMoveLeft + 'px';
  });
}

// 9.实现放大镜

function zoomGlass() {
  // 获取元素
  // 小容器
  var zoomBox = document.querySelector(
    '.wrap .con .mainCon .previewWrap .preview .zoom'
  );

  // 大容器
  var preview = document.querySelector(
    '.wrap .con .mainCon .previewWrap .preview'
  );

  // mask节点  记录大图容器  记录大图片
  let mask = null;
  let bigImgBox = null;
  let bigImg = null;
  // 给小图容器绑定mouseenter
  zoomBox.addEventListener('mouseenter', function () {
    // a 创建遮盖  大图  大图容器
    // 创建遮盖
    mask = document.createElement('div');
    mask.className = 'mask';
    // 创建大图容器
    bigImgBox = document.createElement('div');
    bigImgBox.className = 'bigBox';

    // 创建大图片
    bigImg = document.createElement('img');
    // 获取对应下标的图片
    bigImg.src = goodData.imgsrc[index].b;

    // 大图片作为大图容器子节点
    bigImgBox.appendChild(bigImg);

    // 上树
    zoomBox.appendChild(mask);
    preview.appendChild(bigImgBox);
  });
  // 给小图容器绑定mouseleave
  zoomBox.addEventListener('mouseleave', function () {
    // 删除mask节点
    zoomBox.removeChild(mask);
    // 删除大图容器
    preview.removeChild(bigImgBox);
    // 消除无效dom引用  释放内存空间
    mask = bigImgBox = bigImg = null;
  });
  // 给小图绑定mousemove
  zoomBox.addEventListener('mousemove', function (event) {
    // a  鼠标在遮盖正中心
    let maskMoveLeft =
      event.clientX -
      zoomBox.getBoundingClientRect().left -
      mask.offsetWidth / 2;

    let maskMoveTop =
      event.clientY -
      zoomBox.getBoundingClientRect().top -
      mask.offsetHeight / 2;

    // 限制边界
    if (maskMoveLeft < 0) {
      maskMoveLeft = 0; //贴在左边
    }
    if (maskMoveTop < 0) {
      maskMoveTop = 0; //贴在上边
    }
    // 计算遮盖最大的移动距离 实现贴在右边和下边
    let maskMaxMoveLeft = zoomBox.clientWidth - mask.offsetWidth;

    let maskMaxMoveTop = zoomBox.clientHeight - mask.offsetHeight;

    if (maskMoveLeft > maskMaxMoveLeft) {
      maskMoveLeft = maskMaxMoveLeft;
    }
    if (maskMoveTop > maskMaxMoveTop) {
      maskMoveTop = maskMaxMoveTop;
    }

    mask.style.left = maskMoveLeft + 'px';
    mask.style.top = maskMoveTop + 'px';

    // 大图也要跟着移动  遮盖移动距离/遮盖最大移动距离=大图的移动距离/大图的最大移动距离

    // 大图的最大移动距离left=大图width-大图容器 width
    let bigImgMaxMoveLeft = bigImg.clientWidth - bigImgBox.offsetWidth;

    let bigImgMaxMoveTop = bigImg.clientHeight - bigImgBox.offsetHeight;

    // 大图的移动距离
    let bigImgMoveLeft = (maskMoveLeft * bigImgMaxMoveLeft) / maskMaxMoveLeft;

    let bigImgMoveTop = (maskMoveTop * bigImgMaxMoveTop) / maskMaxMoveTop;

    bigImg.style.left = -bigImgMoveLeft + 'px';
    bigImg.style.top = -bigImgMoveTop + 'px';
  });
}

// 定义一个变量记录input勾选的状态
let selectedNum = 0; //默认勾选的数量
//10. 渲染商品的基本信息
function initGoodBaseInfo() {
  // 获取元素
  let infoEle = document.querySelector('.wrap .con .mainCon .infoWrap .info1');

  // 底部主产品标签
  let mainEle = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .master p'
  );
  // 底部input标签  先取得li
  let iptEle = document.querySelectorAll(
    '.wrap .productDetail .detail .fitting .goodSuits .suits input'
  );

  // 获取配件件数标签
  let spanEle = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .result > div .selected'
  );
  // 获取总的价格标签
  let priceEle = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .result .price'
  );

  // 获取后台数据
  let datas = goodData.goodsDetail;
  let goodsInfo = ` <h3 class="infoName">
${datas.title}
</h3>
<p class="news">
${datas.recommend}
</p>
<div class="priceArea">
<div class="priceArea1">
  <div class="title">
    价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格
  </div>
  <div class="price">
    <i>￥</i>
    <em>${datas.price}</em>
    <span>降价通知</span>
  </div>
  <div class="remark">
    <i>累计评价</i>
    <span>${datas.evaluateNum}</span>
  </div>
</div>
<div class="priceArea2">
  <div class="title">
    促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销
  </div>
  <div class="fixWidth">
    <i>${datas.promoteSales.type}</i>
    <span
      >${datas.promoteSales.content}
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
    ${datas.support}
  </div>
</div>
<div>
  <div class="title">配&nbsp;送&nbsp;至</div>
  <div class="fixWidth">${datas.address}</div>
</div>
</div> `;
  // 把模板字符串内容解析到页面中
  infoEle.innerHTML = goodsInfo;
  // 把上面的价格渲染到底部产品
  mainEle.innerText = '¥' + datas.price;

  //d定义一个变量  记录已勾选产品的价格
  let selectedPrice = 0;
  iptEle.forEach(function (input) {
    if (input.checked) {
      selectedNum++;
      selectedPrice += parseInt(input.value);
    }
  });
  // 把计算出的渲染到页面
  spanEle.innerText = selectedNum;
  // 底部右侧总价=原价+选中的总价
  priceEle.innerText = '¥' + (datas.price + selectedPrice);
}
// 11.渲染商品的规格信息
function initGoodSizeInfo() {
  let chooseArea = document.querySelector(
    '.wrap .con .mainCon .infoWrap .choose .chooseArea'
  );

  //  a获取数据源
  let crumbData = goodData.goodsDetail.crumbData;
  // b.根据数据源  循环创建dl结构
  crumbData.forEach(function (info) {
    // 创建dl节点
    let dlNode = document.createElement('dl');
    // 创建dt
    let dtNode = document.createElement('dt');
    dtNode.innerText = info.title;
    dlNode.appendChild(dtNode);
    // 循环创建dd
    info.data.forEach(function (obj) {
      let ddNode = document.createElement('dd');
      ddNode.innerText = obj.type;
      // 给dd设置一个自定义属性price  记录当前规格的价格  setAttrbute用于设置自定义属性
      ddNode.setAttribute('price', obj.changePrice);
      dlNode.appendChild(ddNode);
    });
    // 循环将dlNode上树
    chooseArea.appendChild(dlNode);
  });
}

//12 商品规格信息单击
// 创建一个条件数组  存放所有的规格条件  0 代表没有选中条件
let conditionArr = [0, 0, 0, 0];
function goodsSizeClick() {
  // 1.找到所有的dl集合
  let dlEle = document.querySelectorAll(
    '.wrap .con .mainCon .infoWrap .choose .chooseArea dl'
  );

  let choosed = document.querySelector(
    '.wrap .con .mainCon .infoWrap .choose .chooseArea .choosed'
  );
  // 循环dl集合  找到dl下面所有的dd
  dlEle.forEach(function (dl, dlIndex) {
    // 再找到dl下面所有dd集合
    let dds = dl.querySelectorAll('dd');
    // dd集合绑定事件
    dds.forEach(function (dd) {
      dd.addEventListener('click', function () {
        dds.forEach(function (item) {
          item.style.color = 'rgb(102, 102, 102)';
        });
        // 4. 给当前文件颜色改为红色
        this.style.color = 'red';

        // 将值存入到对应dl下标的条件数组中
        conditionArr[dlIndex] = {
          // 取到dd里的内容
          text: this.innerText,
          price: parseInt(this.getAttribute('price')),
        };
        // 重新计算价格
        calcTotalPrice();
        // 清除条件容器  防止累加条件  每次循环前 都先清空容器
        choosed.innerText = '';
        // 根据条件数组 循环创建mark节点  并上树
        conditionArr.forEach(function (obj, dlIndex) {
          // obj如果为0 则直接结束当前循环 不执行
          if (!obj) {
            return;
          }
          // 创建mask面包屑
          let mask = document.createElement('mask');
          // 修改mask里面的文本
          mask.innerText = obj.text;
          let a = document.createElement('a');
          // 将dl的下标存储在a标签上 便于删除时取出来  便于找到对应下标的dl
          a.setAttribute('dlIndex', dlIndex);
          a.innerText = 'X';
          // 把a标签上树到mask
          mask.appendChild(a);
          // 把mask上树到指定容器
          choosed.appendChild(mask);
        });
      });
    });
  });
}

// 13.删除条件节点
// 1.实现方法  讲条件节点的单击事件委托给父容器
function choosedClick() {
  let choosedEle = document.querySelector(
    '.wrap .con .mainCon .infoWrap .choose .chooseArea .choosed'
  );

  // 利用事件委托 单击父容器
  choosedEle.addEventListener('click', function (event) {
    // event.target.lacaName可以获取到事件对象元素的具体字符
    if (event.target.localName !== 'a') {
      return;
    }
    // // event.target 可以获取到事件对象
    let aNode = event.target;
    // 将当前mask节点移除 获取到子节点的父元素  可以通过  子节点.parentElement
    choosedEle.removeChild(aNode.parentElement);
    // 通过小标找到对应的dl节点  再找到所有的dd节点
    // 先找dl下标  (12函数) 有给dl创建自定义属性  dlIndex
    let dlIndex = aNode.getAttribute('dlIndex');

    // 获取点击时的dlIndex
    let dl = document.querySelectorAll(
      '.wrap .con .mainCon .infoWrap .choose .chooseArea dl'
    )[dlIndex];

    let dds = dl.querySelectorAll('dd');
    dds.forEach(function (dd) {
      // 排他思想
      dd.style.color = 'rgb(102,102,102)';
    });
    dds[0].style.color = 'red';
    // 对应下标条件数组值重置为0
    conditionArr[dlIndex] = 0;
    //重新计算价格
    calcTotalPrice();
  });
}
// 商品原价和条件数组里面的参数做价格汇总
function calcTotalPrice() {
  // 商品价格节点
  let priceEle = document.querySelector(
    '.wrap .con .mainCon .infoWrap .info1 .priceArea .priceArea1 .price em'
  );

  let leftPriceEle = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .master p'
  );
  let inputs = document.querySelectorAll(
    '.wrap .productDetail .detail .fitting .goodSuits .suits input'
  );
  let rightPriceEle = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .result .price'
  );
  // 商品原价
  let originPrice = goodData.goodsDetail.price;
  // 计算条件数组中的总价
  let sizeTotalPrice = 0;
  conditionArr.forEach(function (obj) {
    // obj可能为0 直接退出函数
    if (!obj) {
      return;
    }
    sizeTotalPrice += obj.price;
    // console.log(sizeTotalPrice);
  });
  // 汇总之后的总价
  let totalPrice = originPrice + sizeTotalPrice;
  // 把汇总后的总价写入页面
  priceEle.innerText = totalPrice;
  // 将汇总后的价格赋值给附选产品的左侧元素
  leftPriceEle.innerText = '￥' + totalPrice;
  // 已选中商品的总价
  let selectedTotalPrice = 0;
  inputs.forEach(function (input) {
    if (input.checked) {
      selectedTotalPrice += parseInt(input.value);
    }
  });
  //  右侧套餐价=汇总之后的总价  +已选中商品的总价
  rightPriceEle.innerText = '￥' + (totalPrice + selectedTotalPrice);
}
// 14.底部附选商品input单击事件
function footerInputClick() {
  // 1.找到底部所有的input元素
  let inputEle = document.querySelectorAll(
    '.wrap .productDetail .detail .fitting .goodSuits .suits input'
  );
  // 选购件数
  let selectedEle = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .result .selected'
  );

  let rightPriceEle = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .result .price'
  );
  // 给input循环绑定单击事件
  inputEle.forEach(function(input){
    input.addEventListener('click',function(){
      // 从下标1截取到末尾  再转成number数值
      let rightTotalPrice=parseInt(rightPriceEle.innerText.substring(1))

      // 获取当前input勾选的状态
      // a  计算出总的勾选数量的商品  并展示到页面中
      // b  动态计算出左侧的套餐价
      if(this.checked){
        // 勾选 拿到原已勾选的数量累加
        selectedNum++
        rightTotalPrice+=parseInt(this.value)
      }else{
        // 未勾选  拿原已勾选的数量减减
        selectedNum--
        rightTotalPrice-=parseInt(this.value)

      }
      selectedEle.innerText=selectedNum
      rightPriceEle.innerText='￥' +rightTotalPrice

    })
  })
}
