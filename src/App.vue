<template>
  <div id="app">
    <datepicker :range="range" :hiderestdate="hiderestdate" :disable="disable"/>
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
      range: {
        start_notice: '入住',
        end_notice: '离开',
      },
      hiderestdate: false,
      disable: {
        from: '2018-04-30',
        to: '2018-04-12'
      }
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
