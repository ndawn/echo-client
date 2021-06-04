import Vue from 'vue'
import Vuex from 'vuex'
import config from '@/config'
import configMapping from '@/utils/configMapping'

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am4plugins_forceDirected from '@amcharts/amcharts4/plugins/forceDirected';
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: true,

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
    agents: [],
    subnets: [],
    user: null,
    activeDevice: null,
    terminalWindowState: {
      active: false,
      device: null,
      method: null,
      socket: null,
      username: null,
      password: null,
      agentAddress: null,
      sid: null
    },

    activeModalComponent: null,

    chart: null,
    chartSeries: null,

    graphConfig: {
      zoomable: true,

      series: [{
        dataFields: {
          id: 'id',
          name: 'name',
          value: 'value',
          linkWith: 'connected_with',
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
            text: '{address}',
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
    setLoading (state, payload) {
      state.isLoading = payload;
    },
    setDevices (state, devices) {
      state.devices = devices.map(device => configMapping.injectMapping(device));
    },
    setAgents (state, agents) {
      state.agents = agents;
    },
    addAgents (state, agents) {
      state.agents.push(...agents);
    },
    setSubnets (state, subnets) {
      state.subnets = subnets;
    },
    addSubnets (state, subnets) {
      state.subnets.push(...subnets);
    },
    setUser (state, payload) {
      state.user = payload;
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
    },
    setActiveModalComponent (state, payload) {
      state.activeModalComponent = payload;
    }
  },

  actions: {
    setLoading ({commit}, payload) {
      commit('setLoading', payload);
    },
    setDevices ({commit}, devices) {
      return new Promise((resolve, reject) => {
        resolve(commit('setDevices', devices));
      });
    },
    setAgents ({commit}, agents) {
      return new Promise((resolve, reject) => {
        resolve(commit('setAgents', agents));
      });
    },
    addAgents ({commit}, agents) {
      return new Promise((resolve, reject) => {
        resolve(commit('addAgents', agents));
      });
    },
    setSubnets ({commit}, subnets) {
      return new Promise((resolve, reject) => {
        resolve(commit('setSubnets', subnets));
      });
    },
    addSubnets ({commit}, subnets) {
      return new Promise((resolve, reject) => {
        resolve(commit('addSubnets', subnets));
      });
    },
    getUser ({commit}) {
      axios.get('/api/account/', {headers: {Authorization: `Bearer ${localStorage.token}`}}).then(response => {
        commit('setUser', response.data);
      }).catch(error => {
        if (error.response.status === 401 || (error.response.status === 422 && error.response.data.detail === 'Signature has expired')) {
          delete localStorage.token;
          this.$router.push('/login');
        }
      })
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
    },
    setChartData ({commit}, payload) {
      commit('setChartData', payload);
    },
    updateTerminalWindowState ({commit}, payload) {
      commit('updateTerminalWindowState', payload);
    },
    setActiveModalComponent ({commit}, payload) {
      commit('setActiveModalComponent', payload);
    },
    connectToDevice ({commit}, {sid}) {
      commit('setCredentialsActive', false);
      commit('updateTerminalWindowState', {active: true, sid, username: null, password: null});
    }
  },

  getters: {
    graphData (state) {
      if (state.chartSeries === null) {
        return [];
      }

      return state.devices.map(node => ({
        id: node.id,
        address: node.address,
        connected_with: node.connected_with,
        icon: node.type.icon.white
      }))
    },
    selectedFilter (state) {
      return state.selectedFilter;
    },
    filteredDevices (state) {
      return state.devices.filter(device => (state.selectedFilter.deviceType === 'all' || device.type.name === state.selectedFilter.deviceType));
    },
    listSubnets (state, getters) {
      return state.subnets.map(subnet => ({...subnet, devices: getters.filteredDevices.filter(device => device.subnet.pk === subnet.pk)}));
    },
    freeSubnets (state) {
      return state.subnets.filter(subnet => state.agents.filter(agent => agent.subnet.pk === subnet.pk).length === 0);
    },
    listData (state, getters) {
      return {
        devices: getters.filteredDevices,
        subnets: getters.listSubnets
      }
    }
  }
})
