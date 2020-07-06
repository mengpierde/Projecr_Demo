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
import { Circle, Fill, Icon, Stroke, Style } from "ol/style";
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
            ]
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
            this.getMidpoiont()
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
        // 已知的两个坐标点
        // 获取两个坐标点之间的位置
        getMidpoiont() {
            const lngca =
                (Math.max(
                    parseFloat(this.pointData[0][0]),
                    parseFloat(this.pointData[1][0])
                ) -
                    Math.min(
                        parseFloat(this.pointData[0][0]),
                        parseFloat(this.pointData[1][0])
                    )) /
                2;
            const latca =
                (Math.max(
                    parseFloat(this.pointData[0][1]),
                    parseFloat(this.pointData[1][1])
                ) -
                    Math.min(
                        parseFloat(this.pointData[0][1]),
                        parseFloat(this.pointData[1][1])
                    )) /
                2;
            const lngcenter =
                Math.min(
                    parseFloat(this.pointData[0][0]),
                    parseFloat(this.pointData[1][0])
                ) + lngca;
            const latcenter =
                Math.min(
                    parseFloat(this.pointData[0][1]),
                    parseFloat(this.pointData[1][1])
                ) + latca;
            const pointcenter = `${lngcenter}, ${latcenter}`
            this.pointData.push([lngcenter, latcenter])
            this.drawPoint(this.pointData);

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