<template>
  <div id="app">
    <div>
      <h4>选择单个日期</h4>
      <code>&lt;datepicker :disable="disable" v-model="value" /&gt;</code>
      <pre>
      <code class="javascript">
        import Datepicker from 'datepicker-for-vue'
        export default {
            data(){
                return {
                    value: ['2018-04-05'],
                    disable: {
                        from: '2018-04-28',
                        to: '2018-04-01'
                    }
                }
            }
        }
      </code>
    </pre>
      <datepicker :disable="disable" v-model="value" />
    </div>
    <br>
    <br>
    <br>
    <div>
      <h4>选择两个日期</h4>
      <code>&lt;datepicker :disable="disable" v-model="range" /&gt;</code>
      <pre>
      <code class="javascript">
        import Datepicker from 'datepicker-for-vue'
        export default {
            data(){
                return {
                    range: ['2018-04-05', '2018-04-16'],
                    disable: {
                        from: '2018-04-28',
                        to: '2018-04-01'
                    },
                    start_notice: 'come', 
                    end_notice: 'go',
                }
            }
        }
      </code>
    </pre>
      <datepicker :disable="disable" v-model="range" :notice1="start_notice" :notice2="end_notice" />
    </div>
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
      start_notice: 'come',
      end_notice: 'go',
      range: ['2018-12-5', '2018-12-20'],
      value: ['2018-12-12'],
      disable: {
        to: '2018-12-1',
        from: '2018-12-24'
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
  color: #2c3e50;
  margin-top: 60px;
  height: 600px;
  display: flex;
  justify-content: space-around;
}

pre {
  text-align: left;
  background-color: #f1f1f1;
}

</style>
