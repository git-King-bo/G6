<template>
  <div>
    <div id="container"></div>
    <div ref="infoData" class="custom-info input-card content-window-card">
      <div class="info-top">
        <div>
          <span>{{ devInfo.title }}</span>
          <span style="font-size:11px; margin-left:20px;color:#F00;"
            >状态：{{ devInfo.state }}</span
          >
        </div>
        <img
          @click="closeInfoWindow"
          src="https://webapi.amap.com/images/close2.gif"
        />
      </div>
      <div class="info-middle" style="background-color: white;">
        <img
          class="info-img"
          src="./u=3444650031,2624308528&fm=253&fmt=auto&app=138&f=JPEG.png"
        /><a
          class="info-a-title"
          href="https://ditu.amap.com/detail/B000A8URXB?citycode=110105"
          >XXXXXXXXXXXX</a
        ><br />地址：{{ devInfo.address }}<br />
        <div class="info-div">总用电：{{ devInfo.electricity }}</div>
        <span class="info-span">
          总用气：{{ devInfo.gas }}<br />
          <div class="info-div">发酵罐：{{ devInfo.guan }}</div>
          <span class="info-span"> 总用水量：{{ devInfo.water }}</span
          ><br />
          <div class="info-div">工作年限：{{ devInfo.years }}</div>
          <span class="info-span"> 总产量：{{ devInfo.total }}</span
          ><br />
          <div class="info-div">建厂时间：{{ devInfo.time }}</div>
          <span class="info-span">建筑面积：{{ devInfo.mianji }}</span>
        </span>
      </div>
      <div
        class="info-bottom"
        style="position: relative; top: 0px; margin: 0px auto;"
      >
        <img src="https://webapi.amap.com/images/sharp.png" />
      </div>
    </div>
    <!-- <div class="info">
      点击地图上的点标记，打开所添加的自定义信息窗体
    </div> -->
  </div>
</template>
<script>
import AMapLoader from "@amap/amap-jsapi-loader";

export default {
  data() {
    return {
      devInfo: {
        title: "",
        icon: "",
        state: "",
        address: "",
        electricity: "",
        gas: "",
        guan: "",
        water: "",
        years: "",
        time: "",
        mianji: ""
      },
      map: null,
      markerData: [
        {
          title: "1号厂区",
          icon: "img/gc2.png", //点标记图片路径
          state: "正常使用",
          address: "XXXXXXXXXXX",
          electricity: "5428542°",
          gas: "454575NM",
          guan: "210个",
          water: "3235T",
          years: "10年",
          total: "27784T",
          time: "2011.09.08",
          mianji: "1200M3",
          position: [108.971642, 34.247119],
          offset: new AMap.Pixel(-8, -30)
        },
        {
          title: "2号厂区",
          icon: "./u=1834289677,2685452503&fm=253&fmt=auto&app=120&f=JPEG.png", //点标记图片路径
          state: "已废弃",
          address: "XXXXXXXXXXXXX",
          electricity: "5428542°",
          gas: "454575NM",
          guan: "210个",
          water: "3235T",
          years: "15年",
          total: "27784T",
          time: "2006.09.08",
          mianji: "1200M3",
          position: [108.9768933198242, 34.24537248278517],
          offset: new AMap.Pixel(-3, -30)
        },
        {
          title: "3号厂区",
          icon: "img/gc2.png", //点标记图片路径
          state: "正常使用",
          address: "XXXXXXXXXXXX",
          electricity: "5428542°",
          gas: "454575NM",
          guan: "210个",
          water: "3235T",
          years: "10年",
          total: "27784T",
          time: "2011.09.08",
          mianji: "1200M3",
          position: [108.979965, 34.250659],
          offset: new AMap.Pixel(-12, -30)
        }
      ]
    };
  },
  mounted() {
    this.map = this.createMap();
    this.map.clearMap();
    this.addMarker();
  },
  created() {},
  methods: {
    //1.创建map对象
    createMap() {
      //1.地图初始化时，在地图上添加marker标记,鼠标点击marker可弹出自定义的信息窗体
      var mapData = new AMap.Map("container", {
        resizeEnable: true,
        center: [108.9768933198242, 34.24637248278447], //地图中心点位置
        zoom: 16
      });
      return mapData;
    },
    //2.添加点标记
    addMarker() {
      const self = this;

      let arr = [];
      this.markerData.forEach(item => {
        let marker = new AMap.Marker({
          icon:
            "//a.amap.com/jsapi_demos/static/demo-center/icons/dir-via-marker.png", //点标记图片路径
          position: item.position, //位置
          offset: item.offset //偏移
        });
        arr.push(
          Object.assign(item, {
            mapId: marker._amap_id
          })
        );
        marker.setMap(self.map);
        self.markerClick(arr, marker);
        self.closeInfoWindow();
        AMap.event.addListener(marker, "click", e => {
          self.markerClick(arr, marker);
        });
      });
    },
    //3.点击标记 获取所点击标记的信息以及窗体要展示的数据，创建信息窗体
    markerClick(arr, marker) {
      let arrNew = arr.filter(x => x.mapId == marker._amap_id);
      this.devInfo = arrNew && arrNew[0];
      let infoWindow = this.createInfoWindow();
      this.openInfoWindow(infoWindow, marker);
    },
    //4.构建自定义窗体
    createInfoWindow() {
      let infoWindowData = new AMap.InfoWindow({
        isCustom: true, //使用自定义窗体
        content: this.$refs.infoData,
        // content: this.getContent(),
        offset: new AMap.Pixel(16, -45)
      });
      return infoWindowData;
    },

    //5.打开窗体
    openInfoWindow(infoWindow, marker) {
      console.log("1231", infoWindow, marker);
      infoWindow.open(this.map, marker.getPosition());
    },
    //6.关闭窗体
    closeInfoWindow() {
      console.log("close");
      this.map.clearInfoWindow();
    }
  }
};
</script>

