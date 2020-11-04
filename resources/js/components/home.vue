<template>
    <div class="site-content">
        <div class="site-header">
            <div class="container">
                <router-link
                    :to="{
                        path: `/`
                    }"
                    class="branding"
                >
                    <img
                        src="/images/first_img.png"
                        alt=""
                        class="logo"
                        height="60"
                    />
                    <div class="logo-type">
                        <h1 class="site-title">TouristBoom</h1>
                        <small class="site-description">Travel to Japan</small>
                    </div>
                </router-link>

                <!-- Default snippet for navigation -->
                <div class="main-navigation">
                    <button type="button" class="menu-toggle">
                        <i class="fa fa-bars"></i>
                    </button>
                    <ul class="menu">
                        <li
                            v-for="item in cities"
                            :key="item.city"
                            :class="
                                item.city == city.city
                                    ? 'menu-item current-menu-item'
                                    : 'menu-item'
                            "
                        >
                            <a v-on:click="setCity(item.country, item.city)">{{
                                item.city
                            }}</a>
                        </li>
                    </ul>
                    <!-- .menu -->
                </div>
                <!-- .main-navigation -->

                <div class="mobile-navigation"></div>
            </div>
        </div>
        <!-- .site-header -->

        <div class="hero">
            <div class="container">
                <form action="#" class="find-location">
                    <input type="text" placeholder="Find your location..." />
                    <input type="submit" value="Find" />
                </form>
            </div>
        </div>
        <div class="forecast-table">
            <div class="container">
                <div class="forecast-container">
                    <div class="today forecast">
                        <div class="forecast-header">
                            <div class="day">{{ toDayOfWeek(new Date()) }}</div>
                            <div class="date">{{ formatDate(new Date()) }}</div>
                        </div>
                        <!-- .forecast-header -->
                        <div class="forecast-content">
                            <div class="location">{{ city.city }}</div>
                            <div class="degree">
                                <div class="num">
                                    {{ Math.round(today.main.temp)
                                    }}<sup>o</sup>C
                                </div>
                                <div class="forecast-icon">
                                    <img
                                        id="wicon"
                                        :src="
                                            'http://openweathermap.org/img/wn/' +
                                                today.weather[0].icon +
                                                '@2x.png'
                                        "
                                        width="90"
                                        alt="Weather icon"
                                    />
                                </div>
                            </div>
                            <span>{{
                                today.weather[0].description.toUpperCase()
                            }}</span>
                            <span
                                ><img src="images/icon-wind.png" alt="" />{{
                                    today.wind.speed
                                }}km/h</span
                            >
                            <span
                                ><img src="images/icon-compass.png" alt="" />{{
                                    getCardinal(today.wind.degree)
                                }}</span
                            >
                            <span
                                v-for="(days, index) in currentDay"
                                :key="days.dt"
                                class="time-block"
                            >
                                {{ formatTime(currentDay[index].dt_txt) }}
                                <img
                                    id="small-icons"
                                    :src="
                                        'http://openweathermap.org/img/wn/' +
                                            currentDay[index].weather[0].icon +
                                            '.png'
                                    "
                                    height="30px"
                                    alt="Weather icon"
                                />
                                <span
                                    >{{ Math.round(currentDay[index].main.temp)
                                    }}<sup>o</sup>C</span
                                >
                            </span>
                        </div>
                    </div>

                    <div
                        class="forecast full-screen"
                        v-for="index in 4"
                        :key="index"
                    >
                        <div class="forecast-header">
                            <div class="day">
                                {{
                                    toDayOfWeek(filteredDays[index * 7].dt_txt)
                                }}
                            </div>
                        </div>
                        <!-- .forecast-header -->
                        <div class="forecast-content">
                            <div v-for="index2 in 8" :key="index2">
                                <div
                                    class="time"
                                    v-if="
                                        (index - 1) * 8 + index2 <=
                                            filteredDays.length - 1
                                    "
                                >
                                    <span>
                                        {{
                                            formatTime(
                                                filteredDays[
                                                    (index - 1) * 8 + index2 - 1
                                                ].dt_txt
                                            )
                                        }}
                                    </span>
                                    <div class="inner-container">
                                        <img
                                            id="small-icons"
                                            :src="
                                                'http://openweathermap.org/img/wn/' +
                                                    filteredDays[
                                                        (index - 1) * 8 +
                                                            index2 -
                                                            1
                                                    ].weather[0].icon +
                                                    '.png'
                                            "
                                            height="30px"
                                            alt="Weather icon"
                                        />
                                        <span
                                            >{{
                                                Math.round(
                                                    filteredDays[
                                                        (index - 1) * 8 +
                                                            index2 -
                                                            1
                                                    ].main.temp
                                                )
                                            }}<sup>o</sup>C</span
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <main class="main-content" v-if="stations.length > 0">
            <div class="fullwidth-block">
                <div class="container">
                    <h2 class="section-title">Travel Stations</h2>
                    <div class="row">
                        <div
                            class="col-md-3 col-sm-6"
                            v-for="(items, index) in stations"
                            :key="index"
                        >
                            <div class="live-camera">
                                <h3 class="location">
                                    <router-link
                                        :to="{
                                            path: `/venue`,
                                            query: {
                                                country: city.country,
                                                city: city.city,
                                                id: items.id
                                            }
                                        }"
                                    >
                                        <u>{{ items.name }}</u>
                                    </router-link>
                                </h3>
                                <small class="date">
                                    <span
                                        v-for="(address, index2) in items
                                            .location.formattedAddress"
                                        :key="index2"
                                        >{{ address }}</span
                                    ></small
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="fullwidth-block" v-if="visited.length > 0">
                <div class="container">
                    <h2 class="section-title">Recommended Places</h2>
                    <div class="row">
                        <div
                            class="col-md-3 col-sm-6"
                            v-for="(items, index) in visited"
                            :key="index"
                        >
                            <div class="live-camera">
                                <h3 class="location">
                                    <router-link
                                        :to="{
                                            path: `/venue`,
                                            query: {
                                                country: city.country,
                                                city: city.city,
                                                id: items.venue.id
                                            }
                                        }"
                                    >
                                        <u>{{ items.venue.name }}</u>
                                    </router-link>
                                </h3>
                                <small class="date">
                                    <span
                                        >{{
                                            items.venue.location.address +
                                                " " +
                                                items.venue.location.crossStreet
                                        }}
                                    </span></small
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <!-- .main-content -->

        <footer class="site-footer">
            <div class="container">
                <div class="row">
                    <div class="col-md-8">
                        <form action="#" class="subscribe-form">
                            <input
                                type="text"
                                placeholder="Enter your email to subscribe..."
                            />
                            <input type="submit" value="Subscribe" />
                        </form>
                    </div>
                    <div class="col-md-3 col-md-offset-1">
                        <div class="social-links"></div>
                    </div>
                </div>

                <p class="colophon">
                    Copyright here
                </p>
            </div>
        </footer>
        <!-- .site-footer -->
    </div>
