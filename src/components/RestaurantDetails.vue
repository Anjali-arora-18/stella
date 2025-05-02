<template>
  <div v-if="restDetails" class="res-details">
    <div class="res-details-card">
      <div @click="toggle" class="res-details-card-header">
        <div class="header-content">
          <p>Table <sub>1</sub></p>
          <h1>{{ restDetails.name }}</h1>
        </div>
        <span class="toggle-icon">
          <svg
            v-if="!isOpen"
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="black"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </span>
      </div>
      <div
        v-show="isOpen"
        class="res-details-card-body"
        :style="isOpen ? { maxHeight: '1000px' } : { maxHeight: '0' }"
      >
        <dl>
          <dt class="icon-text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8d8e90"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="6" x2="12" y2="12"></line>
              <line x1="12" y1="12" x2="16" y2="12"></line>
            </svg>
            <!-- <div v-if="restDetails.openingTimes.selected === 'byDay'" class="space-y-1">
              <div
                v-for="(time, day) in restDetails.openingTimes.byDay"
                :key="day"
                class="flex items-center gap-2"
              >
                <span class="capitalize w-24">{{ day }}</span>
                <span v-if="time.closed">Closed</span>
                <span v-else> {{ time.opens || '--:--' }} - {{ time.closes || '--:--' }} </span>
              </div>
            </div> -->
            <div v-if="restDetails.openingTimes.selected">
              {{ restDetails.openingTimes.selected }},
              {{ restDetails.openingTimes[restDetails.openingTimes.selected].opens }} -
              {{ restDetails.openingTimes[restDetails.openingTimes.selected].closes }}
            </div>
          </dt>
          <dt class="icon-text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8d8e90"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M12 2C8.134 2 5 5.134 5 9c0 4.428 7 12 7 12s7-7.572 7-12c0-3.866-3.134-7-7-7z"
              ></path>
              <circle cx="12" cy="9" r="3"></circle>
            </svg>
            {{ restDetails.address + ' , ' + restDetails.postcode }}
          </dt>
          <dt class="icon-text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8d8e90"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="6" y="2" width="12" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12" y2="18"></line>
            </svg>
            <a :href="`tel:${restDetails.phone}`" class="link">
              {{ restDetails.phone }}
            </a>
          </dt>
          <dt>
            <a
              :href="`${restDetails.website}`"
              class="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                class="icon-website"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18
              "
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8d8e90"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2v20M2 12h20M7 7c3-1.5 6-1.5 9 0"></path>
              </svg>
              {{ restDetails.website }}
            </a>
          </dt>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  props: ['restDetails'],
  setup() {
    const isOpen = ref(false)

    const toggle = () => {
      isOpen.value = !isOpen.value
    }

    return {
      isOpen,
      toggle,
    }
  },
}
</script>
<style scoped>
.res-details {
  background: #fff;
}

.res-details-card {
  display: flex;
  flex-direction: column;
}
.res-details-card-header {
  background: #fff;
  padding: 1em 1em;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 100%;
}

.res-details-card-header p:first-of-type {
  display: none;
  font-size: 1.2em;
  color: #deb447;
  font-weight: 500;
}

.res-details-card-header p:first-of-type sub {
  font-size: 1.5em;
  vertical-align: sub;
  font-weight: bold;
}

.res-details-card-header h1 {
  font-size: 1.7em;
  color: black;
  font-weight: 600;
  line-height: 1.2;
}

.toggle-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: self-end;
  margin-left: auto;
}

.res-details-card-body {
  padding: 1em;
  margin: 0 1em;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.4s ease-in-out;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
dt {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  font-weight: 500;
  color: #8d8e90;
}

dt svg {
  margin-right: 8px;
}
dt:nth-of-type(n + 3) {
  color: #deb447 !important;
  cursor: pointer;
}
dt .link {
  color: #deb447 !important;
  cursor: pointer;
  text-decoration: none;
}
</style>
