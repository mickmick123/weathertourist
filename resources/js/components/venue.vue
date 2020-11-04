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

                <!-- .main-navigation -->

                <div class="mobile-navigation"></div>
            </div>
        </div>
        <!-- .site-header -->

        <main class="main-content">
            <div class="container">
                <div class="breadcrumb">
                    <a href="index.html">Home</a>
                    <span>Venue</span>
                </div>
            </div>

            <div class="fullwidth-block">
                <div class="container">
                    <div class="row">
                        <div class="content col-md-8">
                            <div class="post">
                                <h2 class="entry-title">
                                    {{ venue.name }}
                                </h2>
                                <div class="featured-image">
                                    <img
                                        :src="
                                            venue.bestPhoto.prefix +
                                                '500x500' +
                                                venue.bestPhoto.suffix
                                        "
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="sidebar col-md-3 col-md-offset-1">
                            <div class="widget">
                                <h3 class="widget-title">Information</h3>
                                <ul class="arrow-list">
                                    <p>
                                        Address:
                                    </p>
                                    <li>
                                        {{
                                            venue.location.address +
                                                " " +
                                                venue.location.city +
                                                " " +
                                                venue.location.country
                                        }}
                                    </li>

                                    <hr />
                                    <div
                                        v-if="
                                            venue.contact.formattedPhone != null
                                        "
                                    >
                                        <p>
                                            Contact Number:
                                        </p>
                                        <li>
                                            <span>{{
                                                venue.contact.formattedPhone
                                            }}</span>
                                        </li>
                                        <hr />
                                    </div>
                                    <div
                                        v-if="
                                            venue.contact.facebookName != null
                                        "
                                    >
                                        <p>
                                            Facebook Link:
                                        </p>
                                        <li>
                                            <a
                                                :href="
                                                    'https://facebook.com/' +
                                                        venue.contact.facebook
                                                "
                                                >{{
                                                    venue.contact.facebookName
                                                }}</a
                                            >
                                        </li>
                                        <hr />
                                    </div>
                                    <div v-if="venue.rating != null">
                                        <p>
                                            Ratings:
                                        </p>
                                        <li>
                                            <span>{{ venue.rating }}</span>
                                        </li>
                                        <hr />
                                    </div>
                                    <div v-if="venue.likes.count != null">
                                        <p>
                                            Likes:
                                        </p>
                                        <li>
                                            <span>{{ venue.likes.count }}</span>
                                        </li>

                                        <hr />
                                    </div>
                                    <div v-if="venue.url != null">
                                        <p>
                                            Visit Us:
                                        </p>
                                        <li>
                                            <a :href="venue.url">{{
                                                venue.name
                                            }}</a>
                                        </li>
                                    </div>
                                </ul>
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
    name: "Venue",
    data() {
        return {
            client_id: "OAJJTHJITEH3UCX1DVMNWS24LZ0IQHC3HTL0AAOF3L3RIUGV",
            client_secret: "4OZIUE5HT0OS5BFS1E0V4VG2TSVZHBFKRDFKPXDHXRKEQY3J",
            cities: [
                { country: "Japan", city: "Tokyo" },
                { country: "Japan", city: "Yokohama" },
                { country: "Japan", city: "Kyoto" },
                { country: "Japan", city: "Osaka" },
                { country: "Japan", city: "Sapporo" },
                { country: "Japan", city: "Nagoya" }
            ],
            venue: []
        };
    },
    mounted() {
        this.fetchVenue();
    },
    methods: {
        fetchVenue() {
            fetch(
                `https://api.foursquare.com/v2/venues/${this.id}?client_id=${this.client_id}&client_secret=${this.client_secret}&v=20201104`
            )
                .then(response => response.json())
                .then(data => {
                    this.venue = data.response.venue;
                });
        }
    },
    props: {
        city: {
            type: String,
            default: null
        },
        country: {
            type: String,
            default: null
        },
        id: {
            type: String,
            default: null
        }
    }
};
</script>
