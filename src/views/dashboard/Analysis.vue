<template>
  <div>
    <a-row :gutter="24">
      <a-col :span="24">
        <a-card title="查询最短路径">
          <a-form @submit.prevent="findShortestPath">
            <a-form-item label="选择酒店">
              <a-select v-model="selectedHotel" placeholder="请选择酒店">
                <a-select-option v-for="hotel in hotels" :key="hotel.id" :value="hotel.id">
                  {{ hotel.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="选择景点">
              <a-select v-model="selectedAttractions" placeholder="请选择景点" mode="multiple">
                <a-select-option v-for="attraction in attractions" :key="attraction.id" :value="attraction.id">
                  {{ attraction.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-button type="primary" html-type="submit">查询路径</a-button>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
    <div style="height: 70px"></div>
    <div ref="lineChartContainer" class="lineChartContainer" ></div>
  </div>

</template>

<script>
import { findShortestPath } from '@/api/path'
import { list as listHotels } from '@/api/hotels'
import { list as listAttractions } from '@/api/attractions'
// eslint-disable-next-line no-unused-vars
import { Line } from '@antv/g2plot'
export default {
  data: function () {
    return {
      attractions: [],
      hotels: [],
      selectedAttractions: [],
      selectedHotel: null,
      shortestPath: [],
      scale: {
        x: { min: 0, max: 10 },
        y: { min: 0, max: 10 }
      },
      graphData: {
        nodes: [
          { id: '1', x: Math.random() * 10, y: Math.random() * 10 },
          { id: '2', x: Math.random() * 10, y: Math.random() * 10 },
          { id: '3', x: Math.random() * 10, y: Math.random() * 10 },
          { id: '4', x: Math.random() * 10, y: Math.random() * 10 },
          { id: '5', x: Math.random() * 10, y: Math.random() * 10 }
        ],
        edges: [
          { source: '1', target: '2' },
          { source: '2', target: '3' },
          { source: '3', target: '4' },
          { source: '4', target: '5' }
        ]
      },
      linePlot: null // 添加这行来存储图表实例
    }
  },
  mounted () {
    this.fetchAttractions()
    this.fetchHotels()
  },
  beforeDestroy () {
    if (this.linePlot) {
      this.linePlot.destroy() // 销毁图表实例
    }
  },
  methods: {
    async fetchHotels () {
      const response = await listHotels()
      if (response && response.data) {
        this.hotels = response.data.records
      }
    },
    async fetchAttractions () {
      const response = await listAttractions()
      if (response && response.data) {
        this.attractions = response.data.records
      }
    },
    async findShortestPath () {
      if (this.selectedHotel && this.selectedAttractions.length > 0) {
        const params = {
          startId: this.selectedHotel,
          endIds: this.selectedAttractions
        }
        const response = await findShortestPath(params)
        if (response && response.data) {
          this.transformData(response.data)
        }
      } else {
        alert('请选择酒店和至少一个景点')
      }
    },
    updateGraph () {
      const data = this.graphData.edges.map(edge => ({
        source: edge.source,
        target: edge.target,
        value: edge.weight
      }))

      if (this.linePlot) {
        this.linePlot.changeData(data)
      } else {
        this.linePlot = new Line(this.$refs.lineChartContainer, {
          data: data,
          xField: 'source',
          yField: 'value',
          seriesField: 'target',
          smooth: true,
          point: {
            size: 5,
            shape: 'circle'
          },
          label: {
            // 显示节点名称
            formatter: (datum) => {
              const node = this.graphData.nodes.find(node => node.id === datum.source)
              return node ? node.label : ''
            },
            offset: 10
          },
          tooltip: {
            // 显示节点详细信息
            formatter: (datum) => {
              const node = this.graphData.nodes.find(node => node.id === datum.source)
              return {
                name: node ? node.label : '',
                value: node ? node.description : ''
              }
            }
          }
        })
        this.linePlot.render()
      }
    },
    transformData (paths) {
      const nodes = []
      const edges = []
      const nodeMap = new Map()

      // 对路径按总距离进行排序
      paths.sort((a, b) => a.totalDistance - b.totalDistance)

      paths.forEach((path, index) => {
        path.nodeDetails.forEach((node, nodeIndex) => {
          if (!nodeMap.has(node.id)) {
            const graphNode = {
              id: node.id,
              label: node.name,
              description: node.additionalInfo,
              x: Math.random() * 10, // 随机位置，实际应用中可能需要更合理的布局算法
              y: Math.random() * 10,
              category: index
            }
            nodes.push(graphNode)
            nodeMap.set(node.id, graphNode)
          }
          // 添加边
          if (nodeIndex > 0) {
            const sourceNode = path.nodeDetails[nodeIndex - 1]
            const targetNode = node
            edges.push({
              source: sourceNode.id,
              target: targetNode.id,
              weight: path.totalDistance
            })
          }
        })
      })

      this.graphData = { nodes, edges }
      this.updateGraph()
    }

  }
}
</script>

<style lang="less" scoped>
.lineChartContainer{
  width: 100%;
  height: 400px;
}
</style>
