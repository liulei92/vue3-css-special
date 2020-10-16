import { ref, onMounted, onUnmounted } from 'vue'

export default function UseMouseover () {
  const position = ref({ x: 0, y: 0 })

  const handler = (e: any) => {
    position.value = {
      x: e.pageX,
      y: e.pageY
    }
  }

  onMounted(() => {
    window.addEventListener('mousemove', handler)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', handler)
  })

  return {
    position
  }
}
