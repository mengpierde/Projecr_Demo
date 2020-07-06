<template>
  <section class="home">
    <!-- <el-button size="mini" type="primary" @click="drawPoint()">画点</el-button> -->
    <div style="position: absolute;top:10px; left:50px;z-index: 2">
      <el-button size="mini" type="primary" @click="drawLine()">画线</el-button>
      <button size="mini" type="primary" id="start" @click="startAnimation()">启动动画</button>
      <div class="block">
        <span class="demonstration">速度</span>
        <el-slider v-model="speed" :max="10" :min="1"></el-slider>
      </div>
    </div>
    <div id="map" ref="rootMap" class="map"></div>
  </section>
</template>

<script>
import Map from "ol/Map";
import View from "ol/View";
import Draw from "ol/interaction/Draw";
import TileWMS from "ol/source/TileWMS";
import Feature from "ol/Feature";
import { Point, LineString } from "ol/geom";
import Polyline from "ol/format/Polyline";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import XYZ from "ol/source/XYZ";
import VectorSource from "ol/source/Vector";
import { Circle, Fill, Icon, Stroke, Style } from "ol/style";
import { getVectorContext } from "ol/render";
import { fromLonLat } from "ol/proj";
import Polygon from "ol/geom/Polygon";

export default {
  data() {
    return {
      map: null, // 地图
      bounds: [
        21980.31438705661,
        -84810.30110236953,
        29443.31128705661,
        -80396.63660236952
      ], // 边界
      layers: null, // 地图图层
      pointLayer: null, // 画点的图层
      lineLayer: null, // 画线的图层
      startButton: null, // 开始结束的dom
      geoMarker: null, // 移动的marker
      now: null, // 存放时间
      speed: 1, // 速度
      animating: false, // 开关
      center: [26096.08436127158, -82097.22537132817],
      vectorLayer: null, // 总图层
      Polygon: null,
      // pointData: [
      //     [26778.353601008424, -82754.63857172888],
      //     [27059.255650488492, -82020.31206580396],
      //     [26751.81165979288, -82080.0314124453],
      //     [26236.45595795995, -82166.2926159277],
      //     [26028.54422572901, -82376.41618362447],
      //     [25185.360678995585, -82039.58925505183]
      // ],
      pointData: [
        [26664.07008, -84806.38609],
        [26679.1346, -84804.67116],
        [26663.21262, -84661.63147],
        [26666.94072, -84661.10954],
        [26667.7609, -84666.70168],
        [26827.09984, -84649.37348],
        [26827.69633, -84792.5923],
        [26663.95824, -84810.1291]
      ],
      border: [
        [26664.07008, -84806.38609],
        [26826.80159, -84788.61797],
        [26826.80159, -84792.62567],
        [26664.36833, -84810.27822]
        // [26664.07008, -84806.38609]
      ],
      styles: null,
      geo:null,
    };
  },
  mounted() {
    this.init();

    // this.map.getView().fit(this.bounds, this.map.getSize());
  },
  methods: {
    IsPtInPoly(ALon, ALat, APoints) {
      // debugger
      var iSum = 0,
        iCount;
      var dLon1, dLon2, dLat1, dLat2, dLon;
      if (APoints.length < 3) return false;
      iCount = APoints.length;
      for (var i = 0; i < iCount; i++) {
        if (i == iCount - 1) {
          dLon1 = APoints[i].lng;
          dLat1 = APoints[i].lat;
          dLon2 = APoints[0].lng;
          dLat2 = APoints[0].lat;
        } else {
          dLon1 = APoints[i].lng;
          dLat1 = APoints[i].lat;
          dLon2 = APoints[i + 1].lng;
          dLat2 = APoints[i + 1].lat;
        }
        //以下语句判断A点是否在边的两端点的水平平行线之间，在则可能有交点，开始判断交点是否在左射线上
        if (
          (ALat >= dLat1 && ALat < dLat2) ||
          (ALat >= dLat2 && ALat < dLat1)
        ) {
          if (Math.abs(dLat1 - dLat2) > 0) {
            //得到 A点向左射线与边的交点的x坐标：
            dLon = dLon1 - ((dLon1 - dLon2) * (dLat1 - ALat)) / (dLat1 - dLat2);
            if (dLon < ALon) iSum++;
          }
        }
      }
      if (iSum % 2 != 0) return true;
      return false;
    },

    init() {
      var features = [];
      var feature = new Feature({
        geometry: new Polygon([this.border])
      });
      setStyle(feature, []);
      features.push(feature);
      function setStyle(feature, styles) {
        styles.push(
          new Style({
            // 填充颜色 fill: new ol.style.Fill({color: 'gray'})
            // 边框颜色
            stroke: new Stroke({
              color: "red", // 边框颜色
              width: 2
            }),
            // 点形状
            image: new Circle({
              radius: 7,
              fill: new Fill({
                color: "red"
              })
            })
          })
        );
        feature.setStyle(styles);
      }
      var vector = new VectorLayer({
        source: new VectorSource({
          features: features
        })
      });
      //将绘制层添加到地图容器中

      this.startButton = document.getElementById("start");
      // this.startButton.addEventListener("click", this.startAnimation(), false);

      let self = this;
      this.layers = new TileLayer({
        extent: this.bounds, // 边界,
        source: new TileWMS({
          url: "http://10.229.36.159:8080/geoserver/workspace/wms",
          // Layers需要指定要显示的图层名
          params: {
            LAYERS: "workspace:Line",
            exceptions: "application/vnd.ogc.se_inimage",
            TILED: true
          },
          // serverType明显为geoserver
          serverType: "geoserver",
          // Countries have transparency, so do not fade tiles:
          transition: 0
        })
      });
      this.map = new Map({
        layers: [this.layers,vector],
        target: "map",
        view: new View({
          projection: "EPSG:900913",
          center: this.center,
          zoom: 14
        })
      });
      for(let i =0; i <features.length;i++){
        // debugger
        var geo = features[i].getGeometry()
        for(let k = 0 ; k < this.pointData.length; k ++){
          if(geo.intersectsCoordinate(this.pointData[k])){
            console.log('存在',this.pointData[k])
          }else{
            console.log('不存在',this.pointData[k])
          }
        }
      }
          // this.geo = feature.getGeometry();
    // console.log(this.geo)
    // // var isIn = this.geo.intersectsCoordinate([26664.07008, -84806.38609])
    // if(isIn){
    //   console.log("包含")
    // }else{
    //   console.log('不包含')
    // }
    }
    //  获取点
  }
};
</script>

<style scoped>
.home {
  height: 100%;
  width: 100%;
}
.map {
  height: 100%;
  width: 100%;
}
#start {
  margin-left: 10px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  padding: 8px 15px;
  font-size: 12px;
  border-radius: 3px;
  border: 0;
}
</style>