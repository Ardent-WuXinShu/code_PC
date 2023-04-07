// 等待页面结构加载完毕在调用
document.addEventListener('DOMContentLoaded', function () {
  //1. 面包屑函数
  initCrumbsNav();

  //2. 左侧选项卡切换函数
  leftTabClick();

  //3. 底部选项卡切换函数
  bottomTabClick();

  //4. 页面右侧面板单击事件
  rightPanelClick();

  //5. 给右侧菜单绑定鼠标悬浮和离开事件
  rightMenu();

  //6. 初始化渲染小图
  initSmallPic();

  //7. 单击缩略图切换图片
  thumbImgClick();

  //8. 缩略图左右箭头单击
  arrowClick();
  //9. 放大镜效果
  zoomGlass();
  // 10.渲染商品的基本信息
  initGoodBaseInfo();

  // 11.渲染商品的规格信息
  initGoodSizeInfo();

  //12. 商品规格信息单击
  goodsSizeClick();

  // 13.删除条件节点
  choosedClick();
  // 14.底部附选商品input单击事件
  footerInputClick();
});
// 1.完成面包屑导航功能
// 封装面包屑函数
function initCrumbsNav() {
  // 1.获取data.js--path路径数据
  var paths = goodData.path;
  // 根据数据动态创建a标签  再追加到指定父节点容器下
  paths.forEach(function (path, index) {
    // 创建节点
    let aNode = document.createElement('a');
    // 给节点添加内容
    aNode.innerText = path.title;
    // 只给不是最后一项添加href属性
    if (path.url) {
      aNode.href = path.url;
    }
    // 把创建的属性添加到对应父容器下
    var conPoinEle = document.querySelector('.wrap .con .conPoin');
    conPoinEle.appendChild(aNode);
  });
}

// 2.实现左侧的选项卡切换
// 封装一个左侧选项卡切换的函数
function leftTabClick() {
  // 1.获取h4标签  以及对应div标签
  var h4Els = document.querySelectorAll(
    '.wrap .productDetail .aside .tabWrap h4'
  );

  var divEle = document.querySelectorAll(
    '.wrap .productDetail .aside .tabContent > div'
  );
  // 2.循环h4集合绑定事件
  h4Els.forEach(function (h4Node, index) {
    h4Node.addEventListener('click', function () {
      // 3.通过排他思想先移除所有元素类名  再给当前元素添加类名
      h4Els.forEach(function (item) {
        item.classList.remove('active');
      });
      this.classList.add('active');
      // 4.通过下标index找到对应的div容器  通过排他法操作类名
      divEle.forEach(function (divNodes) {
        divNodes.classList.remove('active');
      });
      divEle[index].classList.add('active');
    });
  });
}

// 3.实现底部的选项卡切换
// 封装一个底部的选项卡切换函数
function bottomTabClick() {
  // 1.获取到对应的li和div标签
  let lisEle = document.querySelectorAll(
    '.wrap .productDetail .detail .intro .tabWrap li'
  );

  let divEle = document.querySelectorAll(
    '.wrap .productDetail .detail .intro .tabContent > div'
  );
  // 循环li绑定单击事件
  lisEle.forEach(function (list, index) {
    list.addEventListener('click', function () {
      // 通过排他思想先移除所有元素类名 再给当前元素添加类名
      lisEle.forEach(function (item) {
        item.className = '';
      });
      this.className = 'active';

      // 通过下标index找到当前对应的div容器  通过排他操作类名
      divEle.forEach(function (divNode) {
        divNode.className = '';
      });
      divEle[index].className = 'active';
    });
  });
}

// 4.给页面右侧面板绑定单击事件
function rightPanelClick() {
  // 获取节点  绑定单击事件
  let btnEle = document.querySelector('.wrap .toolBar .but');

  let toolBar = document.querySelector('.wrap .toolBar');

  let isClose = true; //记录默认状态是折叠状态

  btnEle.addEventListener('click', function () {
    // 根据不同状态切换设置不同的类名
    // 当前元素切换类名  list和cross
    // 其他盒子容器也要切换类名  toolWrap和toolOut
    if (isClose) {
      // 折叠改成展开状态
      btnEle.classList.replace('list', 'cross');
      toolBar.classList.replace('toolWrap', 'toolOut');
    } else {
      // 展开改为折叠状态
      btnEle.classList.replace('cross', 'list');
      toolBar.classList.replace('toolOut', 'toolWrap');
    }
    // 状态取反
    isClose = !isClose;
  });
}

