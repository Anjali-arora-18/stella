<template>
  <div v-if="restDetails" class="res-details">
    <div class="res-details-card">
      <div
        @click="toggle"
        class="res-details-card-header"
        :style="{
          backgroundColor: restDetails.backgroundColor || '#fff',
          borderBottom: `1px solid ${restDetails.textColor || '#000'}`,
        }"
      >
        <div class="header-content">
          <p>Table <sub>1</sub></p>
          <div class="name-toggle-wrapper">
            <h1 :style="{ color: restDetails.textColor || '#000' }">{{ restDetails.name }}</h1>
            <span class="toggle-icon" :style="{ color: restDetails.textColor || '#000' }">
              <svg
                v-if="!isOpen"
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="30"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="18 15 12 9 6 15"></polyline>
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div
        v-show="isOpen"
        class="res-details-card-body"
        :style="{
          maxHeight: isOpen ? '1000px' : '0',
          backgroundColor: restDetails.backgroundColor || '#fff',
        }"
      >
        <dl>
          <dt class="icon-text" :style="{ color: restDetails.textColor || '#000' }">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              :stroke="restDetails.primaryColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="6" x2="12" y2="12"></line>
              <line x1="12" y1="12" x2="16" y2="12"></line>
            </svg>
            <div v-if="restDetails.openingTimes" style="text-align: start">
              <div
                v-for="line in formatOpeningHours(restDetails.openingTimes).split('\n')"
                :key="line"
              >
                {{ line.split(' - ').slice(0, -2).join(' - ') }}
                <span style="font-weight: bold">{{ line.split(' - ').slice(-2).join(' - ') }}</span>
              </div>
            </div>
          </dt>
          <dt class="icon-text" :style="{ color: restDetails.textColor || '#000' }">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              :stroke="restDetails.primaryColor || '#000'"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M12 2C8.134 2 5 5.134 5 9c0 4.428 7 12 7 12s7-7.572 7-12c0-3.866-3.134-7-7-7z"
              ></path>
              <circle cx="12" cy="9" r="3"></circle>
            </svg>
            {{ address }}
          </dt>
          <dt class="icon-text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              :stroke="restDetails.primaryColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="6" y="2" width="12" height="20" rx="2" ry="2"></rect>
              <line x1="12" y1="18" x2="12" y2="18"></line>
            </svg>
            <a
              :href="`tel:${restDetails.phone}`"
              class="link"
              :style="{ color: restDetails.textColor }"
            >
              {{ restDetails.phone }}
            </a>
          </dt>
          <dt>
            <a
              v-if="restDetails.email"
              :href="`mailto:${restDetails.email}`"
              class="link"
              target="_blank"
              rel="noopener noreferrer"
              :style="{ color: restDetails.primaryColor }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="18"
                :fill="restDetails.primaryColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M2 4a2 2 0 012-2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm2 0v.01L12 13 20 4.01V4H4zm16 2.2L12 15 4 6.2V20h16V6.2z"
                />
              </svg>
              {{ restDetails.email }}
            </a>
          </dt>
          <dt>
            <a
              v-if="restDetails.website"
              :href="restDetails.website"
              class="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="blue"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path
                  d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
                ></path>
              </svg>
            </a>

            <a
              v-if="restDetails.tripadvisor"
              :href="restDetails.tripadvisor"
              class="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1333.31 1333.31"
                width="26"
                height="26"
                shape-rendering="geometricPrecision"
                text-rendering="geometricPrecision"
                image-rendering="optimizeQuality"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
                <g fill-rule="nonzero">
                  <circle cx="666.66" cy="666.66" r="666.66" fill="#34e0a1" />
                  <path
                    d="M1078.42 536.6l80.45-87.52h-178.4c-89.31-61.01-197.17-96.54-313.81-96.54-116.5 0-224.06 35.61-313.22 96.54H174.6l80.44 87.52c-49.31 44.99-80.22 109.8-80.22 181.75 0 135.79 110.09 245.88 245.88 245.88 64.51 0 123.27-24.88 167.14-65.55l78.81 85.81 78.81-85.73c43.87 40.67 102.57 65.47 167.07 65.47 135.79 0 246.03-110.09 246.03-245.88.07-72.03-30.84-136.83-80.15-181.75zM420.77 884.75c-91.92 0-166.4-74.48-166.4-166.4s74.49-166.4 166.4-166.4c91.92 0 166.4 74.49 166.4 166.4 0 91.91-74.49 166.4-166.4 166.4zm245.96-171.24c0-109.5-79.63-203.5-184.73-243.65 56.84-23.76 119.18-36.94 184.66-36.94 65.47 0 127.89 13.18 184.73 36.94-105.02 40.23-184.65 134.15-184.65 243.65zm245.88 171.24c-91.92 0-166.4-74.48-166.4-166.4s74.49-166.4 166.4-166.4c91.92 0 166.4 74.49 166.4 166.4 0 91.91-74.49 166.4-166.4 166.4zm0-253.7c-48.2 0-87.23 39.03-87.23 87.23 0 48.19 39.03 87.22 87.23 87.22 48.19 0 87.22-39.03 87.22-87.22 0-48.12-39.03-87.23-87.22-87.23zM508 718.35c0 48.19-39.03 87.22-87.23 87.22-48.19 0-87.22-39.03-87.22-87.22 0-48.2 39.03-87.23 87.22-87.23 48.19-.07 87.23 39.03 87.23 87.23z"
                  />
                </g>
              </svg>
            </a>

            <a
              v-if="restDetails.facebook"
              :href="restDetails.facebook"
              class="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                style="padding: 2px"
              >
                <path
                  fill="#1877F2"
                  d="M22.675 0H1.325C0.593 0 0 0.593 0 1.325v21.35C0 23.407.593 24 1.325 24h11.49v-9.294h-3.14v-3.62h3.14v-2.66c0-3.102 1.84-4.825 4.691-4.825 1.36 0 2.78.256 2.78.256v3.107h-1.56c-1.23 0-1.62.762-1.62 1.545v2.213h2.743l-.438 3.62h-2.305v9.294h5.396c.732 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z"
                />
              </svg>
            </a>

            <a
              v-if="restDetails.twitter"
              :href="restDetails.twitter"
              class="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style="padding: 2px"
              >
                <path
                  fill="#1DA1F2"
                  d="M18.054 2H21.5L14.346 10.011L22.75 22H15.804L10.56 14.89L4.57 22H1.122L8.77 13.42L0.75 2H7.89L12.62 8.564L18.054 2ZM16.768 19.98H18.73L6.81 3.909H4.708L16.768 19.98Z"
                />
              </svg>
            </a>

            <a
              v-if="restDetails.instagram"
              :href="restDetails.instagram"
              class="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 512 512">
                <defs>
                  <linearGradient id="instaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#f9ce34" />
                    <stop offset="50%" stop-color="#ee2a7b" />
                    <stop offset="100%" stop-color="#6228d7" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#instaGradient)"
                  d="M349.33 69.33H162.67C111.27 69.33 69.33 111.27 69.33 162.67v186.66c0 51.4 41.94 93.34 93.34 93.34h186.66c51.4 0 93.34-41.94 93.34-93.34V162.67c0-51.4-41.94-93.34-93.34-93.34zm62.94 280c0 34.77-28.17 62.94-62.94 62.94H162.67c-34.77 0-62.94-28.17-62.94-62.94V162.67c0-34.77 28.17-62.94 62.94-62.94h186.66c34.77 0 62.94 28.17 62.94 62.94v186.66z"
                />
                <path
                  fill="url(#instaGradient)"
                  d="M256 164c-50.69 0-92 41.31-92 92s41.31 92 92 92 92-41.31 92-92-41.31-92-92-92zm0 152c-33.14 0-60-26.86-60-60s26.86-60 60-60 60 26.86 60 60-26.86 60-60 60z"
                />
                <circle fill="url(#instaGradient)" cx="352" cy="160" r="20" />
              </svg>
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
    const formatOpeningHours = (openingTimes) => {
      if (!openingTimes) return ''

      const dayMap = {
        monday: 'Mon',
        tuesday: 'Tue',
        wednesday: 'Wed',
        thursday: 'Thu',
        friday: 'Fri',
        saturday: 'Sat',
        sunday: 'Sun',
      }

      const dayOrder = [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ]

      if (openingTimes.selected === 'daily') {
        const { opens, closes } = openingTimes.daily
        if (!opens && !closes) {
          return `Everyday`
        }
        return `Everyday - ${opens} - ${closes}`
      }

      if (openingTimes.selected === 'is24h') {
        return 'Everyday - Open 24h'
      }
      let grouped = []
      let currentGroup = []
      let lastTime = null
      if (openingTimes.selected === 'byDay') {
        dayOrder.forEach((day) => {
          const time = openingTimes.byDay[day]
          if (time.closed) {
            if (currentGroup.length) {
              grouped.push({ days: [...currentGroup], time: lastTime })
              currentGroup = []
            }
            lastTime = null
          } else {
            const timeStr = `${time.opens}-${time.closes}`
            if (timeStr === lastTime || !lastTime) {
              currentGroup.push(day)
            } else {
              grouped.push({ days: [...currentGroup], time: lastTime })
              currentGroup = [day]
            }
            lastTime = timeStr
          }
        })
      }

      if (currentGroup.length) {
        grouped.push({ days: currentGroup, time: lastTime })
      }

      grouped = grouped.filter((group) => group.time && group.time !== '-')

      return grouped
        .map(({ days, time }) => {
          const [opens, closes] = time.split('-')
          if (opens === '00:00' && closes === '23:59') {
            return `${dayMap[days[0]]}${days.length > 1 ? ` - ${dayMap[days[days.length - 1]]}` : ''} - Open 24h`
          }
          if (days.length === 1) {
            return `${dayMap[days[0]]} - ${opens} - ${closes}`
          } else {
            return `${dayMap[days[0]]} - ${dayMap[days[days.length - 1]]} - ${opens} - ${closes}`
          }
        })
        .join('\n')
    }

    return {
      isOpen,
      toggle,
      formatOpeningHours,
    }
  },
  computed: {
    address() {
      return [this.restDetails.address, this.restDetails.postcode].filter(Boolean).join(' , ')
    },
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
  /* flex-direction: row; */
  align-items: center;
  justify-content: center;
}

.header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  /* justify-content: center; */
  /* width: 100%; */
}
.name-toggle-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.name-toggle-wrapper h1 {
  margin: 0;
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
  margin: 0em 0em;
  border-radius: 0px;
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
  color: #000000cf;
}

dt svg {
  margin-right: 8px;
}
dt .link {
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media (min-width: 1024px) {
  .res-details-card-header h1 {
    font-size: 2em;
  }
}
</style>
