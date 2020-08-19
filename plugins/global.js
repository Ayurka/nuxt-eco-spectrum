import Vue from 'vue';

import loader from "~/components/global/loader";
import currencyFilter from "@/plugins/filters/currency.filter";
import dateFilter from "@/plugins/filters/date.filter";
import declensionFilter from "@/plugins/filters/declension.filter";

Vue.component('Loader', loader);
Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);
Vue.filter('declension', declensionFilter);