//5. 给右侧菜单绑定鼠标悬浮和离开
function rightMenu() {
  // 获取元素
  let lisEle = document.querySelectorAll('.wrap .toolBar .toolList li');

  //循环绑定鼠标悬浮和离开事件
  lisEle.forEach(function (liNode) {
    // 鼠标悬浮
    liNode.addEventListener('mouseenter', function () {
      let iNode = this.querySelector('i');
      let emNode = this.querySelector('em');
      iNode.style.backgroundColor = 'rgb(200,17,34)';
      emNode.style.left = '-62px';
    });
    // 鼠标离开
    liNode.addEventListener('mouseleave', function () {
      let iNode = this.querySelector('i');
      let emNode = this.querySelector('em');
      iNode.style.backgroundColor = 'rgb(122,110,110)';
      emNode.style.left = '35px';
    });
  });
}

//6. 初始化渲染小图
function initSmallPic() {
  // 获取标签
  var smallImgBox = document.querySelector(
    '.wrap .con .mainCon .previewWrap .preview .zoom'
  );

  var list = document.querySelector(
    '.wrap .con .mainCon .previewWrap .specScroll .itemCon .list'
  );
  // 获取后台图片数据
  var firstSmallSrc = goodData.imgsrc[0].s;

  // 创建图片节点
  var imgNode = document.createElement('img');
  imgNode.src = firstSmallSrc;

  smallImgBox.appendChild(imgNode);

  // 创建小图缩略图  所以的小图数据在data.js
  var allImg = goodData.imgsrc;
  allImg.forEach(function (item) {
    var liNode = document.createElement('li');
    var imgNode = document.createElement('img');
    imgNode.src = item.s;
    // 把小图节点追加到li里面
    liNode.appendChild(imgNode);
    // 把li追加到缩略图的容器中
    list.appendChild(liNode);
  });
}

// 7.单击缩略图切换图片

// 默认第一张
let index = 0;
function thumbImgClick() {
  // 获取元素
  let minImgBox = document.querySelector(
    '.wrap .con .mainCon .previewWrap .preview .zoom img'
  );

  let lisEle = document.querySelectorAll(
    '.wrap .con .mainCon .previewWrap .specScroll .itemCon .list > li'
  );

  // 循环li  给集合绑定单击事件
  lisEle.forEach(function (liNode, i) {
    liNode.addEventListener('click', function () {
      let listImg = this.querySelector('img');
      minImgBox.src = listImg.src;
      index = i;
    });
  });
}

// 8.实现缩略图左右箭头单击

function arrowClick() {
  // 获取节点
  // 左箭头
  let prevLeft = document.querySelector(
    '.wrap .con .mainCon .previewWrap .specScroll .prev'
  );
  // 右箭头
  let nextRight = document.querySelector(
    '.wrap .con .mainCon .previewWrap .specScroll .next'
  );
  let ulEle = document.querySelector(
    '.wrap .con .mainCon .previewWrap .specScroll .itemCon .list'
  );

  let list = document.querySelectorAll(
    '.wrap .con .mainCon .previewWrap .specScroll .itemCon .list > li'
  );
  // 定义一个变量  用于存储偏移量
  let index = 0;
  // 每次li的移动步长=(li的offwinth+li的marginRight)  75
  let stepMove =
    list[0].offsetWidth +
    parseInt(window.getComputedStyle(list[0], null).marginRight);

  // 最大的left偏移距离  =(总的个数-展示的个数)*步长
  let maxLeft = (list.length - 5) * stepMove;

  // 给左节点绑定单击事件
  prevLeft.addEventListener('click', function () {
    if (index === 0) {
      return;
    }
    index -= stepMove;

    // 让ul的left偏移量进行移动
    ulEle.style.left = -index + 'px';
  });
  // 给右节点绑定单击事件
  nextRight.addEventListener('click', function () {
    if (index === maxLeft) {
      return;
    }
    index += stepMove;

    // 让ul的left偏移量进行移动
    ulEle.style.left = -index + 'px';
  });
}