<style>
html,
body,
#container {
  height: 100%;
  width: 100%;
}
html {
  font-size: 12px;
}
.content-window-card {
  position: relative;
  box-shadow: none;
  bottom: 0;
  left: 0;
  /* width: auto; */
  width: 28rem;
  padding: 0;
}

.content-window-card p {
  height: 2rem;
}

.custom-info {
  border: solid 1px silver;
}

div.info-top {
  position: relative;
  background: none repeat scroll 0 0 #f9f9f9;
  border-bottom: 1px solid #ccc;
  border-radius: 5px 5px 0 0;
}

div.info-top div {
  display: inline-block;
  color: #333333;
  font-size: 14px;
  font-weight: bold;
  line-height: 31px;
  padding: 0 10px;
}

div.info-top img {
  position: absolute;
  top: 10px;
  right: 10px;
  transition-duration: 0.25s;
}

div.info-top img:hover {
  box-shadow: 0px 0px 5px #000;
}

div.info-middle {
  font-size: 12px;
  padding: 10px 6px;
  line-height: 20px;
}

div.info-bottom {
  height: 0px;
  width: 100%;
  clear: both;
  text-align: center;
}

div.info-bottom img {
  position: relative;
  z-index: 104;
}

/* span {
  margin-left: 5px;
  font-size: 11px;
} */

.info-middle img {
  float: left;
  margin-right: 6px;
}

.info-span {
  /* margin-left: 35px; */
  font-size: 11px;
}

.info-div {
  width: 140px;
  display: inline-block;
  margin-left: 10px;
}

.info-img {
  width: 40px;
  height: 40px;
}

.info-a-title {
  /* color: #000000; */
  font-size: 16px;
}
#container {
  /*因为我自己的组件是在一个套了很多层的页面上使用的，所以这里需要给地图给一个固定的高，宽是100%可省略不写，否则地图会因为它自身的定位而不显示*/
  height: 820px;
}
#container .amap-icon img,
.amap-marker-content img {
  width: 50px;
  height: 50px;
}
.amap-copyright {
  box-sizing: content-box;
}
* {
  box-sizing: border-box;
}
.input-textarea {
  color: grey;
  height: 8em;
  overflow: auto;
  border-radius: 0.4rem;
  border: 1px solid #ced4da;
  margin-bottom: 1rem;
}
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
  line-height: 1.5;
  font-weight: 300;
  color: #111213;
}

hr {
  margin: 0.5rem 0;
  box-sizing: content-box;
  height: 0;
  overflow: visible;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

p {
  margin-top: 0;
  margin-bottom: 0;
}

label {
  display: inline-block;
  margin-bottom: 0.4rem;
}

label,
.btn {
  margin-left: 0;
  font-size: 1rem;
}

button,
input,
select {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  overflow: visible;
  text-transform: none;
}

[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner,
button::-moz-focus-inner {
  padding: 0;
  border-style: none;
}

input[type="checkbox"],
input[type="radio"] {
  box-sizing: border-box;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0;
  margin: 0 0.5rem 0 0;
}

h4 {
  font-family: inherit;
  line-height: 1.8;
  font-weight: 300;
  color: inherit;
  font-size: 1.1rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  background-color: transparent;
  background-image: none;
  color: #25a5f7;
  border-color: #25a5f7;
  padding: 0.25rem 0.5rem;
  line-height: 1.5;
  border-radius: 1rem;
  -webkit-appearance: button;
  cursor: pointer;
}

.btn:hover {
  color: #fff;
  background-color: #25a5f7;
  border-color: #25a5f7;
}

.btn:hover {
  text-decoration: none;
}

.input-item {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
  height: 3rem;
}

.input-item:last-child {
  margin-bottom: 0;
}

.input-item > select,
.input-item > input[type="text"],
.input-item > input[type="date"] {
  position: relative;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  width: 1%;
  margin-bottom: 0;
}

.input-item > select:not(:last-child),
.input-item > input[type="text"]:not(:last-child),
.input-item > input[type="date"]:not(:last-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.input-item > select:not(:first-child),
.input-item > input[type="text"]:not(:first-child),
.input-item > input[type="date"]:not(:first-child) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.input-item-prepend {
  margin-right: -1px;
}

.input-item-text,
input[type="text"],
input[type="date"],
select {
  height: calc(2.2rem + 2px);
}

.input-item-text {
  width: 6rem;
  text-align: justify;
  padding: 0.4rem 0.7rem;
  display: inline-block;
  text-justify: distribute-all-lines;
  /*ie6-8*/
  text-align-last: justify;
  /* ie9*/
  -moz-text-align-last: justify;
  /*ff*/
  -webkit-text-align-last: justify;
  /*chrome 20+*/
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  text-align: center;
  white-space: nowrap;
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}

.input-item-text input[type="checkbox"],
.input-item-text input[type="radio"] {
  margin-top: 0;
}

.input-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border-radius: 0.25rem;
  width: 613px;
  border-width: 0;
  border-radius: 15px;
  box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5);

  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 10px;
}

.input-text {
  line-height: 2rem;
  margin-right: 2rem;
}

.info hr {
  margin-right: 0;
  margin-left: 0;
  border-top-color: grey;
}

.info {
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  position: fixed;
  top: 1rem;
  background-color: white;
  width: auto;
  min-width: 22rem;
  border-width: 0;
  right: 1rem;
  box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5);
}

