<template>
    <section class="home">
        <div style="position: absolute;top:10px; left:50px;z-index: 2">
            <button size="mini" type="primary" id="start" @click="startAnimation()">启动动画</button>
            <div class="block">
                <span class="demonstration">速度</span>
                <el-slider v-model="speed" :max="10" :min="1"></el-slider>
            </div>
        </div>
        <div class="personTree">
            <personTree
                ref="personTree"
                @getCheckedPerson="getCheckedPerson"
                @removeFeature="removeFeature"
            ></personTree>
        </div>
        <div id="map" ref="rootMap" class="map"></div>
        <div id="popup" class="ol-popup" v-show="isShowPop">
            <a href="#" id="popup-closer" class="ol-popup-closer"></a>
            <div id="popup-content"></div>
        </div>
    </section>
</template>

<script>
import personTree from "./components/personTree";
import Map from "ol/Map";
import View from "ol/View";
import Overlay from "ol/Overlay";
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
import coordinate from "ol/coordinate";

export default {
    components: {
        personTree
    },
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
            pointData: [
                // 线的坐标点位
                [26778.353601008424, -82754.63857172888],
                [27059.255650488492, -82020.31206580396],
                [26751.81165979288, -82080.0314124453],
                [26236.45595795995, -82166.2926159277],
                [26028.54422572901, -82376.41618362447],
                [25185.360678995585, -82039.58925505183]
            ],
            styles: null,
            colorList: ["red", "yellow", "#000"],
            checkedPointList: [],
            dataList: [
                {
                    personId: "2",
                    personName: "张三",
                    anitating: false,
                    pointData: [
                        // 线的坐标点位
                        [26778.353601008424, -82754.63857172888],
                        [27059.255650488492, -82020.31206580396],
                        [26751.81165979288, -82080.0314124453],
                        [26236.45595795995, -82166.2926159277],
                        [26028.54422572901, -82376.41618362447],
                        [25185.360678995585, -82039.58925505183]
                    ]
                },
                {
                    personId: "3",
                    personName: "李四",
                    anitating: false,
                    pointData: [
                        // 线的坐标点位
                        [28250.951611085107, -82558.13381535355],
                        [28231.12008076202, -82602.34167017968],
                        [28634.791367946644, -82772.12910986734],
                        [28582.286798371726, -82866.90998814741]
                    ]
                },
                {
                    personId: "4",
                    personName: "王五",
                    anitating: false,
                    pointData: [
                        // 线的坐标点位
                        [28002.616137299607, -83255.45997686734],
                        [28000.938563446503, -83475.23386321869]
                        // [26797.928499373367, -83374.70890617493],
                        // [26799.175138529117, -83408.99200607663]
                    ]
                }
            ], // 数据的集合
            geoMarkerList: {}, // 移动点集合
            animationList: {}, // 移动开关
            container: null,
            content: null,
            closer: null,
            isShowPop: false
        };
    },
    mounted() {
        this.init();
        // this.map.getView().fit(this.bounds, this.map.getSize());
    },
    methods: {
        init() {
            // 获取到popup的节点
            this.container = document.getElementById("popup");
            this.content = document.getElementById("popup-content");
            this.closer = document.getElementById("popup-closer");
            console.log(this.container, 'this.container')
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
            this.styles = {
                geoMarker: new Style({
                    image: new Circle({
                        radius: 7,
                        fill: new Fill({ color: "black" }),
                        stroke: new Stroke({
                            color: "white",
                            width: 2
                        })
                    })
                })
            };

            this.vectorLayer = new VectorLayer({
                source: new VectorSource({
                    features: []
                }),
                style: function(feature) {
                    console.log(feature, "feature");
                    // hide geoMarker if animation is active
                    // 控制第一个，最后一个点位显示隐藏
                    let id = feature.getId();
                    let index = id.lastIndexOf("_");
                    let personId = id.slice(index + 1, id.length);
                    console.log(id, index, personId, "personId");
                    if (
                        self.animationList[personId] &&
                        feature.get("type") === "geoMarker"
                    ) {
                        return null;
                    }
                    return self.styles[feature.get("type")];
                }
            });

            this.map = new Map({
                layers: [this.layers, this.vectorLayer],
                target: "map",
                view: new View({
                    projection: "EPSG:900913",
                    center: this.center,
                    zoom: 14
                })
            });
            this.onPoint();
            // this.map.addLayer(self.vectorLayer)
        },
        //  获取点
        onPoint() {
            // 监听singleclick事件
            this.map.on("singleclick", function(e) {
                console.log(e.coordinate);
            });
        },
        //  画移动的点
        drawMovePoint(data) {
            let pointData = data.pointData; // 所有点位信息
            var feature = new Feature({
                type: "geoMarker",
                geometry: new Point(pointData[0])
            });
            //设置这个点的样式
            feature.setStyle(
                new Style({
                    image: new Circle({
                        color: "#44ccff",
                        radius: 5,
                        fill: new Fill({
                            color: "orange"
                        }),
                        stroke: new Stroke({ color: "red", width: 1 })
                    })
                })
            );
            feature.setId(`geoMarker_${data.personId}`);
            // this.geoMarker = feature
            // 把对应的线分别存起来
            this.geoMarkerList[`${data.personId}`] = feature;
            this.vectorLayer.getSource().addFeature(feature);
        },
        showPop() {
            // 创建一个overlay, 绑定html元素container
            let self = this;
            var overlay = new Overlay({
                element: self.container,
                autoPan: true,
                autoPanAnimation: {
                    duration: 250
                }
            });
            self.closer.onclick = function() {
                this.isShowPop = false;
                overlay.setPosition(undefined);
                self.closer.blur();
                return false;
            };
            self.map.addOverlay(overlay);
            // 监听地图点击事件
            self.map.on("singleclick", function(evt) {
                self.isShowPop = true;
                console.log(1111);
                // 获取当前点击坐标，并设置到HTML元素上去
                console.log(evt.coordinate, "evt.coordinate");
                var coordinate1 = evt.coordinate;
                self.content.innerHTML = "<p>Firstname</p>";
                // 设置overlay的位置，从而显示在鼠标点击处
                overlay.setPosition(coordinate1);
            });
        },
        // 画点
        drawPoint(data) {
            let pointData = data.pointData; // 所有点位信息
            // 画起点，终点
            let arr = [];
            for (let i = 0; i < pointData.length; i++) {
                if (i === 0 || i === pointData.length - 1) {
                    arr.push(pointData[i]);
                }
            }
            arr.forEach((item, index) => {
                var feature = new Feature({
                    geometry: new Point(item)
                });
                //设置这个点的样式
                let url = "";
                if (index === 0) {
                    url = "/static/images/start.png";
                } else {
                    url = "/static/images/end.png";
                }
                feature.setStyle(
                    new Style({
                        image: new Icon({
                            src: url,
                            anchor: [0.5, 0.8]
                        })
                    })
                );
                feature.setId(`point_${index}_${data.personId}`);
                // console.log(feature, "feature");
                this.vectorLayer.getSource().addFeature(feature);
                this.showPop();
                // this.map.addLayer(pointLayer);
            });
        },
        // 画线
        drawLine(data, index) {
            let pointData = data.pointData; // 所有点位信息
            let self = this;
            self.drawPoint(data);
            self.drawMovePoint(data);
            //下边来添加一线feature
            var feature = new Feature({
                type: "lineStyle",
                geometry: new LineString(
                    // fromLonLat([25857.529021409715, -81644.51905673699]),
                    pointData // 线的坐标
                )
            });
            feature.setId(`line_${data.personId}`);
            console.log(feature, "feature");
            var lineStyle = new Style({
                stroke: new Stroke({
                    color: self.colorList[index],
                    width: 3
                })
            });
            // 添加线的样式
            feature.setStyle(lineStyle);
            // 添加线的fature
            self.vectorLayer.getSource().addFeature(feature);
        },
        // 动画效果
        moveFeature: function(event, item) {
            let num = 0;
            let self = this;
            let routeLength = item.pointData.length;
            var vectorContext = getVectorContext(event);
            var frameState = event.frameState;
            if (item.anitating) {
                var elapsedTime = frameState.time - self.now;
                var index = Math.round((self.speed * elapsedTime) / 1000);
                if (index >= routeLength) {
                    self.stopAnimation(true, item);
                    return;
                }
                var currentPoint = new Point(item.pointData[index]);
                var feature = new Feature(currentPoint);
                vectorContext.drawFeature(feature, self.styles.geoMarker);
            }
            // tell OpenLayers to continue the postrender animation
            this.map.render();
        },
        // 启动动画
        startAnimation() {
            this.checkedPointList.map(item => {
                if (item.anitating) {
                    this.stopAnimation(false, item);
                } else {
                    item.anitating = true;
                    this.animationList[item.personId] = true; // 控制第一个，最后一个点位显示隐藏
                    this.now = new Date().getTime();
                    this.startButton.textContent = "结束动画";
                    // 把移动的点样式去掉，（隐藏效果）
                    this.geoMarkerList[`${item.personId}`].setStyle(null);
                    // 居中操作
                    // this.map.getView().setCenter(this.center);
                    this.vectorLayer.on("postrender", event =>
                        this.moveFeature(event, item)
                    );
                    this.map.render();
                }
                return item;
            });
        },

        // /**9
        //  * @param {boolean} ended end of animation.
        //  */
        stopAnimation(ended, item) {
            item.anitating = false;
            this.animationList[item.personId] = false; // 控制第一个，最后一个点位显示隐藏

            this.startButton.textContent = "开始动画";
            // if animation cancelled set the marker at the beginning
            let routeLength = item.pointData.length;
            var coord = ended
                ? item.pointData[routeLength - 1]
                : item.pointData[0];
            var geometry = this.geoMarkerList[`${item.personId}`].getGeometry(); // 要素的默认几何。
            geometry.setCoordinates(coord); //  设置坐标
            //remove listener
            this.vectorLayer.un("postrender", event =>
                this.moveFeature(event, item)
            );
        },

        //  删除图层
        removeFeature(data) {
            let self = this;
            let allFeature = self.vectorLayer.getSource().getFeatures();
            // 把存下来的数据删掉
            this.checkedPointList.map((item, index) => {
                if (data) {
                    // 匹配对应的数据
                    if (data.personId == item.personId) {
                        // 给画线的方法传点位信息
                        this.checkedPointList.splice(index, 1);
                    }
                }
                return item;
            });
            // 找到所有的feature，然后根据设定的id进行对应删除
            allFeature.forEach((item, index) => {
                console.log(item.getId(), "item");
                // 树结构和给的点位数据personId必须相同 起点的id最后一个后缀定死是0 终点1
                if (
                    item.id_ === `line_${data.personId}` ||
                    item.id_ === `point_0_${data.personId}` ||
                    item.id_ === `point_1_${data.personId}` ||
                    item.id_ === `geoMarker_${data.personId}`
                ) {
                    self.vectorLayer.getSource().removeFeature(item);
                }
            });
            // this.vectorLayer.getSource().clear() // 删除所有feature
        },
        // 获取选中的人员
        getCheckedPerson(data) {
            this.dataList.map((item, index) => {
                if (data) {
                    // 匹配对应的数据
                    if (data.personId == item.personId) {
                        // 给画线的方法传点位信息
                        this.checkedPointList.push(item); // 把选中的对应数据存下来
                        this.animationList[item.personId] = false;
                        this.drawLine(item, index); // 选中人员的时候画线
                    }
                }
                return item;
            });
        }
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
.personTree {
    position: absolute;
    top: 20%;
    left: 10px;
    z-index: 2;
    width: 120px;
}

.ol-popup {
    position: absolute;
    background-color: white;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    padding: 15px;
    border-radius: 10px;
    border: 1px solid #cccccc;
    bottom: 12px;
    left: -50px;
    min-width: 280px;
}
.ol-popup:after,
.ol-popup:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
}
.ol-popup:after {
    border-top-color: white;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
}
.ol-popup:before {
    border-top-color: #cccccc;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
}
.ol-popup-closer {
    text-decoration: none;
    position: absolute;
    top: 2px;
    right: 8px;
}
.ol-popup-closer:after {
    content: "✖";
}
</style>