//9. 实现放大镜效果
function zoomGlass() {
  console.log(index);
  // 获取小图元素
  let smallImgBox = document.querySelector(
    '.wrap .con .mainCon .previewWrap .preview .zoom'
  );

  // 获取总容器
  let preview = document.querySelector(
    '.wrap .con .mainCon .previewWrap .preview'
  );

  // 因为有三个事件需要使用到遮盖  大图  大图容器 所以把三个元素提为全局
  let mask = null;
  let bigImgBox = null;
  let bigImg = null;
  // 给小图容器绑定mouseenter
  smallImgBox.addEventListener('mouseenter', function () {
    console.log('hello');
    // // 创建遮盖
    mask = document.createElement('div');
    mask.className = 'mask';

    // // 创建大图容器
    bigImgBox = document.createElement('div');
    bigImgBox.className = 'bigBox';

    // // 创建大图片
    bigImg = document.createElement('img');

    // // 获取对应下标的图片
    bigImg.src = goodData.imgsrc[index].b;

    // 大图片作为大图容器子节点
    bigImgBox.appendChild(bigImg);

    // 遮盖上树
    smallImgBox.appendChild(mask);
    // 大容器上树到父容器
    preview.appendChild(bigImgBox);
  });
  //  给小图容器绑定mouseleave
  smallImgBox.addEventListener('mouseleave', function () {
    // 删除mask节点  父节点.removechild(子节点)
    smallImgBox.removeChild(mask);
    // 删除大容器
    preview.removeChild(bigImgBox);
    // 消除无效DOM引用  释放内存空间
    mask = bigImgBox = bigImg = null;
  });

  // 给小图容器绑定mousemove
  smallImgBox.addEventListener('mousemove', function (event) {
    //a 鼠标在遮盖正中心
    let maskMoveLeft =
      event.clientX -
      smallImgBox.getBoundingClientRect().left -
      mask.offsetWidth / 2;

    let maskMoveTop =
      event.clientY -
      smallImgBox.getBoundingClientRect().top -
      mask.offsetHeight / 2;
    // 限制边界
    if (maskMoveLeft < 0) {
      maskMoveLeft = 0; //贴在左边
    }
    if (maskMoveTop < 0) {
      maskMoveTop = 0; //贴在上面
    }
    // 计算遮盖最大移动距离
    let maskMaxMoveLeft = smallImgBox.clientWidth - mask.offsetWidth;

    let maskMaxMoveTop = smallImgBox.clientHeight - mask.offsetHeight;

    if (maskMoveLeft > maskMaxMoveLeft) {
      maskMoveLeft = maskMaxMoveLeft; //贴在右边
    }
    if (maskMoveTop > maskMaxMoveTop) {
      maskMoveTop = maskMaxMoveTop; //贴在下边
    }
    mask.style.left = maskMoveLeft + 'px';
    mask.style.top = maskMoveTop + 'px';

    // 大图也要移动  遮盖移动距离/遮盖最大移动距离=大图的移动距离/大图的最大移动距离
    // 大图的最大移动距离left=大图片width-大图容器width
    let bigImgMaxMoveLeft = bigImg.clientWidth - bigImgBox.offsetWidth;
    let bigImgMaxMoveTop = bigImg.clientHeight - bigImgBox.offsetHeight;

    // 大图的移动距离=(遮盖移动距离*大图的最大移动距离)/遮盖最大移动距离
    let bigImgMoveLeft = (maskMoveLeft * bigImgMaxMoveLeft) / maskMaxMoveLeft;
    let bigImgMoveTop = (maskMoveTop * bigImgMaxMoveTop) / maskMaxMoveTop;

    bigImg.style.left = -bigImgMoveLeft + 'px';
    bigImg.style.top = -bigImgMoveTop + 'px';
  });
}