.code {
  left: 1.5rem;
  right: 1.5rem;
  top: 1.5rem;
  bottom: 1.5rem;
  overflow: auto;
  margin-bottom: 0rem;
}

.code .btn {
  top: 1rem;
  position: absolute;
  right: 1rem;
}

.code .result {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  padding: 1rem;
  bottom: 1rem;
  position: absolute;
  top: 5.5rem;
  right: 1rem;
  left: 1rem;
  overflow: auto;
}

.code .status {
  color: #80adff;
  display: inline-block;
  font-size: 14px;
}

.code h4 {
  display: inline-block;
  max-width: 20rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
}

select,
input[type="text"],
input[type="date"] {
  display: inline-block;
  width: 100%;
  padding: 0.375rem 1.75rem 0.375rem 0.75rem;
  line-height: 1.5;
  color: #495057;
  vertical-align: middle;
  background: #fff
    url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E")
    no-repeat right 0.75rem center;
  background-size: 8px 10px;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

input[type="text"],
input[type="date"] {
  background: #fff;
  padding: 0.375rem 0.75rem;
}

select:focus,
input[type="text"]:focus,
input[type="date"]:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.1rem rgba(128, 189, 255, 0.1);
}

.btn:focus {
  outline: 0;
  box-shadow: none;
}

select:focus::-ms-value,
input[type="text"]:focus::-ms-value,
input[type="date"]:focus::-ms-value {
  color: #495057;
  background-color: #fff;
}

/* native toastr */
.native-toast {
  position: fixed;
  background-color: rgba(50, 50, 50, 0.8);
  border-radius: 33px;
  color: white;
  left: 50%;
  text-align: center;
  padding: 6px 12px;
  opacity: 0;
  z-index: 99999;
  transition: transform 0.25s, opacity 0.25s, top 0.25s;
  box-sizing: border-box;
}

.native-toast-bottom {
  bottom: 50px;
  -ms-transform: translateX(-50%) translateY(50px);
  transform: translateX(-50%) translateY(50px);
}

.native-toast-bottom.native-toast-shown {
  opacity: 1;
  -ms-transform: translateX(-50%) translateY(0);
  transform: translateX(-50%) translateY(0);
}

.native-toast-bottom.native-toast-edge {
  bottom: 0;
}

.native-toast-top {
  top: 50px;
  -ms-transform: translateX(-50%) translateY(-50px);
  transform: translateX(-50%) translateY(-50px);
}

.native-toast-top.native-toast-shown {
  opacity: 1;
  -ms-transform: translateX(-50%) translateY(0);
  transform: translateX(-50%) translateY(0);
}

.native-toast-top.native-toast-edge {
  top: 0;
}

.native-toast-center {
  top: 0;
  -ms-transform: translateX(-50%) translateY(-50px);
  transform: translateX(-50%) translateY(-50px);
}

.native-toast-center.native-toast-shown {
  opacity: 1;
  top: 50%;
  -ms-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}

.native-toast-edge {
  border-radius: 0;
  width: 100%;
  text-align: left;
}

@media screen and (min-width: 40rem) {
  .native-toast:not(.native-toast-edge) {
    max-width: 18rem;
  }
}

/*
  max-width does not seem to work in small screen?
*/

/*@media screen and (max-width: 768px) {
  .native-toast:not(.native-toast-edge) {
    max-width: 400px;
  }
}

@media screen and (max-width: 468px) {
  .native-toast:not(.native-toast-edge) {
    max-width: 300px;
  }
}*/

/* types */

.native-toast-error {
  background-color: #d92727;
  color: white;
}

.native-toast-success {
  background-color: #62a465;
  color: white;
}

.native-toast-warning {
  background-color: #fdaf17;
  color: white;
}

.native-toast-info {
  background-color: #5060ba;
  color: white;
}

[class^="native-toast-icon-"] {
  vertical-align: middle;
  margin-right: 8px;
}

[class^="native-toast-icon-"] svg {
  width: 16px;
  height: 16px;
}
</style>
