<template>
    <div id="map" ref="rootMap" class="map"></div>
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
import { Circle, Fill, Icon, Stroke, Style, Text} from "ol/style";
import { getVectorContext } from "ol/render";
import { fromLonLat } from "ol/proj";
export default {
    data() {
        return {
            pointArr: [{}, {}],
            vectorLayer: null,
            map: null, // 地图
            layers: null, // 地图图层
            styles: null,
            center: [26096.08436127158, -82097.22537132817],

            bounds: [
                21980.31438705661,
                -84810.30110236953,
                29443.31128705661,
                -80396.63660236952
            ], // 边界
            pointData: [
                [26700.41109243752, -83138.70827088959],
                [27041.063472559115, -83170.63569372385]
            ],
            // 单点追踪
            conf: {
                // 追踪模式
                monitor: {
                    // 起点坐标
                    p: [26096.08436127158, -82097.22537132817],
                    // 波动系数
                    set_num: 0.05,
                    // 线的样式
                    line_style: new Style({
                        stroke: new Stroke({
                            width: 3,
                            color: [255, 0, 0, 1],
                            lineDash: [10, 10]
                        })
                    }),
                    // 刷新时间
                    time: 1000
                }
            },
            all_obj: {
                // =======================追踪
                monitor: {
                    //
                    layer: null,
                    // 数据层
                    data_c: null,
                    // marker
                    p_data: null,

                    // 定时器标识
                    timer: null,
                    // 刷新标识
                    key: true
                }
            }
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
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

            this.vectorLayer = new VectorLayer({
                source: new VectorSource({
                    features: []
                })
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
            this._monitor();

            // this.getMidpoiont();
        },
        //  获取点
        onPoint() {
            // 监听singleclick事件
            this.map.on("singleclick", function(e) {
                console.log(e.coordinate);
            });
        },
        drawPoint(allPoint) {
            allPoint.forEach((item, index) => {
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
                // feature.setId(`point_${index}_${data.personId}`);
                this.vectorLayer.getSource().addFeature(feature);
            });
        },

        _monitor: function() {
            // 初始化参数
            // this._monitor_set();
            // 层构建
            this._monitor_layer();
            // 打点
            this._monitor_p();

            // 开始移动
            this._monitor_init();
        },
        // 层数据
        _monitor_layer: function() {
            // 层
            this.all_obj.monitor.layer = new VectorLayer();

            // 数据容器
            this.all_obj.monitor.data_c = new VectorSource();

            // 注入层
            this.all_obj.monitor.layer.setSource(this.all_obj.monitor.data_c);

            // 打到地图上
            this.map.addLayer(this.all_obj.monitor.layer);
        },
        // 点
        _monitor_p: function() {
            // console.log(mk_data_c);
            // 创建一个活动图标需要的Feature，并设置位置
            var p_data = new Feature({
                // 就一个参数啊，定义坐标
                // geometry: new ol.geom.Point(this.conf.monitor.p)
                geometry: this.conf.monitor.p
            });

            p_data.setStyle(
                new Style({
                    // 设置一个标识
                    image: new Icon({
                        src: "/static/images/start.png",

                        // 这个是相当于是进行切图了
                        // size: [50,50],

                        // 注意这个，竟然是比例 左上[0,0]  左下[0,1]  右下[1，1]
                        anchor: [0.5, 0.5],
                        // 这个直接就可以控制大小了
                        scale: 0.5
                    }),

                    text: new Text({
                        // 对其方式
                        textAlign: "center",
                        // 基准线
                        textBaseline: "middle",
                        offsetY: -30,
                        // 文字样式
                        font: "normal 16px 黑体",
                        // 文本内容
                        text: "name:admin",
                        // 文本填充样式
                        fill: new Fill({
                            color: "rgba(255,255,255,1)"
                        }),
                        padding: [5, 5, 5, 5],
                        backgroundFill: new Fill({
                            color: "rgba(0,0,255,0.6)"
                        })
                    })
                })
            );

            // 数据层收集marker
            this.all_obj.monitor.data_c.addFeature(p_data);

            // 最优一次
            // 最优一次
            this._map_fit(this.all_obj.monitor.data_c);

            // 拿到全局
            this.all_obj.monitor.p_data = p_data;
        },
        // 开始追踪
        _monitor_init: function() {
            // 追踪
            var old_p = null;
            var new_p = [0, 0];

            this.all_obj.monitor.timer = setTimeout(function() {
                // 得到旧的点
                old_p = this.all_obj.monitor.p_data.getGeometry()
                    .flatCoordinates;

                // ***********************************模拟数据
                if (Math.random() > 0.5) {
                    new_p[0] =
                        old_p[0] + Math.random() * this.conf.monitor.set_num;
                } else {
                    new_p[0] =
                        old_p[0] - Math.random() * this.conf.monitor.set_num;
                }

                if (Math.random() > 0.5) {
                    new_p[1] =
                        old_p[1] + Math.random() * this.conf.monitor.set_num;
                } else {
                    new_p[1] =
                        old_p[1] - Math.random() * this.conf.monitor.set_num;
                }
                // *******************************************

                if (this.all_obj.monitor.key) {
                    // 移动点--改变这个数据就行了
                    this.all_obj.monitor.p_data.setGeometry(
                        new Point(new_p)
                    );

                    // 线的数据
                    this._monitor_init_line(new_p, old_p);

                    //
                    this._monitor_init();

                    console.log("monitor");
                }
            }, this.conf.monitor.time);
        },
        // 初始化线
        _monitor_init_line: function(new_p, old_p) {
            var line_data = new Feature({
                geometry: new LineString([old_p, new_p])
            });
            line_data.setStyle(this.conf.monitor.line_style);

            // 注入容器
            this.all_obj.monitor.data_c.addFeature(line_data);
        }
    }
};
</script>

<style>
#map {
    width: 100%;
    height: 100%;
}
</style>