<template>
  <div class="hello">
    <div ref="vantaRef" class="bannal"></div>
    <div
      v-for="(data, index) of dataList"
      :class="expandMap[data.id] ? 'expand' : 'collapse'"
      :key="data.id"
      class="wow slideInLeft animate__backInLeft text_size"
      data-wow-duration="2s"
    >
      <template v-if="index < contion">
        {{ data.content }}
      </template>
    </div>
    <div
      v-if="dataList.length > 2"
      @click="control"
      class="wow slideInLeft animate__backInLeft text_size"
      data-wow-duration="2s"
    >
      {{ tabShow ? "展开" : "收起" }}
    </div>
    <div style="padding:0 20px">
      <ATable
        class="wow slideInLeft  animate__backInLeft "
        data-wow-duration="2s"
      />
      <div class="stylediv ">
        <div
          class="stylediv_left wow slideInLeft  animate__backInLeft "
          data-wow-duration="2s"
        >
          <img
            src="./u=1834289677,2685452503&fm=253&fmt=auto&app=120&f=JPEG.png"
            alt=""
          />
        </div>
        <div
          class="stylediv_right wow slideInLeft  animate__backInRight"
          data-wow-duration="2s"
        >
          <img
            src="./u=3444650031,2624308528&fm=253&fmt=auto&app=138&f=JPEG.png"
            alt=""
          />
        </div>
      </div>
      <MapContainer
        class=" wow slideInLeft animate__backInLeft "
        data-wow-duration="2s"
      />
    </div>
  </div>
</template>

<script>
import MapContainer from "./MapContainer.vue";
import ATable from "./ATable.vue";
import { onMounted } from "vue";
import { WOW } from "wowjs";
import CLOUDS from "vanta/src/vanta.clouds";
// import BIRDS from "vanta/src/vanta.birds";
import * as Three from "three";
export default {
  name: "HelloWorld",
  components: {
    MapContainer,
    ATable
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      dataList: [
        {
          id: 1,
          content: "1.垆边人似月，皓腕凝霜雪。"
        },
        { id: 2, content: "2.树深时见鹿，溪午不闻钟。" },
        { id: 3, content: "3.听雨寒更彻，开门落叶深。" },
        { id: 4, content: "4.客子光阴诗卷里，杏花消息雨声中。" },
        { id: 5, content: "5.昨夜醉眠西浦月。今宵独钓南溪雪。" },
        {
          id: 6,
          content:
            "6.终于为那一身江南烟雨覆了天下，容华谢后，不过一场，山河永寂。"
        }
      ],
      tabShow: true,
      contion: 2,
      expandMap: {}
    };
  },
  mounted() {
    this.$nextTick(() => {
      const wow = new WOW({
        boxClass: "wow", // default
        animateClass: "animated", // default
        offset: 150, // default
        mobile: true, // default
        live: false // default
      });
      wow.init();
    });

    this.vantaEffect = CLOUDS({
      el: this.$refs.vantaRef,
      THREE: Three
    });

    // 这里重新设置样式
    this.vantaEffect.setOptions({
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 600.0,
      minWidth: 200.0,
      skyColor: 0x91cde3,
      cloudColor: 0xc9c9d9,
      cloudShadowColor: 0x174b7d,
      sunColor: 0xe37f05,
      speed: 1.5
    });
  },
  methods: {
    control() {
      this.tabShow = !this.tabShow;
      !this.tabShow
        ? (this.contion = this.dataList.length)
        : (this.contion = 2);
    }
  },
  beforeDestroy() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.stylediv {
  /* background: #42b983; */
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
}
.stylediv img {
  width: 100%;
}
.bannal {
  height: 600px;
}
.text_size {
  font-size: 16px;
}
.at-item:hover {
  animation-name: shadow-pop-bottom;
  animation-duration: 1s;
  animation-timing-function: ease;
  animation-delay: 0s;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-fill-mode: none;
  /* shorthand 
  animation: shadow-pop-bottom 1s ease 0s 1 normal none;
  */
}
@keyframes shadow-pop-bottom {
  0% {
    transform: translateZ(0) translateY(0);
    box-shadow: 0 0 0 0 transparent;
  }
  100% {
    transform: translateZ(50px) translateY(-12px);
    box-shadow: 0 12px 20px -12px rgba(0, 0, 0, 0.35);
  }
}
</style>
