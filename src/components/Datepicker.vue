<style scoped>
.datepicker {
  position: relative;
  width: 250px;
  height: 40px;
  border: solid 1px #eee;
  align-items: center;
  justify-content: space-around;
  display: flex;
}

.calendar {
  position: absolute;
  top: 100%;
  left: 0;
  font-size: 18px;
  width: 280px;
  box-shadow: 0 0 4px #00000055;
  transform: translateY(10px);
}

.year-month {
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  color: #666;
  height: 40px;
  align-items: center;
}

.next-month {
  transform: rotate(90deg);
  margin-left: 20px;
  cursor: pointer;
}

.pre-month {
  transform: rotate(-90deg);
  margin-right: 20px;
  cursor: pointer;
}

.year-month img {
  width: 20px;
}


.days {
  box-sizing: border-box;
  border-bottom: solid 1px #f1f1f1;
  display: flex;
}

.day {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
}

.dates {
  display: flex;
  flex-wrap: wrap;
}

.date {
  width: 40px;
  height: 40px;
  color: #666;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
  box-sizing: border-box;
}




/*隐藏属于上月与下月的格子*/

.hide {
  pointer-events: none;
  opacity: 0
}

.pre,
.next {
  color: #ccc;
}


.disable {
  background-color: #f8f8f8;
  color: #ccc;
  cursor: not-allowed;
}

.belong {
  color: #585fee;
  background-color: #f0f6ff;
  transition: all 0.3s;
}

