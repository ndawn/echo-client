<template lang="pug">
.filter
    .filter-button(@click="toggleDropdown")
        span.selected-title {{ selectedFilter.title }}
        img.dropdown-icon(:src="dropdownIcon")
    .filter-dropdown(:style="{display: dropdownActive ? 'initial' : 'none'}")
        .filter-button(v-for="filter in filterOptions" :key="filter.devices" @click="selectFilter(filter)")
            span.filter-title {{ filter.title }}
</template>

<script>
import { mapState } from 'vuex';
import arrowDownIcon from '@/assets/img/mini/arrow_down_black.png';

export default {
    data () {
        return {
            dropdownActive: false,
            dropdownIcon: arrowDownIcon
        }
    },
    computed: mapState({
        selectedFilter: state => state.selectedFilter,
        filterOptions: state => state.filterOptions
    }),
    methods: {
        toggleDropdown () {
            this.dropdownActive = !this.dropdownActive;
        },
        selectFilter (filter) {
            this.$store.dispatch('selectFilter', filter);
            this.toggleDropdown();
        }
    }
}
</script>

<style lang="scss">
.filter {
    width: 100%;

    .filter-button {
        box-sizing: border-box;
        padding: 10px 24px;
        border-bottom: 1px solid #eee;
        cursor: pointer;

        .selected-title {
            font-weight: 600;
        }

        .dropdown-icon {
            float: right;
        }
    }

    .filter-dropdown {
        .filter-button {
            border-bottom: none;
            background: #e8e8e8;

            &:hover {
                background: #e2e2e2;
            }
        }
    }
}
</style>