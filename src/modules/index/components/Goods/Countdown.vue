<template>
  <span :endTime="endTime" :startTime="startTime" :callback="callback" :endText="endText">
    <slot>
      <span class="endtime">
        <span>{{day}}</span>天<span style="margin-left: 5px">{{hour}}</span>：<span>{{min}}</span>：<span>{{sec}}</span>
      </span>
      <!--{{content}}-->
    </slot>
  </span>
</template>
<script>
  export default {
    name:'countdown',
    data(){
      return {
        content: '',
        day:0,
        hour:0,
        min:0,
        sec:0
      }
    },
    props:{
      endTime:{
        type: Number,
        default :0
      },
      startTime:{
        type: Number,
        default :0
      },
      endText:{
        type : String,
        default:'已结束'
      },
      callback : {
        type : Function,
        default :''
      }
    },
    created(){
      this.countdowm(this.endTime,this.startTime);
    },
    methods: {
      countdowm(timestamp,timestamp2){
        let self = this;
        let nowTime = new Date(timestamp2);
        let endTime = new Date(timestamp);
        let t = endTime.getTime() - nowTime.getTime();
        let timer = setInterval(function(){
          t=t-1000;
          if(t>0){
            let day = Math.floor(t/86400000);
            let hour=Math.floor((t/3600000)%24);
            let min=Math.floor((t/60000)%60);
            let sec=Math.floor((t/1000)%60);
            hour = hour < 10 ? "0" + hour : hour;
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;
            let format = '';
            if(day > 0){
//              format = `${day}天${hour}小时${min}分${sec}秒`;
              self.day = day;
              self.hour = hour;
              self.min = min;
              self.sec = sec;
            }
            if(day <= 0 && hour > 0 ){
//              format = `${hour}小时${min}分${sec}秒`;
              self.hour = hour;
              self.min = min;
              self.sec = sec;
            }
            if(day <= 0 && hour <= 0){
//              format =`${min}分${sec}秒`;
              self.min = min;
              self.sec = sec;
            }
            self.content = format;

          }else{
            clearInterval(timer);
//            self.content = self.endText;
            self._callback();
          }
        },1000);
      },
      _callback(){
        if(this.callback && this.callback instanceof Function){
          this.callback(...this);
        }
      }
    }
  }
</script>

<style scoped>
  .endtime span{
    display: inline-block;
    padding: 5px 3px;
    background: #000;
    color: #fff;
    margin: 0;
    border-radius: 2px;
    width: 25px;
    text-align: center;
  }
  .endtime span:first-child{
    margin:0 5px;
  }
  .endtime span:last-child{
    margin-right: 5px;
  }
</style>