//10. 渲染商品的基本信息
let selectedNum=0  //默认勾选的数量
function initGoodBaseInfo() {
  // 获取元素
  // 获取详细资料添加的父节点
  let infoEle = document.querySelector('.wrap .con .mainCon .infoWrap .info1 ');

  // 获取所有的input节点
  let inputEle = document.querySelectorAll(
    '.wrap .productDetail .detail .fitting .goodSuits .suits .suitsItem input'
  );

  // 获取选购附加产品节点
  let selectedEle = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .result > div .selected'
  );

  // 获取总价格的节点
  let rightPriceEle = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .result .price'
  );

  // 获取主产品节点
  let leftPriceEle = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .master p'
  );
  // 获取后台数据源
  let data = goodData.goodsDetail;

  let goodsInfo = `  <h3 class="infoName">
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
      <span>
      ${data.promoteSales.content}
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
</div>`;
  // 设置id=info1的内容
  infoEle.innerHTML = goodsInfo;

  // 底部商品复选区
  leftPriceEle.innerText = '￥' + data.price;


  // 记录默认已勾选的商品总价
  let selectedTotalPrice = 0;
  inputEle.forEach(function (input) {
    if (input.checked) {
      selectedNum++;
      selectedTotalPrice += parseInt(input.value);
    }
  });
  // 设置到页面中
  selectedEle.innerText = selectedNum;

  // 右侧价格=原价+选中的总价
  rightPriceEle.innerText = '￥' + (data.price + selectedTotalPrice);
}

// 11.渲染商品的规格信息
function initGoodSizeInfo() {
  // 获取元素
  let chooseArea = document.querySelector(
    '.wrap .con .mainCon .infoWrap .choose .chooseArea'
  );

  // a  获取数据
  let crumbData = goodData.goodsDetail.crumbData;
  // b 循环创建dl
  crumbData.forEach(function (info) {
    // c 创建dl节点
    let dlNode = document.createElement('dl');
    // d 创建dt
    let dtNode = document.createElement('dt');
    dtNode.innerText = info.title;
    // 把dt追加到dldom树上
    dlNode.appendChild(dtNode);
    // e  循环创建dd节点
    info.data.forEach(function (obj) {
      let ddNode = document.createElement('dd');
      ddNode.innerText = obj.type;
      // 给dd设置一个自定义属性  price  记录当前规格的价格
      ddNode.setAttribute('price', obj.changePrice);
      dlNode.appendChild(ddNode);
    });
    // 将dlNode进行上树
    chooseArea.appendChild(dlNode);
  });
}

// 条件数组，0代表没有选中条件
let conditionArr = [0, 0, 0, 0];
// 12.商品规格信息单击
function goodsSizeClick() {
  //a 找到所有dl集合
  let dls = document.querySelectorAll(
    '.wrap .con .mainCon .infoWrap .choose .chooseArea dl'
  );
  // 存储条件的容器
  let choosed = document.querySelector(
    '.wrap .con .mainCon .infoWrap .choose .chooseArea .choosed'
  );
  // b 循环dl集合,循环时,要找到当前dl下面的所有dd集合
  dls.forEach(function (dl, dlIndex) {
    let dds = dl.querySelectorAll('dd');
    dds.forEach(function (dd) {
      dd.addEventListener('click', function () {
        // 排他思想
        dds.forEach(function (item) {
          item.style.color = 'rgb(102, 102, 102)';
        });
        // 给当前文件颜色1改为red
        this.style.color = 'red';
        // 点击dd是  将值存入到对应dl下标的条件数组中  this 是dd
        conditionArr[dlIndex] = {
          text: this.innerText,
          price: parseInt(this.getAttribute('price')),
        };

        // 重新计算价格
        calcTotalPrice();
        // 清空条件容器  防止累加条件
        choosed.innerText = '';
        // 根据条件数组循环创建节点 并上树
        conditionArr.forEach(function (obj, dlIndex) {
          // 因为obj是条件数组  初始值是0  没有选择就是0 不创建
          if (!obj) {
            return;
          }
          let mask = document.createElement('mask');
          mask.className = 'mask';
          mask.innerText = obj.text;
          let a = document.createElement('a');
          // 将dl的下标存储到a标签上，便于删除的时候  取出来  找到对应下标的dl
          a.setAttribute('dlIndex', dlIndex);
          a.innerText = 'X';
          mask.appendChild(a);
          //上树到指定容器
          choosed.appendChild(mask);
        });
      });
    });
  });
}