</template>

<script>
import moment from "moment";
export default {
    name: "Home",
    watch: {
        city: {
            handler(newValue, oldValue) {
                this.fetchData(newValue);
                this.fetchStations(newValue);
                this.fetchVisited(newValue);
            },
            deep: true
        }
    },
    computed: {
        filteredDays() {
            return this.convertedDays.filter(item => {
                return new Date(item.dt_txt).getDate() != new Date().getDate();
            });
        },
        currentDay() {
            return this.convertedDays.filter(item => {
                return new Date(item.dt_txt).getDate() == new Date().getDate();
            });
        }
    },

    data() {
        return {
            today: null,
            city: { country: null, city: null },
            convertedDays: [],
            stations: [],
            visited: [],
            cities: [
                { country: "Japan", city: "Tokyo" },
                { country: "Japan", city: "Yokohama" },
                { country: "Japan", city: "Kyoto" },
                { country: "Japan", city: "Osaka" },
                { country: "Japan", city: "Sapporo" },
                { country: "Japan", city: "Nagoya" }
            ],
            client_id: "OAJJTHJITEH3UCX1DVMNWS24LZ0IQHC3HTL0AAOF3L3RIUGV",
            client_secret: "4OZIUE5HT0OS5BFS1E0V4VG2TSVZHBFKRDFKPXDHXRKEQY3J"
        };
    },
    created() {
        this.city.city = "Tokyo";
        this.city.country = "Japan";
    },

    methods: {
        fetchData(val) {
            fetch(
                `http://api.openweathermap.org/data/2.5/forecast?q=${val.country},${val.city}&units=metric&appid=d7f8dfde050b52deaa999942bdb52b15`
            )
                .then(response => response.json())
                .then(data => {
                    this.convertedDays = data.list.map(function(arr) {
                        return arr;
                    });
                    this.today = this.findNearestTime(this.convertedDays);
                });
        },
        fetchStations(val) {
            fetch(
                `https://api.foursquare.com/v2/venues/trending?client_id=${this.client_id}&client_secret=${this.client_secret}&v=20201104&near=${val.city}&limit=8&radius=10000`
            )
                .then(response => response.json())
                .then(data => {
                    this.stations = data.response.venues.map(function(arr) {
                        return arr;
                    });
                });
        },
        fetchVisited(val) {
            fetch(
                `https://api.foursquare.com/v2/venues/explore?client_id=${this.client_id}&client_secret=${this.client_secret}&v=20201104&near=${val.city}&limit=8`
            )
                .then(response => response.json())
                .then(data => {
                    this.visited = data.response.groups[0].items.map(function(
                        arr
                    ) {
                        return arr;
                    });
                });
        },
        toKebabCase(stringToConvert) {
            return stringToConvert.split(" ").join("-");
        },
        toDayOfWeek(timestamp) {
            const newDate = new Date(timestamp);
            const days = [
                "Sunday",
                "Monday",
                "Tueday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ];
            return days[newDate.getDay()];
        },
        formatDate(timestamp) {
            return moment(String(timestamp)).format("ll");
        },
        formatTime(timestamp) {
            return moment(String(timestamp)).format("h:mm:ss a");
        },
        getCardinal(angle) {
            const degreePerDirection = 360 / 8;

            const offsetAngle = angle + degreePerDirection / 2;

            return offsetAngle >= 0 * degreePerDirection &&
                offsetAngle < 1 * degreePerDirection
                ? "N"
                : offsetAngle >= 1 * degreePerDirection &&
                  offsetAngle < 2 * degreePerDirection
                ? "NE"
                : offsetAngle >= 2 * degreePerDirection &&
                  offsetAngle < 3 * degreePerDirection
                ? "E"
                : offsetAngle >= 3 * degreePerDirection &&
                  offsetAngle < 4 * degreePerDirection
                ? "SE"
                : offsetAngle >= 4 * degreePerDirection &&
                  offsetAngle < 5 * degreePerDirection
                ? "S"
                : offsetAngle >= 5 * degreePerDirection &&
                  offsetAngle < 6 * degreePerDirection
                ? "SW"
                : offsetAngle >= 6 * degreePerDirection &&
                  offsetAngle < 7 * degreePerDirection
                ? "W"
                : "NW";
        },
        findNearestTime(times) {
            let currentTime = Date.now();

            let diff = times.map(time => {
                return Math.abs(currentTime - Date.parse(time.dt_txt));
            });

            let i = diff.indexOf(Math.min(...diff));
            return times[i];
        },
        setCity: function(country, city) {
            this.city.city = city;
            this.city.country = country;
        }
    }
};
</script>