.active {
  background-color: #585fee;
  color: #fff;
  border-radius: 0.1rem;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.notice {
  font-size: 12px;
}


.belong.pre,
.belong.next {
  color: #deefff;
}

.active.pre,
.active.next {
  color: #fff;
}

.disable.active,
.disable.belong {
  color: #aaa;
}

.slide-enter {
  transform: translateY(0px);
  transition: all 0.15s;
  opacity: 0;
}

.slide-enter-active,
.slide-leave {
  transition: all 0.15s
}

.slide-leave-active {
  transform: translateY(0px);
  opacity: 0;
  transition: all 0.15s
}

</style>
<template>
  <div class="datepicker" @click.stop="show=!show">
    <span>{{format(startdate)}}</span>
    <span v-if="value[1]!==undefined">~</span>
    <span v-if="value[1]!==undefined">{{format(enddate)}}</span>
    <transition name="slide">
      <div class="calendar" v-show="show" @click.stop>
        <div class="year-month">
          <a class="pre-month" @click="getPreMonth"><img src="../assets/arrow.png"></a>
          <div class="year">{{year}}年</div>
          <div class="month">{{month}}月</div>
          <a class="next-month" @click="getNextMonth"><img src="../assets/arrow.png"></a>
        </div>
        <div class="days-dates">
          <div class="days">
            <div class="day" v-for="day of days">{{day}}</div>
          </div>
          <div class="dates">
            <div class="date" v-for="date of dates" :class="getDateClass(date)" @click="getDate(date)">
              <span>{{date.date}}</span>
              <div class="notice" v-if="format(date.fullDate)==format(startdate)&&value[1]!==undefined">{{start_notice||'开始'}}</div>
              <div class="notice" v-if="format(date.fullDate)==format(enddate)&&value[1]!==undefined">{{end_notice||'结束'}}</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { timeFormat } from '../utils.js'
export default {
  props: {
    // 是否隐藏其他月份的日子
    hiderestdate: {
      default: false
    },
    // 双选模式
    value: {
      type: Array
    },
    // 禁用日期范围
    disable: {
      type: Object
    },
    start_notice: {
      type: String
    },
    end_notice: {
      type: String
    }
  },
  data() {
    return {
      days: ['日', '一', '二', '三', '四', '五', '六'],
      months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      year: 0,
      month: 0,
      date: 0,
      startdate: '',
      enddate: '',
      cnt: 0,
      show: false
    }
  },

  mounted() {
    window.addEventListener('click', e => {
      if (this.show) {
        this.show = false
      }
    })

    if (this.value[0] !== undefined) {
      this.startdate = new Date(this.value[0]) || ''
    }

    if (this.value[1] !== undefined) {
      this.enddate = new Date(this.value[1]) || ''
    }


    this.year = this.startdate.getFullYear()
    this.month = this.startdate.getMonth() + 1
    this.date = this.startdate.getDate()
  },

  methods: {
    format(date) {
      return timeFormat(date)
    },
    // 判断是否是闰年
    isLeapYear: year => year % 4 == 0 || year % 100 == 0 && year % 400 == 0,

    // 获取当月天数
    getMonthLen(year, month) {
      return [2, 4, 6, 9, 11].indexOf(month) == -1 ? 31 : month == 2 ? this.isLeapYear(year) ? 29 : 28 : 30
    },

    // 当月从周几开始
    getStartDay: (year, month) => new Date([year, month, 1].join('-')).getDay(),

    // 获取方格中所有日子
    getDates(year, month) {
      // 获取本月日子
      let len = this.getMonthLen(year, month)
      let dates = Array.from(new Array(len), (v, i) => ({ date: i + 1, month: 'current' }))

      // 这个月从周几开始
      let startday = this.getStartDay(year, month)
      // 上个月天数
      let preMonthLen = this.getMonthLen(year, month - 1 || 12)

      //  获取方格中上个月的日子置于方格头部
      while (startday--) {
        dates.unshift({ date: preMonthLen--, month: 'pre' })
      }

      // 获取方格中下个月的日子置于方格尾部
      let restDates = Array.from(new Array(42 - dates.length), (v, i) => ({ date: i + 1, month: 'next' }))
      dates = [...dates, ...restDates]
      this.genDateInfo(dates)
      // 返回方格中所有日子
      return dates
    },

    // 生成每个格子里的完整日期和禁用信息
    genDateInfo(dates) {
      dates.forEach(n => {
        let year = this.year
        let month = this.month
        if (n.month == 'pre') {
          month = this.month - 1 || 12
          if (month == 12) {
            year = this.year - 1
          }
        } else if (n.month == 'next') {
          month = this.month == 12 ? 1 : this.month + 1
          if (month == 1) {
            year = this.year + 1
          }
        }
        n.fullDate = new Date([year, month, n.date].join('-'))

        // 生成禁用信息，判断日子是否被禁用（选中）
        if (this.disable) {
          n.disable = n.fullDate < new Date(this.disable.to) || n.fullDate > new Date(this.disable.from)
        } else {
          n.disable = false
        }
      })
    },

    // 点击单个格子设置日期
    getDate(date) {
      if (date.disable) return;

      // 离店日期与入住日期不能在同一天
      if (timeFormat(date.fullDate) == timeFormat(this.startdate)) return;
      this.date = date.date
      if (date.month == 'pre') {
        if (this.month == 1) {
          this.month = 12
          this.year--
        } else {
          this.month--
        }
      } else if (date.month == 'next') {
        if (this.month == 12) {
          this.month = 1
          this.year++
        } else {
          this.month++
        }
      }
      this.cnt++;
      this.setDate()
    },
    // 单选双选模式逻辑
    setDate() {
      if (this.value[1]===undefined) {
        this.startdate = new Date([this.year, this.month, this.date].join('-'))
        this.$emit('input', [this.startdate])
        this.show = false
      } else {
        if (!(this.cnt % 2)) {
          // 用户选择两个时间点，根据两个时间点的早晚决定那一天是开始哪一天是结束
          let temp = new Date([this.year, this.month, this.date].join('-'))
          if (temp > this.startdate) {
            this.enddate = temp
          } else {
            this.enddate = this.startdate
            this.startdate = temp
          }
          this.show = false
        } else {
          this.enddate = ''
          this.startdate = new Date([this.year, this.month, this.date].join('-'))
        }
        this.$emit('input', [this.startdate, this.enddate])
      }
    },

    // 获取日期格子的样式
    getDateClass(date) {
      return [
        date.month,
        { active: this.hasActiveClass(date) },
        { hide: this.hasHideClass(date) },
        { disable: date.disable },
        { belong: this.hasBelongClass(date) }
      ]
    },


    // 判断格子中的日子是否被选中了以应用选中的样式
    hasActiveClass(date) {
      let fullDate = timeFormat(date.fullDate)
      let startdate = timeFormat(this.startdate)
      let enddate = timeFormat(this.enddate)
      if (this.value[1]) {
        return fullDate == enddate || fullDate == startdate
      } else {
        return fullDate == startdate
      }
    },

    // 判断格子是否在被选中的日子之间
    hasBelongClass(date) {
      return this.value[1] ? date.fullDate.getTime() > (this.startdate && this.startdate.getTime()) && (date.fullDate.getTime() < this.enddate && this.enddate.getTime()) : false
    },

    // 是否隐藏不属于本月的日子
    hasHideClass(date) {
      return date.month != 'current' && this.hiderestdate
    },

    // 向上翻月
    getPreMonth() {
      this.month = this.month - 1 || 12
      if (this.month == 12) {
        this.year--
      }
    },

    // 向下翻月
    getNextMonth() {
      this.month = this.month == 12 ? 1 : this.month + 1
      if (this.month == 1) {
        this.year++
      }
    }
  },

  computed: {
    dates() {
      return this.getDates(this.year, this.month)
    }
  }
}

</script>