// 13.删除条件节点
function choosedClick() {
  // 讲条件节点的单击事件委托给父容器
  let choosed = document.querySelector(
    '.wrap .con .mainCon .infoWrap .choose .chooseArea .choosed'
  );

  // 单击choosed 委托
  choosed.addEventListener('click', function (event) {
    // 获取目标元素节点的名称  不是a标签则不做业务逻辑
    if (event.target.localName !== 'a') {
      return;
    }
    // 点击了谁 就返回谁(谁执行了事件  就返回谁)
    let aNode = event.target;
    // a 要将当前mark节点移除
    choosed.removeChild(aNode.parentElement);
    // b 并要找到对应下标的dl节点  找到所有dd节点 文字颜色改为灰色
    let dlEle = document.querySelectorAll(
      '.wrap .con .mainCon .infoWrap .choose .chooseArea dl'
    )[dlIndex];
    // 获取到对应dl下标
    let dlIndex = aNode.getAttribute('dlIndex');
    let dds = dl.querySelectorAll('dd');
    dds.forEach(function (dd) {
      dd.style.color = 'rgb(102,102,102)';
    });
    dds[0].style.color = 'red';
    // c 对应下标的条件数组值重置为0
    conditionArr[dlIndex] = 0;

    // 重新计算价格
    calcTotalPrice();
  });
}
// 商品原和条件数组里面参数价格做汇总
function calcTotalPrice() {
  // 商品价格节点
  let priceEle = document.querySelector(
    '.wrap .con .mainCon .infoWrap .info1 .priceArea .priceArea1 .price em'
  );
  // 获取底部左侧价格节点
  let leftPriceEle = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .master p'
  );

  // 获取input节点
  let inputEle = document.querySelectorAll(
    '.wrap .productDetail .detail .fitting .goodSuits .suits input'
  );

  // 右侧套餐总价节点
  let rightPriceEle = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .result .price'
  );
  // 商品原价
  let originPrice = goodData.goodsDetail.price;
  console.log(originPrice);
  // 计算条件数组中的总价
  let sizeTotalPrice = 0;
  conditionArr.forEach(function (obj) {
    console.log(obj);
    if (!obj) {
      // obj可能为0  直接退出函数
      return;
    }
    sizeTotalPrice += obj.price;
  });
  // 汇总之后的价格
  let totalPrice = originPrice + sizeTotalPrice;
  priceEle.innerText = totalPrice;
  // 将汇总后的价格赋值给附选商品的左侧元素
  leftPriceEle.innerText = '￥' + totalPrice;
  // 已选中的商品总价
  let selectedTotalPrice = 0;
  inputEle.forEach(function (input) {
    if (input.checked) {
      selectedTotalPrice += parseInt(input.value);
    }
  });
  // 右侧套餐价=汇总之后的总价  + 已选中商品的总价
  rightPriceEle.innerText = '￥' + (totalPrice + selectedTotalPrice);
}

// 14底部附选商品input单击事件
function footerInputClick() {
  let inputs = document.querySelectorAll(
    '.wrap .productDetail .detail .fitting .goodSuits .suits input'
  );

  let selectedEle = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .result > div .selected'
  );

  let rightPriceEle = document.querySelector(
    '.wrap .productDetail .detail .fitting .goodSuits .result .price'
  );
  // 给input循环绑定单击事件
  inputs.forEach(function(input){
    input.addEventListener('click',function(){
      // 从下标截取到末尾  在装成number数值型  点击获取总价格
      let rightTotalPrice=parseInt(rightPriceEle.innerText.substring(1))
        
      // 获取当前input勾选的状态
        // a 计算出总的勾选数量的商品  并展示到页面
        // b 动态计算出左侧的套餐价
        if(this.checked){
          // 已勾选  拿到原已勾选的数据累加
          selectedNum++
          rightTotalPrice+=parseInt(this.value)

        }else{
          //未勾选
          selectedNum--
          rightTotalPrice-=parseInt(this.value)

        }
        selectedEle.innerText=selectedNum
        rightPriceEle.innerText='￥'+rightTotalPrice
    })
  })
}
