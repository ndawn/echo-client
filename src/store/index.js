import Vue from 'vue'
import Vuex from 'vuex'
import config from '@/config'
import configMapping from '@/utils/configMapping'

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am4plugins_forceDirected from '@amcharts/amcharts4/plugins/forceDirected';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedFilter: {
      title: 'Все устройства',
      deviceType: 'all'
    },
    filterOptions: [
        {
            title: 'Все устройства',
            deviceType: 'all'
        },
        ...config.types.map(type => ({
          title: type.verboseNamePlural,
          deviceType: type.name
        }))
    ],

    devices: [],
    activeDevice: null,
    terminalWindowState: {
      active: false,
      device: null,
      method: null,
      socket: null
    },

    chart: null,
    chartSeries: null,

    graphConfig: {
      zoomable: true,

      series: [{
        dataFields: {
          id: 'id',
          name: 'name',
          value: 'value',
          linkWith: 'connectedTo',
          children: 'children',
          href: 'icon',
        },

        minRadius: 16,
        fontSize: 11,
        manyBodyStrength: -50,

        colors: {
          list: ['#3183e6'],
          reuse: true
        },

        nodes: {
          label: {
            text: '{name}',
            verticalCenter: 'top',
            dy: 12,
            fill: '#000'
          }
        },

        links: {
          distance: 1,
          strength: 1,
          strokeWidth: 3
        }
      }]
    }
  },

  mutations: {
    setDevices (state, devices) {
      state.devices = devices.map(device => configMapping.injectMapping(device));
    },
    setActiveDevice (state, deviceId) {
      state.activeDevice = deviceId;
    },
    setSelectedFilter (state, filter) {
      state.selectedFilter = filter;
    },
    setChart (state, payload) {
      state.chart = payload;
    },
    setChartSeries (state, payload) {
      state.chartSeries = payload;
    },
    setChartData (state, payload) {
      state.chartSeries.data = payload;
    },
    updateTerminalWindowState (state, payload) {
      state.terminalWindowState = {
        ...state.terminalWindowState,
        ...payload
      };
    }
  },

  actions: {
    setDevices ({commit}, devices) {
      commit('setDevices', devices);
    },
    setActiveDevice ({commit}, deviceId) {
      commit('setActiveDevice', deviceId);
    },
    selectFilter ({commit}, filter) {
      commit('setSelectedFilter', filter);
    },
    createChart ({commit, dispatch, state}, element) {
      am4core.useTheme(am4themes_animated);

      const chart = am4core.createFromConfig(state.graphConfig, element, am4plugins_forceDirected.ForceDirectedTree);
      const chartSeries = chart.series.values[0]
      commit('setChart', chart);
      commit('setChartSeries', chartSeries);

      const image = chartSeries.nodes.template.createChild(am4core.Image);

      image.propertyFields.href = 'icon';
      image.verticalCenter = 'middle';
      image.horizontalCenter = 'middle';
      image.width = 20;
      image.height = 20;

      chartSeries.data = state.graphData;

      chartSeries.nodes.template.events.on('hit', (event) => {
        chart.zoomToDataItem(event.target.dataItem, 6, true);
        dispatch('setActiveDevice', event.target.dataItem.id);
      });

      chartSeries.nodes.template.events.on('dragstart', (event) => {
        chart.zoomable = false;
      });

      chartSeries.nodes.template.events.on('dragstop', (event) => {
        chart.zoomable = true;
      });

      chartSeries.events.on('inited', (event) => {
        event.target.animate({
          property: 'velocityDecay',
          to: 0.8
        }, 2000);
      });
    },
    setChartData ({commit}, payload) {
      commit('setChartData', payload);
    },
    updateTerminalWindowState ({commit}, payload) {
      commit('updateTerminalWindowState', payload);
    },
    connectToDevice ({commit}, {device, method}) {
      commit('updateTerminalWindowState', {active: true, device, method});
    }
  },

  getters: {
    graphData (state) {
      if (state.chartSeries === null) {
        return [];
      }

      return state.devices.map(node => ({
        id: node.id,
        name: node.name,
        connectedTo: node.connectedTo,
        icon: node.type.icon.white
      }))
    },
    selectedFilter (state) {
      return state.selectedFilter;
    },
    filteredDevices (state) {
      return state.devices.filter(device => (state.selectedFilter.deviceType === 'all' || device.type.name === state.selectedFilter.deviceType));
    }
  }
})
