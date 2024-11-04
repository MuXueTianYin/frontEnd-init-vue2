<template>
  <div :key="componentKey">
    <div id="map">
    </div>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'
// import 'leaflet/dist/leaflet.css'
// import * as L from 'leaflet'
import { recommendations } from '@/api/path'

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  data () {
    return {
      center: [39.915599, 116.31177],
      zoom: 12,
      tileUrl: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      componentKey: 0,
      distance: 500000,
      attractions: []
    }
  },
  methods: {
    // handleSubmit () {
    //   this.refreshMap()
    //   this.fetchHotels()
    // },
    // refreshMap () {
    //   const L = this.L
    //   this.componentKey++
    //   this.map.eachLayer(layer => {
    //     if (layer instanceof L.Marker) {
    //       this.map.removeLayer(layer)
    //     }
    //   })
    // },
    async fetchHotels () {
      try {
        const response = await recommendations({
          longitude: this.center[1],
          latitude: this.center[0],
          distance: this.distance
        })
        this.attractions = response.data
        console.log(response.data)
        this.updateMapWithHotels()
      } catch (error) {
        console.error('获取酒店数据失败:', error)
        this.$message.error('获取酒店数据失败: ' + error.message)
      }
    },
    updateMapWithHotels () {
      this.L = this.$L
      const L = this.L
      const layers = []
      if (!this.map) {
        this.map = L.map('map', {
          center: L.latLng(39.915599, 116.31177),
          // center: L.latLng(23.140833538081456, 113.30564975738527),
          zoom: 16,
          maxZoom: 18
        })
        L.tileLayer(
          'http://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
          {
            subdomains: ['1', '2', '3', '4'],
            attribution: '高德'
          }
        ).addTo(this.map)
        layers.push(L.marker([39.915599, 116.31177], {
          icon: L.icon({
            iconUrl: require('@/assets/icons/map.png'),
            iconSize: [25, 41],
            iconAnchor: [13, 21]
          })
        }).bindPopup('你在这里'))
      }

      if (this.attractions.length > 0) {
        const ids = new Set()
        this.attractions.map((item) => {
          const Icon = L.icon({
            iconUrl: require('@/assets/icons/attraction.png'),
            iconSize: [25, 41],
            iconAnchor: [13, 21]
          })
          // eslint-disable-next-line new-cap
          const attraction = new L.marker([item.attraction.latitude, item.attraction.longitude], { icon: Icon })
            .bindPopup(item.attraction.name)
          if (attraction) layers.push(attraction)
          // console.log([item.attraction.latitude, item.attraction.longitude], index, '[item.attraction.latitude, item.attraction.longitude]')
          item.recommendedHotels.map((hotel, ind) => {
             if (Array.from(ids).findIndex(el => el === hotel.id) !== -1) return
            ids.add(hotel.id)
            const Icon2 = L.icon({
              iconUrl: require('@/assets/icons/hotel.png'),
              iconSize: [25, 41],
              iconAnchor: [13, 21]
            })
            // eslint-disable-next-line new-cap
            const recommendedHotels = new L.marker([hotel.latitude, hotel.longitude], { icon: Icon2 })
              .bindPopup(hotel.name)
            console.log(hotel.latitude, hotel.longitude, ind, hotel.name)
            if (recommendedHotels) layers.push(recommendedHotels)
          })
        })
        console.log(layers)
        L.layerGroup(layers).addTo(this.map)
      } else {
        console.error('No attractions data available')
      }
    }
  },
  mounted () {
    this.fetchHotels()
  },
  beforeDestroy () {
    if (this.map) {
      this.map.remove()
    }
  }
}
</script>

<style scoped>
/* 确保外部容器有足够的尺寸 */
#map{
  width:100%;
  height:calc(85vh)
}
</style>
