<template>
<div id= "app">
    <div id = "main" v-bind:class="{flexColumn: isFlex}" v-bind:style="{backgroundColor: result }">
            <div id="gauche" v-bind:class="{opacity: isOpacityG, hover: isHover}" v-on:click="changeBackgroundImage(country1, country2, $event, 'gauche')"  
                                :style="{ backgroundImage: 'url(' + country1.path + ')' }">

                <h3 v-if="isHover">{{country1.name}} ({{country1.mountName}})</h3>
                <h1 v-if="isNotHover">{{country1.elevation}} meters</h1>
                <img v-bind:src=getFlagSVG(country1.code) alt="za" width="90px" height="60px">
            </div>
            <div id="droite" v-bind:class="{opacity: isOpacityR , hover: isHover}" v-on:click="changeBackgroundImage(country2, country1, $event, 'droite')"  
                                :style="{ backgroundImage: 'url(' + country2.path + ')' }">
                <h3 v-if="isHover">{{country2.name}} ({{country2.mountName}})</h3>
                <h1 v-if="isNotHover">{{country2.elevation}} meters</h1>
                <img v-bind:src=getFlagSVG(country2.code) alt="za" width="90px" height="60px">
            </div>
        </div>
        <div id="divButton" v-if="isNotHover" v-on:click="nextRound">
            <button id="button">{{button}}</button>
        </div>
        <div id="streak">
            <h4>
                current streak : {{streak}} <br>
                highest streak : {{highestStreak}}
            </h4>
        </div>
</div>
</template>
<script>
import listePays from "./listePays.json";

export default {
    data() {
        return {
            index : 0,
            randArray: [],
            countries : listePays,
            country1 : undefined,
            country2 : undefined,
            streak : 0,
            button: "Go next",
            highestStreak : 0,
            choiceMade : true,
            result:"",
            isHover: true,
            isOpacityG: false,
            isOpacityR: false,
            isNotHover: false,
            isFlex: false
        }
    },
    
    created: function() {
        this.initRandomArray()
        this.initCountry()
        window.addEventListener('resize', this.handleResize)
        this.handleResize()
    },

    methods: {
        changeBackgroundImage: function(countryClicked, otherCountry, event, side) {
            if(this.choiceMade){
                if (parseInt(countryClicked.elevation) > parseInt(otherCountry.elevation)){
                    this.result="green"
                    this.button = "Go next"
                    this.streak++
                    if(this.streak > this.highestStreak){
                        this.highestStreak = this.streak
                    }   
                }
                else {
                    this.streak = 0
                    this.button = "Restart"
                    this.result="red"
                }
                this.choiceMade=false
                if(side=="gauche"){
                    this.isOpacityG=true
                }
                else{
                    this.isOpacityR=true
                }
                this.toggleStatus()
            }

        },

        getRandomCountry: function() {
            var country = this.countries[this.randArray[this.index]]
            this.index++
            country.path = encodeURI("/images/img/" + country.name + ".jpg")
            return country
        },
        initRandomArray: function() {
            var i = 0
            console.log("yo")
            while(i < this.countries.length){
                var r = Math.floor(Math.random() * this.countries.length) + 1;
                if(this.randArray.indexOf(r) === -1) {
                    this.randArray.push(r);
                    i++
                }
            }
        },
        nextRound: function() {
            this.toggleStatus()
            this.isOpacityG=false
            this.isOpacityR=false
            this.result="rgba(0, 0, 0, 1)"
            this.choiceMade=true
            this.initCountry()
        },
        toggleStatus: function() {
            this.isHover=!this.isHover
            this.isNotHover=!this.isNotHover
        },
        initCountry: function() {
            this.country1 = this.getRandomCountry()
            this.country2 = this.getRandomCountry()
        },
        getFlagSVG: function(code) {
            if (code == undefined){
                code = "noFlag"
            }
            return `https://flagcdn.com/${code.toLowerCase()}.svg`
        },
        handleResize: function() {
            if (window.innerWidth/window.innerHeight < 1.35){
                this.isFlex=true
            }
            else {
                this.isFlex=false
            }
        }
    }
}
</script>
