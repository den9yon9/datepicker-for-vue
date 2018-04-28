<template>
  <div id="app">
    <datepicker :hiderestdate="hiderestdate" :disable="disable" v-model="value" @input="get" />
  </div>
</template>
<script>
import Datepicker from './components/Datepicker'

export default {
  name: 'App',
  components: {
    Datepicker
  },
  data() {
    return {
      start_notice: '入住',
      end_notice: '离开',
      value: ['2014-12-1', '2014-12-24'],
      hiderestdate: false,
      disable: {
        from: '2018-04-30',
        to: '2018-04-12'
      }
    }
  },
  methods: {
    get(value){
      console.log(value)
    }
  }
}

</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
